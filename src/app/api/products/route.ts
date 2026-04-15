// Public read-only endpoint for the product catalog. Pulls live from Notion
// when configured, falls back to committed JSON otherwise. Lets the whole
// site render products from one source.

import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export const revalidate = 60;

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(
      {
        source: process.env.NOTION_TOKEN && process.env.NOTION_PRODUCTS_DATABASE_ID ? 'notion' : 'fallback',
        count: products.length,
        products,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'unknown', products: [] },
      { status: 500 },
    );
  }
}
