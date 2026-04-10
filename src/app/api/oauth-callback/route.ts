import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(`OAuth Error: ${error} - ${searchParams.get("error_description") || ""}`, { status: 400 });
  }

  if (code) {
    // Log the code so CEO can pick it up
    console.log(`YOUTUBE_OAUTH_CODE=${code}`);
    // Also write to a file for easy retrieval
    const fs = await import("fs");
    fs.writeFileSync("/tmp/youtube-oauth-code.txt", code);
    fs.chmodSync("/tmp/youtube-oauth-code.txt", 0o600);

    return new NextResponse(`
      <html>
        <head><title>Authorization Successful</title></head>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#0a0a0a;color:#00ff88;">
          <div style="text-align:center;">
            <h1>✅ Authorization Successful</h1>
            <p>Code captured. You can close this tab now.</p>
            <p style="color:#666;">Tell Claw it worked.</p>
          </div>
        </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
  }

  return new NextResponse("No code or error in request", { status: 400 });
}
