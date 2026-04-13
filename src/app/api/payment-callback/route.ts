// Payment callback webhook — NOWPayments IPN
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.payment_id || !body.payment_status) {
    return Response.json({ status: 'error', message: 'missing required fields' }, { status: 400 });
  }

  console.log(`[PAYMENT] ${body.payment_id}: ${body.payment_status} — $${body.price_amount} ${body.price_currency}`);

  // TODO: Verify HMAC signature for production (needs IPN secret from NowPayments)
  // const crypto = require('crypto');
  // const sig = crypto.createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET).update(JSON.stringify(sortedBody)).digest('hex');

  if (body.payment_status === 'finished' || body.payment_status === 'confirmed') {
    const orderId = body.order_id || '';
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
