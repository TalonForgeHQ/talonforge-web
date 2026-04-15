// Sentry client-side config. No-op when SENTRY_DSN (or
// NEXT_PUBLIC_SENTRY_DSN) is absent.
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
    environment: process.env.VERCEL_ENV || 'development',
    ignoreErrors: [
      // Next.js dev noise
      'ChunkLoadError',
      'Loading chunk',
      'ResizeObserver loop',
    ],
  });
}
