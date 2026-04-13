// TalonForge Payment API — NOWPayments integration
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    const products: Record<string, { name: string; price: number; desc: string }> = {
      'blueprint': { name: 'Zero-Human Company Blueprint (EN + AR)', price: 29, desc: '60+ page playbook for building an AI-run company' },
      'kit': { name: 'Zero-Human Company Kit (EN + AR)', price: 97, desc: 'Auto-setup kit — give to your AI and it builds your company' },
    };

    const product = products[productId];
    if (!product) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'Payment service not configured' }, { status: 500 });
    }

    const res = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': String(apiKey),
        'Content-Type': 'application/json',
      } as Record<string, string>,
      body: JSON.stringify({
        price_amount: product.price,
        price_currency: 'usd',
        pay_currency: 'usdterc20',
        order_id: `${productId}-${Date.now()}`,
        order_description: product.name,
        ipn_callback_url: process.env.NOWPAYMENTS_IPN_URL || '',
        success_url: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/store/thanks` : 'https://talonforge-web.vercel.app/store/thanks',
        cancel_url: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/store` : 'https://talonforge-web.vercel.app/store',
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
      product_id: productId,
      price: product.price,
      order_id: `${productId}-${Date.now()}`,
      valid_until: data.valid_until,
      expiration_estimate_date: data.expiration_estimate_date,
      network: data.network,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
