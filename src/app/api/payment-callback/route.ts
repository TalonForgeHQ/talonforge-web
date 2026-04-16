import crypto from 'crypto';
import { getRedis, redisEnabled } from '@/lib/redis';
import { recordSale } from '@/lib/sales-tracker';

// Returns true if this payment_id has already been processed. When Redis is
// configured we use it as a distributed idempotency store; otherwise we
// degrade to a process-local Set (better than nothing, not bulletproof).
const seenLocal = new Set<string>();
const WEEK_SEC = 60 * 60 * 24 * 7;

async function isDuplicate(paymentId: string): Promise<boolean> {
  if (!redisEnabled) {
    if (seenLocal.has(paymentId)) return true;
    seenLocal.add(paymentId);
    return false;
  }
  const redis = getRedis();
  if (!redis) {
    if (seenLocal.has(paymentId)) return true;
    seenLocal.add(paymentId);
    return false;
  }
  try {
    // SET NX EX — atomic "set if not exists, expire in 7d"
    const result = await redis.set(`pay:idempotent:${paymentId}`, '1', 'EX', WEEK_SEC, 'NX');
    // ioredis returns 'OK' on success, null when the key already exists
    return result === null;
  } catch {
    // Redis unreachable — fail open (process the callback). Better to double-
    // fire than to drop a legitimate sale. Dedupe upstream in recordSale anyway.
    return false;
  }
}

