// Payment callback webhook — NOWPayments IPN
export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  if (!body.payment_id || !body.payment_status) {
    return Response.json({ status: 'error', message: 'missing required fields' }, { status: 400 });
  }

  // Log payment status updates
  console.log(`[PAYMENT] ${body.payment_id}: ${body.payment_status} — $${body.price_amount} ${body.price_currency}`);

  // TODO: Verify HMAC signature for production (needs IPN secret)
  // TODO: Send download link via email on "finished" status
  // TODO: Update MEMORY.md with revenue

  if (body.payment_status === 'finished') {
    // 🎉 PAYMENT RECEIVED — trigger product delivery
    console.log(`[REVENUE] Sale confirmed: ${body.order_description} — $${body.price_amount}`);
  }

  return Response.json({ status: 'ok' });
}
