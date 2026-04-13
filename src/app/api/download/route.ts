// File download API — serves product files with token verification
import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Valid product files (whitelist — nothing else can be served)
const VALID_FILES = new Set([
  'blueprint-en.md',
  'blueprint-ar.md',
  'kit-en.md',
  'kit-ar.md',
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const token = searchParams.get('token');

  if (!file || !token) {
    return new Response('Missing file or token', { status: 400 });
  }

  // Whitelist check — prevent path traversal
  if (!VALID_FILES.has(file)) {
    return new Response('Invalid file', { status: 400 });
  }

  // Verify token is a valid NowPayments payment ID
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

    // Serve file from data/products/ (NOT public — requires auth)
    const filePath = path.join(process.cwd(), 'data', 'products', file);
    const content = await readFile(filePath, 'utf-8');
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
