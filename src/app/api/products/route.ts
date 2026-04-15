// Public read-only endpoint for the product catalog. Pulls live from Notion
// when configured, falls back to committed JSON otherwise. Lets the whole
// site render products from one source.

import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
import { getClientIp, rateLimit, tooManyRequests } from '@/lib/rate-limit';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  // Rate limit: generous for legitimate browsing (60/min), blocks a bot
  // hammering the Notion upstream.
  const ip = getClientIp(request);
  const rl = await rateLimit({ key: `products:${ip}`, limit: 60, windowSec: 60 });
  if (!rl.allowed) return tooManyRequests(rl);

  try {
    const products = await getProducts();
    // Explicit allowlist of public fields. Future internal additions to the
    // Product type won't auto-leak.
    const publicProducts = products.map((p) => ({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      price: p.price,
      oldPrice: p.oldPrice,
      status: p.status,
      cover: p.cover,
      order: p.order,
    }));
    return NextResponse.json(
      {
        source: process.env.NOTION_TOKEN && process.env.NOTION_PRODUCTS_DATABASE_ID ? 'notion' : 'fallback',
        count: publicProducts.length,
        products: publicProducts,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (e) {
    console.error('[api/products] fetch failed:', e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: 'products_unavailable', products: [] },
      { status: 500 },
    );
  }
}
