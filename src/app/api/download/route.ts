// File download API — validates the signed download token (issued by
// /api/deliver) and streams the requested product file from disk.
// The token's claims enforce (payment_id ↔ files allowed) binding, so a
// leaked token for Blueprint can never be used to fetch Kit files, and an
// expired token (>24h) is rejected server-side.
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/signed-token";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const VALID_FILES = new Set([
  "starter-en.md",
  "starter-ar.md",
  "blueprint-en.md",
  "blueprint-ar.md",
  "kit-en.md",
  "kit-ar.md",
  "toolbox-en.md",
  "toolbox-ar.md",
  "toolbox-ja.md",
  "skill-memory-system.md",
  "skill-safety-rails.md",
  "skill-launch-blitz.md",
  "premium-support-welcome.md",
]);

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `download:${ip}`, limit: 30, windowSec: 60 });
  if (!rl.allowed) {
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(rl.retryAfter) },
    });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  const token = searchParams.get("token");

  if (!file || !token) {
    return new Response("Missing file or token", { status: 400 });
  }

  // Whitelist filename (path-traversal defense) BEFORE touching disk
  if (!VALID_FILES.has(file) || file.includes("/") || file.includes("..")) {
    return new Response("Invalid file", { status: 400 });
  }

  // Validate token
  const result = verifyDownloadToken(token);
  if (!result.valid) {
    const status = result.reason === "expired" ? 401 : 403;
    return new Response(`Invalid token: ${result.reason}`, { status });
  }

  // Token must cover this specific file (binds payment to product)
  if (!result.claims.files.includes(file)) {
    return new Response("Token does not cover this file", { status: 403 });
  }

  // Serve file from private data/ dir
  try {
    const filePath = path.join(process.cwd(), "data", "products", file);
    const content = await readFile(filePath, "utf-8");
    const filename = file.replace(".md", ".txt");

    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error(
      `[DOWNLOAD] failed to read file=${file} payment=${result.claims.payment_id}:`,
      err instanceof Error ? err.message : err
    );
    return new Response("Download error", { status: 503 });
  }
}
