// Product delivery API — verifies payment, issues a signed JWT-style token
// that binds (payment_id, order_id, product_id, files, exp). The token is
// embedded in the download URLs we return; /api/download validates it
// instead of re-checking NowPayments on every file fetch.
import { NextRequest } from "next/server";
import { signDownloadToken, DEFAULT_TTL_SECONDS } from "@/lib/signed-token";
import { rateLimit, getClientIp, tooManyRequests } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const PRODUCTS: Record<"blueprint" | "kit", { files: string[]; name: string }> = {
  blueprint: {
    name: "Zero-Human Company Blueprint",
    files: ["blueprint-en.md", "blueprint-ar.md"],
  },
  kit: {
    name: "Zero-Human Company Kit",
    files: ["blueprint-en.md", "blueprint-ar.md", "kit-en.md", "kit-ar.md"],
  },
};

type ProductId = keyof typeof PRODUCTS;

function isProductId(x: string): x is ProductId {
  return x === "blueprint" || x === "kit";
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `deliver:${ip}`, limit: 20, windowSec: 60 });
  if (!rl.allowed) return tooManyRequests(rl);

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order");
  const paymentId = searchParams.get("payment");

  if (!orderId || !paymentId) {
    return Response.json({ error: "Missing order or payment ID" }, { status: 400 });
  }

  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Service not configured" }, { status: 500 });
  }

  try {
    const verifyRes = await fetch(
      `https://api.nowpayments.io/v1/payment/${encodeURIComponent(paymentId)}`,
      { headers: { "x-api-key": apiKey } }
    );
    if (!verifyRes.ok) {
      return Response.json({ error: "Payment lookup failed" }, { status: 502 });
    }
    const payment = await verifyRes.json();

    if (payment.payment_status !== "finished" && payment.payment_status !== "confirmed") {
      return Response.json(
        { error: "Payment not confirmed", status: payment.payment_status },
        { status: 402 }
      );
    }

    // order_id format: "<productId>-<timestamp>" — enforce strict match to prevent product-swap
    const productPart = String(orderId).split("-")[0];
    if (!isProductId(productPart)) {
      return Response.json({ error: "Invalid product" }, { status: 400 });
    }
    const product = PRODUCTS[productPart];

    // Cross-check: NowPayments-stored order_id should match the caller's orderId,
    // prevents an attacker swapping order for a different customer's payment.
    if (payment.order_id && String(payment.order_id) !== orderId) {
      return Response.json({ error: "Order/payment mismatch" }, { status: 403 });
    }

    const token = signDownloadToken({
      payment_id: String(paymentId),
      order_id: String(orderId),
      product_id: productPart,
      files: product.files,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://talonforge.xyz";
    const downloads = product.files.map((f) => ({
      file: f,
      url: `${baseUrl}/api/download?file=${encodeURIComponent(f)}&token=${encodeURIComponent(token)}`,
    }));

    return Response.json({
      product: product.name,
      orderId,
      paymentId,
      downloads,
      token_ttl_seconds: DEFAULT_TTL_SECONDS,
      message: "Thank you for your purchase! Download your files below.",
    });
  } catch (err) {
    console.error("[DELIVER] error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Delivery verification failed" }, { status: 500 });
  }
}
