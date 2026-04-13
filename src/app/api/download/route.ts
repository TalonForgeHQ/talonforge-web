// File download API — serves product files with token verification
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Product files stored as static content
const FILE_CONTENT: Record<string, { name: string; content: string }> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const token = searchParams.get('token');

  if (!file || !token) {
    return new Response('Missing file or token', { status: 400 });
  }

  // Verify token is a valid NowPayments payment ID (basic check)
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    return new Response('Service not configured', { status: 500 });
  }

  try {
    const verifyRes = await fetch(`https://api.nowpayments.io/v1/payment/${token}`, {
      headers: { 'x-api-key': apiKey },
    });
    const payment = await verifyRes.json();

    if (payment.payment_status !== 'finished' && payment.payment_status !== 'confirmed') {
      return new Response('Payment not confirmed', { status: 403 });
    }

    // Serve the file from public/products/
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talonforge-web.vercel.app';
    const fileRes = await fetch(`${baseUrl}/products/${file}`);
    
    if (!fileRes.ok) {
      return new Response('File not found', { status: 404 });
    }

    const content = await fileRes.text();
    const filename = file.replace('.md', '.txt');

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return new Response('Download error', { status: 500 });
  }
}
