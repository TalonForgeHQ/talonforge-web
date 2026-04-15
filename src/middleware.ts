import { NextRequest, NextResponse } from 'next/server';

// Forwards the incoming pathname as a header so the root layout can set
// <html lang> and dir correctly per route at SSR time.
// Cheap: no auth, no rewrites, no DB. Runs at the edge.

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('x-pathname', request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    // Skip Next internals + static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2)$).*)',
  ],
};
