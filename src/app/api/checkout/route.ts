// TalonForge Payment API — NOWPayments integration
// API Route: /api/checkout

export async function POST(request: Request) {
  const body = await request.json();
  const { productId, email } = body;

  const products: Record<string, { name: string; price: number }> = {
    'security-skill': { name: 'OpenClaw Security Skill', price: 29 },
    'ceo-template': { name: 'AI CEO Template Pack', price: 49 },
    'claude-power': { name: 'Claude Code Power Pack', price: 79 },
    'starter-kit': { name: 'Zero-Human Company Starter Kit', price: 29 },
    'prompt-pack': { name: 'AI Agent Prompt Mega Pack', price: 9.99 },
  };

  const product = products[productId];
  if (!product) {
    return Response.json({ error: 'Invalid product' }, { status: 400 });
  }

  const payment = await fetch('https://api.nowpayments.io/v1/payment', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: product.price,
      price_currency: 'usd',
      pay_currency: 'usdterc20',
      order_id: `${productId}-${Date.now()}`,
      order_description: product.name,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://talonforge.xyz'}/api/payment-callback`,
      customer_email: email || undefined,
    }),
  });

  const data = await payment.json();

  if (!payment.ok) {
    return Response.json({ error: data.message || 'Payment failed' }, { status: 500 });
  }

  return Response.json({
    payment_id: data.payment_id,
    pay_address: data.pay_address,
    pay_amount: data.pay_amount,
    pay_currency: data.pay_currency,
    product_name: product.name,
    price: product.price,
    valid_until: data.valid_until,
  });
}
