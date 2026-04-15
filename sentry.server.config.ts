// Sentry server-side config (Node runtime). No-op without DSN.
// Strips request body + auth headers before sending.
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.VERCEL_ENV || 'development',
    beforeSend(event) {
      if (event.request) {
        delete event.request.data;
        delete event.request.cookies;
        if (event.request.headers) {
          const safe: Record<string, string> = {};
          for (const [k, v] of Object.entries(event.request.headers)) {
            const lk = k.toLowerCase();
            if (lk === 'authorization' || lk === 'cookie' || lk.includes('token') || lk.includes('key')) continue;
            if (typeof v === 'string') safe[k] = v;
          }
          event.request.headers = safe;
        }
      }
      return event;
    },
  });
}
