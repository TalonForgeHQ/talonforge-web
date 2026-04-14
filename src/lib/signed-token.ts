// Lightweight HMAC-signed token for download URLs.
// Shape: base64url(payload).base64url(hmac-sha256(payload))
// Zero external deps. Node runtime only (uses node:crypto).
//
// Why not JWT? We don't need the JWT header (alg/typ — fixed), we don't
// need multi-key rotation today, and we don't want a new dependency when
// 40 lines of native crypto does the job.

import crypto from "crypto";

export type DownloadClaims = {
  payment_id: string;
  order_id: string;
  product_id: "blueprint" | "kit" | "toolbox" | "bundle" | "premium" | "starter";
  files: string[];
  iat: number; // issued-at, unix seconds
  exp: number; // expiry, unix seconds
};

function getSecret(): Buffer {
  const s = process.env.DOWNLOAD_URL_SECRET || process.env.NOWPAYMENTS_IPN_SECRET;
  if (!s) throw new Error("DOWNLOAD_URL_SECRET not configured");
  return Buffer.from(s, "utf8");
}

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export const DEFAULT_TTL_SECONDS = 24 * 60 * 60; // 24h

export function signDownloadToken(
  claims: Omit<DownloadClaims, "iat" | "exp">,
  ttlSeconds: number = DEFAULT_TTL_SECONDS
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: DownloadClaims = {
    ...claims,
    iat: now,
    exp: now + ttlSeconds,
  };
  const payloadB64 = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest();
  return `${payloadB64}.${b64url(sig)}`;
}

export type VerifyResult =
  | { valid: true; claims: DownloadClaims }
  | { valid: false; reason: string };

export function verifyDownloadToken(token: string | null | undefined): VerifyResult {
  if (!token) return { valid: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false, reason: "malformed" };
  const [payloadB64, sigB64] = parts;

  let expected: Buffer;
  try {
    expected = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  } catch {
    return { valid: false, reason: "server_misconfig" };
  }

  let received: Buffer;
  try {
    received = b64urlDecode(sigB64);
  } catch {
    return { valid: false, reason: "bad_sig_encoding" };
  }
  if (received.length !== expected.length) return { valid: false, reason: "sig_length" };
  if (!crypto.timingSafeEqual(received, expected)) return { valid: false, reason: "sig_mismatch" };

  let claims: DownloadClaims;
  try {
    claims = JSON.parse(b64urlDecode(payloadB64).toString("utf8"));
  } catch {
    return { valid: false, reason: "bad_payload" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (!claims.exp || claims.exp < now) return { valid: false, reason: "expired" };
  if (!claims.payment_id || !claims.files || !Array.isArray(claims.files)) {
    return { valid: false, reason: "missing_claims" };
  }

  return { valid: true, claims };
}
