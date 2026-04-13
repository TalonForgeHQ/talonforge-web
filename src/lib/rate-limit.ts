// In-memory sliding-window rate limiter. Lambda-scoped.
//
// Why in-memory for v1: zero new deps, works today, actually blocks naive
// abuse (most bots hit the same lambda instance because of IP affinity).
// NOT bulletproof across lambdas — a distributed bot can evade by spraying.
// Swap this impl for @vercel/kv / @upstash/ratelimit when Potts provisions KV;
// the callsite API is stable.

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

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number; // seconds
  limit: number;
};

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowSec: number;
}): RateLimitResult {
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
    Math.ceil((entry.windowStart + windowMs - now) / 1000)
  );
  return { allowed: false, remaining: 0, retryAfter, limit: opts.limit };
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
    { status: 429, headers: rateLimitHeaders(result) }
  );
}
