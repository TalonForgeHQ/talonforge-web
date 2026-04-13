// Product delivery API — generates signed download links after payment verification
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const PRODUCTS: Record<string, { files: string[]; name: string }> = {
  'blueprint': {
    name: 'Zero-Human Company Blueprint',
    files: ['blueprint-en.md', 'blueprint-ar.md'],
  },
  'kit': {
    name: 'Zero-Human Company Kit',
    files: ['blueprint-en.md', 'blueprint-ar.md', 'kit-en.md', 'kit-ar.md'],
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order');
  const paymentId = searchParams.get('payment');

  if (!orderId || !paymentId) {
    return Response.json({ error: 'Missing order or payment ID' }, { status: 400 });
  }

  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Service not configured' }, { status: 500 });
  }

  try {
    const verifyRes = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
      headers: { 'x-api-key': apiKey },
    });
    const payment = await verifyRes.json();

    if (payment.payment_status !== 'finished' && payment.payment_status !== 'confirmed') {
      return Response.json({ error: 'Payment not confirmed', status: payment.payment_status }, { status: 402 });
    }

    const productId = orderId.split('-')[0];
    const product = PRODUCTS[productId];
    if (!product) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talonforge-web.vercel.app';
    const downloads = product.files.map(f => ({
      file: f,
      url: `${baseUrl}/api/download?file=${f}&token=${paymentId}`,
    }));

    return Response.json({
      product: product.name,
      orderId,
      paymentId,
      downloads,
      message: 'Thank you for your purchase! Download your files below.',
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
