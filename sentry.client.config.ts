// Sentry client-side config. No-op when SENTRY_DSN (or
// NEXT_PUBLIC_SENTRY_DSN) is absent. Aggressively scrubs PII:
// - session replays mask all text + block media
// - before send strips request bodies, cookies, headers
// - ignores noisy chunk-load errors
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
    integrations: [
      // Replay SDK: record sessions ONLY when an error occurs, and mask
      // everything typed or displayed so we never capture customer
      // emails, payment addresses, checkout fields, etc.
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],
    // Scrub sensitive fields before the event leaves the browser
    beforeSend(event) {
      if (event.request) {
        // Strip any form data / request body that might contain emails,
        // crypto addresses, or order IDs
        delete event.request.data;
        delete event.request.cookies;
        if (event.request.headers) {
          // Keep User-Agent for debugging; strip anything with "auth" or "cookie"
          const safe: Record<string, string> = {};
          for (const [k, v] of Object.entries(event.request.headers)) {
            const lk = k.toLowerCase();
            if (lk === 'authorization' || lk === 'cookie' || lk.includes('token') || lk.includes('key')) {
              continue;
            }
            if (typeof v === 'string') safe[k] = v;
          }
          event.request.headers = safe;
        }
      }
      // Extra: strip any breadcrumbs that captured form input values
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map((b) => {
          if (b.category === 'ui.input') {
            return { ...b, message: '[masked input]', data: undefined };
          }
          return b;
        });
      }
      return event;
    },
    ignoreErrors: [
      'ChunkLoadError',
      'Loading chunk',
      'ResizeObserver loop',
      'Non-Error promise rejection captured',
    ],
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^moz-extension:\/\//i],
  });
}
