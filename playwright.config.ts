import { defineConfig, devices } from '@playwright/test';

// Local dev: `npm run test:smoke:local` spins tests against localhost.
// CI: hits prod via PLAYWRIGHT_BASE_URL (set in .github/workflows/smoke.yml).
// NOTE: Running these tests from a cloud-provider IP (like the TalonForge
// VPS) will hit Cloudflare's bot management and 403. That's expected.
// Use GitHub Actions or a home IP for prod smoke.
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://www.talonforge.xyz';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Cloudflare's bot management 403s the default HeadlessChrome UA
    // when the request comes from a cloud provider IP. Present as a real
    // desktop Chrome so both page loads and request-context calls pass.
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        userAgent:
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
    {
      name: 'chromium-mobile',
      // Pixel 7 emulation uses the chromium engine; keeps CI lean: one browser.
      use: {
        ...devices['Pixel 7'],
        userAgent:
          'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      },
    },
  ],
});
