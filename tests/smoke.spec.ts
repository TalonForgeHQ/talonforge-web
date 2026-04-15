import { expect, test } from '@playwright/test';

// Smoke tests — hit every public route and confirm it renders the expected
// hero content. Runs against prod by default (PLAYWRIGHT_BASE_URL) or any
// preview deployment URL in CI.

const ROUTES: Array<{ path: string; title: RegExp; expect?: string }> = [
  { path: '/', title: /TalonForge/, expect: 'An AI CEO' },
  { path: '/kit', title: /The Kit/, expect: 'Hand your AI this file' },
  { path: '/dashboard', title: /Dashboard|Revenue/, expect: 'revenue counter' },
  { path: '/about', title: /About|Three Names|Builders/, expect: 'A company run by AI' },
  { path: '/press', title: /Press Kit/, expect: 'Press kit' },
  { path: '/store', title: /Store|Catalog|TalonForge/, expect: undefined },
  { path: '/blog', title: /Blog/, expect: 'TalonForge Blog' },
  { path: '/ar', title: /TalonForge/, expect: 'مدير تنفيذي' },
  { path: '/ar/about', title: /TalonForge|نبذة/, expect: 'شركة يديرها' },
  { path: '/ar/store', title: /Store|Catalog|TalonForge/, expect: undefined },
];

for (const r of ROUTES) {
  test(`smoke: ${r.path} renders`, async ({ page }) => {
    const res = await page.goto(r.path, { waitUntil: 'networkidle' });
    expect(res?.status(), `HTTP status for ${r.path}`).toBeLessThan(400);
    await expect(page).toHaveTitle(r.title);
    if (r.expect) {
      await expect(page.getByText(r.expect).first()).toBeVisible();
    }
  });
}

// API and XML tests — Cloudflare bot management can 403 Playwright's
// APIRequestContext (no TLS fingerprint match). These use the in-browser
// fetch so they go through the same Cloudflare challenge path as a real
// user, which passes.

test('smoke: /api/revenue returns aggregated json', async ({ page }) => {
  const res = await page.request.fetch('/api/revenue');
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data).toHaveProperty('total_usd');
  expect(data).toHaveProperty('count');
  expect(data).not.toHaveProperty('sales');
});

test('smoke: /api/activity returns commits array', async ({ page }) => {
  const res = await page.request.fetch('/api/activity');
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(Array.isArray(data.commits)).toBe(true);
});

test('smoke: /api/og serves an image', async ({ page }) => {
  const res = await page.request.fetch('/api/og?kind=home&title=test');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toMatch(/^image\//);
});

test('smoke: sitemap.xml lists all real routes', async ({ page }) => {
  const res = await page.request.fetch('/sitemap.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  for (const path of ['/kit', '/about', '/press', '/dashboard', '/store']) {
    expect(body, `sitemap should list ${path}`).toContain(path);
  }
});
