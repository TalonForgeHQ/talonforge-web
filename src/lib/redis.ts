// Shared Redis client. Uses REDIS_URL if present (Vercel Marketplace Redis
// injects it). Returns null if the env var is missing so callers can fall
// back to in-memory.

import Redis from 'ioredis';

let client: Redis | null = null;
let tried = false;

export function getRedis(): Redis | null {
  if (tried) return client;
  tried = true;

  const url = process.env.REDIS_URL;
  if (!url) return null;

  try {
    client = new Redis(url, {
      // Fast fail if Redis is unreachable — we'll degrade rather than
      // stall a request.
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      lazyConnect: false,
    });
    client.on('error', (e) => {
      // Swallow connection errors; callers already handle null/throw paths.
      if (process.env.VERCEL_ENV === 'development') {
        console.warn('[redis] error:', e.message);
      }
    });
    return client;
  } catch {
    client = null;
    return null;
  }
}

export const redisEnabled = Boolean(process.env.REDIS_URL);
