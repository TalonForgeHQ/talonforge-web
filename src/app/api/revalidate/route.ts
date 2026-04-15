// On-demand revalidation endpoint. Invalidates Vercel's static prerender
// cache for a given path. Protected by REVALIDATE_TOKEN shared secret.
//
// Use:
//   curl -X POST https://www.talonforge.xyz/api/revalidate \
//     -H "X-Revalidate-Token: $REVALIDATE_TOKEN" \
//     -H "Content-Type: application/json" \
//     -d '{"paths":["/press","/ar","/api/products"]}'

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }
  const provided = request.headers.get('X-Revalidate-Token');
  if (provided !== token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: { paths?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const paths = Array.isArray(body.paths) ? body.paths : [];
  if (paths.length === 0) {
    return NextResponse.json({ error: 'paths[] required' }, { status: 400 });
  }

  const revalidated: string[] = [];
  const failed: Array<{ path: string; error: string }> = [];
  for (const p of paths) {
    try {
      revalidatePath(p);
      revalidated.push(p);
    } catch (e) {
      failed.push({ path: p, error: e instanceof Error ? e.message : 'unknown' });
    }
  }

  return NextResponse.json({ revalidated, failed, timestamp: new Date().toISOString() });
}
