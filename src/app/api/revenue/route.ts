// Public revenue endpoint — sums confirmed/finished NowPayments invoices.
// Cached 60s at the edge via revalidate so we don't hammer the upstream API
// on every page view. Returns conservative zeros on failure so the UI
// degrades gracefully instead of crashing the hero.

export const revalidate = 60;

const COUNTABLE_STATUSES = new Set([
  "finished",
  "confirmed",
  "partially_paid",
  "sending",
]);

type NPPayment = {
  payment_id?: string;
  payment_status?: string;
  price_amount?: number | string;
  price_currency?: string;
  order_id?: string;
  created_at?: string;
};

type RevenueResponse = {
  total_usd: number;
  count: number;
  since: string;
  last_updated: string;
  status: "ok" | "stale" | "unconfigured";
  note?: string;
};

const LAUNCH_DATE = "2026-04-12";

async function fetchPaymentsPage(apiKey: string, limit: number, offset: number) {
  const url = new URL("https://api.nowpayments.io/v1/payment/");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("page", String(Math.floor(offset / limit)));
  const res = await fetch(url.toString(), {
    headers: { "x-api-key": apiKey },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`NowPayments list returned ${res.status}`);
  }
  const body = (await res.json()) as { data?: NPPayment[] };
  return body.data ?? [];
}

export async function GET(request: Request): Promise<Response> {
  // API key authentication — require X-Revenue-Key header matching REVENUE_API_KEY env var
  const revenueApiKey = process.env.REVENUE_API_KEY;
  if (revenueApiKey) {
    const providedKey = request.headers.get("X-Revenue-Key");
    if (providedKey !== revenueApiKey) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const now = new Date().toISOString();

  if (!apiKey) {
    const body: RevenueResponse = {
      total_usd: 0,
      count: 0,
      since: LAUNCH_DATE,
      last_updated: now,
      status: "unconfigured",
      note: "Revenue feed initializing",
    };
    return Response.json(body);
  }

  try {
    // Pull up to 3 pages of 100 each = 300 most recent payments. Plenty until we scale past that.
    const all: NPPayment[] = [];
    for (let page = 0; page < 3; page++) {
      const batch = await fetchPaymentsPage(apiKey, 100, page * 100);
      all.push(...batch);
      if (batch.length < 100) break;
    }

    const counted = all.filter((p) =>
      p.payment_status ? COUNTABLE_STATUSES.has(p.payment_status) : false
    );
    const total = counted.reduce((acc, p) => {
      const amt = typeof p.price_amount === "string" ? parseFloat(p.price_amount) : p.price_amount ?? 0;
      return acc + (Number.isFinite(amt) ? amt : 0);
    }, 0);

    const body: RevenueResponse = {
      total_usd: Math.round(total * 100) / 100,
      count: counted.length,
      since: LAUNCH_DATE,
      last_updated: now,
      status: "ok",
    };
    return Response.json(body, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    const body: RevenueResponse = {
      total_usd: 0,
      count: 0,
      since: LAUNCH_DATE,
      last_updated: now,
      status: "stale",
      note: err instanceof Error ? err.message : "fetch failed",
    };
    return Response.json(body, { status: 200 });
  }
}
