// TalonForge Payment API — NOWPayments integration
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    const products: Record<string, { name: string; price: number }> = {
      'starter-kit': { name: 'Zero-Human Company Starter Kit', price: 29 },
      'security-skill': { name: 'OpenClaw Security Skill', price: 29 },
    };

    const product = products[productId];
    if (!product) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY || 'NOWPAYMENTS_KEY_REDACTED';

    const res = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: product.price,
        price_currency: 'usd',
        pay_currency: 'usdterc20',
        order_id: `${productId}-${Date.now()}`,
        order_description: product.name,
        success_url: 'https://www.talonforge.xyz/store/thanks',
        canceled_url: 'https://www.talonforge.xyz/store',
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return Response.json({ error: data.message || 'Payment creation failed', details: data }, { status: 500 });
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
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
