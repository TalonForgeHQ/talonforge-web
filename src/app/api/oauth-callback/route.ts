import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// YouTube OAuth callback. The code is short-lived (~10 min) but still sensitive.
// We no longer write it to disk or stdout — the CEO picks it up from the one-time
// response page shown below, copy/pasted by hand.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `OAuth Error: ${error} - ${searchParams.get("error_description") || ""}`,
      { status: 400 },
    );
  }

  if (!code) {
    return new NextResponse("No code or error in request", { status: 400 });
  }

  // Render the code inside a copy-to-clipboard block. Not persisted anywhere.
  // The page disables referrer so the code cannot leak in browser history links.
  return new NextResponse(
    `<!doctype html>
<html>
<head>
  <title>Authorization Successful</title>
  <meta name="referrer" content="no-referrer">
  <meta name="robots" content="noindex,nofollow">
</head>
<body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui,sans-serif;background:#0a0a0a;color:#e8e4df;margin:0;">
  <div style="text-align:center;max-width:480px;padding:2rem;">
    <h1 style="color:#c4a35a;font-weight:600;">Authorization received</h1>
    <p style="color:#a3a3a3;margin:1rem 0 2rem;">Copy this code into the exchange step. It expires in ~10 minutes and cannot be reused.</p>
    <pre id="code" style="padding:1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;word-break:break-all;white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:12px;color:#fff;">${escapeHtml(code)}</pre>
    <button onclick="navigator.clipboard.writeText(document.getElementById('code').innerText);this.innerText='Copied'" style="margin-top:1rem;padding:0.5rem 1rem;background:#c4a35a;color:#0a0a0a;border:0;border-radius:999px;font-size:13px;cursor:pointer;">Copy</button>
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex" } },
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
