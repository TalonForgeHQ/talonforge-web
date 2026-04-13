// TalonForge Payment API — NowPayments integration with:
// - CSRF protection via content-type + Origin header enforcement
// - Rate limiting (10 req/min per IP)
// - Cryptographic UUID order IDs (no millisecond collisions)
// - Required-env checks (no unsafe fallbacks)
import crypto from "crypto";
import { rateLimit, getClientIp, tooManyRequests, rateLimitHeaders } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type ProductId = "blueprint" | "kit";
type Product = { name: string; price: number; desc: string };

const PRODUCTS: Record<ProductId, Product> = {
  blueprint: {
    name: "Zero-Human Company Blueprint (EN + AR)",
    price: 29,
    desc: "60+ page playbook for building an AI-run company",
  },
  kit: {
    name: "Zero-Human Company Kit (EN + AR)",
    price: 97,
    desc: "Auto-setup kit — give to your AI and it builds your company",
  },
};

function isProductId(x: unknown): x is ProductId {
  return x === "blueprint" || x === "kit";
}

// Accept requests only from our own origin (or direct curl with no origin —
// NOT a browser-driven CSRF). This is lightweight CSRF defense; the
// content-type check below is the primary barrier for browser attacks.
function validOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser caller (curl, server-to-server test) — allow
  try {
    const u = new URL(origin);
    const h = u.hostname;
    return (
      h === "talonforge.xyz" ||
      h === "www.talonforge.xyz" ||
      h === "talonforge-web.vercel.app" ||
      h.endsWith(".vercel.app") // preview deploys
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // --- Rate limit ---
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `checkout:${ip}`, limit: 10, windowSec: 60 });
  if (!rl.allowed) return tooManyRequests(rl);

  // --- CSRF guards ---
  if (!validOrigin(request)) {
    return Response.json({ error: "Cross-origin request rejected" }, { status: 403 });
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // --- Input ---
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const productId = (body as { productId?: unknown })?.productId;
  if (!isProductId(productId)) {
    return Response.json({ error: "Invalid product" }, { status: 400 });
  }
  const product = PRODUCTS[productId];

  // --- Required env (fail closed, no unsafe fallback to old vercel domain) ---
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Payment service not configured" }, { status: 500 });
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return Response.json({ error: "Service not configured (NEXT_PUBLIC_BASE_URL)" }, { status: 500 });
  }

  // --- Deterministic, collision-free order_id ---
  const orderId = `${productId}-${crypto.randomUUID()}`;

  // --- Talk to NowPayments ---
  let npResp: Response;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    npResp = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        price_amount: product.price,
        price_currency: "usd",
        pay_currency: "usdterc20",
        order_id: orderId,
        order_description: product.name,
        ipn_callback_url: process.env.NOWPAYMENTS_IPN_URL || "",
        success_url: `${baseUrl}/store/thanks`,
        cancel_url: `${baseUrl}/store`,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch (err) {
    console.error("[CHECKOUT] NowPayments fetch failed:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Payment provider unreachable" }, { status: 502 });
  }

  const data = await npResp.json().catch(() => ({}));
  if (!npResp.ok) {
    console.error("[CHECKOUT] NowPayments error:", npResp.status, data);
    return Response.json(
      { error: "Payment creation failed" },
      { status: 502 }
    );
  }

  return Response.json(
    {
      payment_id: data.payment_id,
      pay_address: data.pay_address,
      pay_amount: data.pay_amount,
      pay_currency: data.pay_currency,
      product_name: product.name,
      product_id: productId,
      price: product.price,
      order_id: orderId,
      valid_until: data.valid_until,
      expiration_estimate_date: data.expiration_estimate_date,
      network: data.network,
    },
    { headers: rateLimitHeaders(rl) }
  );
}
