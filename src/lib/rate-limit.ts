// Sliding-window rate limiter.
//
// Uses Vercel KV (Upstash Redis) when KV_REST_API_URL + KV_REST_API_TOKEN are
// present — that's the distributed-safe path, survives cold starts, multi-
// lambda. Falls back to an in-memory Map otherwise so local dev and previews
// without KV keep working. Either way, callers import { rateLimit } and the
// return shape is identical.

import { kv } from "@vercel/kv";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number; // seconds
  limit: number;
};

const kvEnabled = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

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

// --- KV-backed limiter (distributed) ---
async function rateLimitKv(opts: { key: string; limit: number; windowSec: number }): Promise<RateLimitResult> {
  const redisKey = `rl:${opts.key}`;
  try {
    const count = (await kv.incr(redisKey)) as number;
    if (count === 1) {
      // First hit of the window — set TTL.
      await kv.expire(redisKey, opts.windowSec);
    }
    if (count <= opts.limit) {
      return { allowed: true, remaining: Math.max(0, opts.limit - count), retryAfter: 0, limit: opts.limit };
    }
    const ttl = ((await kv.ttl(redisKey)) as number) || opts.windowSec;
    return { allowed: false, remaining: 0, retryAfter: Math.max(1, ttl), limit: opts.limit };
  } catch {
    // KV unreachable — fail open with in-memory. Prefer degraded auth to 500s.
    return rateLimitLocal(opts);
  }
}

export function rateLimit(opts: { key: string; limit: number; windowSec: number }): RateLimitResult | Promise<RateLimitResult> {
  return kvEnabled ? rateLimitKv(opts) : rateLimitLocal(opts);
}

export function getClientIp(req: Request): string {
  const h = req.headers;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return h.get("x-real-ip") || "unknown";
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
  };
  if (!result.allowed) headers["Retry-After"] = String(result.retryAfter);
  return headers;
}

export function tooManyRequests(result: RateLimitResult): Response {
  return Response.json(
    { error: "Too many requests", retry_after: result.retryAfter },
    { status: 429, headers: rateLimitHeaders(result) },
  );
}
