// Revenue endpoint — aggregated revenue is public (it IS the dashboard proof).
// Individual sale records (order_id, payment_id, pay_currency) are admin-only
// and gated behind REVENUE_API_KEY. That way the public /dashboard counter keeps
// working while we don't leak order IDs that could be used for lookup abuse.

import { NextRequest } from "next/server";
import { getRevenue } from "@/lib/sales-tracker";

export const dynamic = "force-dynamic";

type PublicResponse = {
  total_usd: number;
  count: number;
  since: string;
  last_updated: string;
  status: "ok" | "no_sales" | "error";
  note?: string;
};

export async function GET(request: NextRequest): Promise<Response> {
  const adminKey = process.env.REVENUE_API_KEY;
  const provided = request.headers.get("X-Revenue-Key");
  const isAdmin = Boolean(adminKey && provided && provided === adminKey);

  try {
    const data = await getRevenue();
    const base: PublicResponse = {
      total_usd: data.total_usd,
      count: data.count,
      since: "2026-04-12",
      last_updated: new Date().toISOString(),
      status: data.count > 0 ? "ok" : "no_sales",
    };
    return Response.json(
      isAdmin ? { ...base, sales: data.sales } : base,
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    return Response.json({
      total_usd: 0,
      count: 0,
      since: "2026-04-12",
      last_updated: new Date().toISOString(),
      status: "error" as const,
      note: err instanceof Error ? err.message : "unknown error",
    });
  }
}
