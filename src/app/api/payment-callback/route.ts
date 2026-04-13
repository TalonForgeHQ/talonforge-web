import crypto from 'crypto';

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
    const orderId = typeof body.order_id === 'string' ? body.order_id : '';
    const isKit = orderId.startsWith('kit-');
    const product = isKit ? 'Zero-Human Company Kit' : 'Zero-Human Company Blueprint';
    const price = body.price_amount || (isKit ? 97 : 29);

    console.log(`[REVENUE] 💰 Sale confirmed: ${product} — $${price} USD — Payment: ${body.payment_id}`);

    // TODO: Send download link via email
    // TODO: Update revenue tracking
    // TODO: Notify Potts via Telegram
  }

  return Response.json({ status: 'ok' });
}
