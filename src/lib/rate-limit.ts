// Sliding-window rate limiter.
//
// Uses Redis (via REDIS_URL injected by Vercel Marketplace Redis) when
// available — distributed-safe, multi-lambda. Falls back to an in-memory
// Map otherwise so local dev and previews without Redis keep working.
// Return shape is identical either way, but callers must `await` it.

import { getRedis, redisEnabled } from './redis';

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number; // seconds
  limit: number;
};

// --- in-memory fallback (per-lambda only) ---
type Entry = { count: number; windowStart: number };
const buckets = new Map<string, Entry>();
const CLEANUP_AT = 2000;

function maybePrune() {
  if (buckets.size < CLEANUP_AT) return;
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now - v.windowStart > 300_000) buckets.delete(k);
    if (buckets.size < CLEANUP_AT / 2) break;
  }
}

function rateLimitLocal(opts: { key: string; limit: number; windowSec: number }): RateLimitResult {
  const now = Date.now();
  const windowMs = opts.windowSec * 1000;
  const entry = buckets.get(opts.key);

  if (!entry || now - entry.windowStart >= windowMs) {
    buckets.set(opts.key, { count: 1, windowStart: now });
    maybePrune();
    return { allowed: true, remaining: opts.limit - 1, retryAfter: 0, limit: opts.limit };
  }

  if (entry.count < opts.limit) {
    entry.count += 1;
    return {
      allowed: true,
      remaining: opts.limit - entry.count,
      retryAfter: 0,
      limit: opts.limit,
    };
  }

  const retryAfter = Math.max(
    1,
    Math.ceil((entry.windowStart + windowMs - now) / 1000),
  );
  return { allowed: false, remaining: 0, retryAfter, limit: opts.limit };
}

// --- Redis-backed limiter (distributed) ---
async function rateLimitRedis(opts: { key: string; limit: number; windowSec: number }): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) return rateLimitLocal(opts);
  const redisKey = `rl:${opts.key}`;
  try {
    const count = await redis.incr(redisKey);
    if (count === 1) await redis.expire(redisKey, opts.windowSec);
    if (count <= opts.limit) {
      return { allowed: true, remaining: Math.max(0, opts.limit - count), retryAfter: 0, limit: opts.limit };
    }
    const ttl = (await redis.ttl(redisKey)) || opts.windowSec;
    return { allowed: false, remaining: 0, retryAfter: Math.max(1, ttl), limit: opts.limit };
  } catch {
    return rateLimitLocal(opts);
  }
}

export function rateLimit(opts: { key: string; limit: number; windowSec: number }): Promise<RateLimitResult> {
  return redisEnabled ? rateLimitRedis(opts) : Promise.resolve(rateLimitLocal(opts));
}

export function getClientIp(req: Request): string {
  const h = req.headers;
  const cf = h.get('cf-connecting-ip');
  if (cf) return cf;
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return h.get('x-real-ip') || 'unknown';
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
  };
  if (!result.allowed) headers['Retry-After'] = String(result.retryAfter);
  return headers;
}

export function tooManyRequests(result: RateLimitResult): Response {
  return Response.json(
    { error: 'Too many requests', retry_after: result.retryAfter },
    { status: 429, headers: rateLimitHeaders(result) },
  );
}
