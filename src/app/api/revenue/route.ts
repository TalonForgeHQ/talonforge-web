// Revenue endpoint — self-contained sales tracker.
// Reads from local sales.json (populated by payment callback) instead of
// NowPayments JWT API. Falls back to NowPayments only if JWT available.

import { NextRequest } from "next/server";
import { getRevenue } from "@/lib/sales-tracker";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  // Auth: require X-Revenue-Key header matching REVENUE_API_KEY env var
  const revenueApiKey = process.env.REVENUE_API_KEY;
  if (revenueApiKey) {
    const providedKey = request.headers.get("X-Revenue-Key");
    if (providedKey !== revenueApiKey) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const data = await getRevenue();
    return Response.json({
      total_usd: data.total_usd,
      count: data.count,
      sales: data.sales,
      since: "2026-04-12",
      last_updated: new Date().toISOString(),
      status: data.count > 0 ? "ok" : "no_sales",
    }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return Response.json({
      total_usd: 0,
      count: 0,
      sales: [],
      since: "2026-04-12",
      last_updated: new Date().toISOString(),
      status: "error",
      note: err instanceof Error ? err.message : "unknown error",
    });
  }
}