export const dynamic = 'force-dynamic';

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortObject((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

function safeEqualHex(a: string, b: string): boolean {
  if (!a || !b) return false;
  let bufA: Buffer;
  let bufB: Buffer;
  try {
    bufA = Buffer.from(a, 'hex');
    bufB = Buffer.from(b, 'hex');
  } catch {
    return false;
  }
  if (bufA.length === 0 || bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-nowpayments-sig') ?? '';
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;

  if (!secret) {
    console.error('[PAYMENT] NOWPAYMENTS_IPN_SECRET not configured — rejecting callback');
    return Response.json({ status: 'error', message: 'server misconfigured' }, { status: 500 });
  }
  if (!signature) {
    console.warn('[PAYMENT] missing x-nowpayments-sig header — rejecting callback');
    return Response.json({ status: 'error', message: 'missing signature' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ status: 'error', message: 'invalid JSON body' }, { status: 400 });
  }

  const expected = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(sortObject(body)))
    .digest('hex');

  if (!safeEqualHex(signature, expected)) {
    console.warn(`[PAYMENT] invalid HMAC signature — rejecting callback for payment_id=${body.payment_id ?? 'unknown'}`);
    return Response.json({ status: 'error', message: 'invalid signature' }, { status: 401 });
  }

  if (!body.payment_id || !body.payment_status) {
    return Response.json({ status: 'error', message: 'missing required fields' }, { status: 400 });
  }

  console.log(`[PAYMENT] ${body.payment_id}: ${body.payment_status} — $${body.price_amount} ${body.price_currency}`);

  if (body.payment_status === 'finished' || body.payment_status === 'confirmed') {
    if (await isDuplicate(String(body.payment_id))) {
      console.log(`[PAYMENT] ${body.payment_id}: duplicate callback, skipping side effects`);
      return Response.json({ status: 'ok', duplicate: true });
    }

    const orderId = typeof body.order_id === 'string' ? body.order_id : '';
    const productSlug = orderId.split('-')[0]; // blueprint / kit / toolbox / bundle / premium
    const productName: Record<string, string> = {
      starter: 'AI Founder Starter Pack',
      blueprint: 'Zero-Human Company Blueprint',
      kit: 'Zero-Human Company Kit',
      toolbox: 'AI Company Starter Toolbox',
      bundle: 'Everything Bundle',
      premium: 'AI Company in a Box',
    };
    const productPrice: Record<string, number> = {
      starter: 9,
      blueprint: 29,
      kit: 97,
      toolbox: 49,
      bundle: 97,
      premium: 147,
    };
    const product = productName[productSlug] || 'Unknown Product';
    const price = Number(body.price_amount) || productPrice[productSlug] || 0;

    console.log(`[REVENUE] 💰 Sale confirmed: ${product} — $${price} USD — Payment: ${body.payment_id}`);

    // Run every downstream side effect in parallel and capture rejections.
    // If ANY of them fail silently we lose visibility into real sales — Potts
    // doesn't hear the Telegram alert, customer doesn't get email, etc.
    const customerEmail = typeof body.customer_email === 'string' ? body.customer_email : '';
    const tasks: Array<Promise<unknown>> = [
      recordSale({
        order_id: orderId,
        payment_id: String(body.payment_id),
        product_id: productSlug,
        product_name: product,
        amount_usd: price,
        pay_currency: String(body.price_currency || 'USD'),
        status: String(body.payment_status),
        timestamp: new Date().toISOString(),
      }),
      notifyTelegramSale({
        product,
        price,
        paymentId: String(body.payment_id),
        currency: String(body.price_currency || 'USD'),
        orderId,
      }),
    ];
    const taskNames = ['recordSale', 'notifyTelegramSale'];
    if (customerEmail) {
      tasks.push(
        sendDeliveryEmail({
          to: customerEmail,
          product,
          paymentId: String(body.payment_id),
          orderId,
        }),
      );
      taskNames.push('sendDeliveryEmail');
    }
    const results = await Promise.allSettled(tasks);
    const failures = results
      .map((r, i) => (r.status === 'rejected' ? `${taskNames[i]}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}` : null))
      .filter((x): x is string => x !== null);
    if (failures.length > 0) {
      console.error(`[PAYMENT] ${body.payment_id}: ${failures.length}/${tasks.length} side effects failed:`, failures);
    }
  }

  return Response.json({ status: 'ok' });
}

// --- Telegram sale-alert (fire-and-forget, best-effort) --------------------
// Sends a message to TELEGRAM_OPS_CHAT_ID via TELEGRAM_BOT_TOKEN when a real
// sale lands. No retries — if it fails we still return ok to NowPayments.
async function notifyTelegramSale(args: {
  product: string; price: number; paymentId: string; currency: string; orderId: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_OPS_CHAT_ID;
  if (!token || !chatId) return; // degrade gracefully if unconfigured
  const text =
    `💰 SALE — $${args.price} ${args.currency}\n` +
    `Product: ${args.product}\n` +
    `Payment: ${args.paymentId}\n` +
    `Order: ${args.orderId}`;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_notification: false }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
  } catch (err) {
    console.error('[PAYMENT] telegram notify failed:', err instanceof Error ? err.message : err);
  }
}

// --- Resend email delivery (fire-and-forget, best-effort) ------------------
// Requires RESEND_API_KEY + RESEND_FROM env vars. Customer email must come
// from NowPayments callback body (they pass `customer_email` when set).
async function sendDeliveryEmail(args: {
  to: string; product: string; paymentId: string; orderId: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'orders@talonforge.xyz';
  if (!resendKey) return; // degrade if unconfigured
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.talonforge.xyz';
  const thanksUrl = `${base}/store/thanks?order=${encodeURIComponent(args.orderId)}&payment=${encodeURIComponent(args.paymentId)}`;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject: `Your ${args.product} is ready — TalonForge`,
        html:
          `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">` +
          `<h1 style="margin:0 0 16px;font-size:22px">Thanks for your purchase 🦅</h1>` +
          `<p>Your <strong>${args.product}</strong> is ready.</p>` +
          `<p><a href="${thanksUrl}" style="display:inline-block;padding:12px 20px;background:#e8622c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">Download your files →</a></p>` +
          `<p style="color:#555;font-size:13px">Link valid for 24h. Reply to this email if anything's wrong.</p>` +
          `<hr style="margin:24px 0;border:0;border-top:1px solid #eee">` +
          `<p style="color:#888;font-size:12px">Payment ID: ${args.paymentId}<br>Order: ${args.orderId}</p>` +
          `<p style="color:#888;font-size:12px">— Potts & Anvil, TalonForge</p>` +
          `</div>`,
        text:
          `Thanks for your purchase.\n\nYour ${args.product} is ready at:\n${thanksUrl}\n\nLink valid for 24h. Reply to this email if anything's wrong.\n\nPayment ID: ${args.paymentId}\nOrder: ${args.orderId}\n\n— Potts & Anvil, TalonForge`,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
  } catch (err) {
    console.error('[PAYMENT] resend email failed:', err instanceof Error ? err.message : err);
  }
}
