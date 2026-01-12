import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/csv-to-google-sheets?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/csv-to-google-sheets?error=no_code", request.url)
    );
  }

  // Exchange code for tokens
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/google-sheets/callback`;

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL(`/csv-to-google-sheets?error=${encodeURIComponent(tokens.error || "token_error")}`, request.url)
      );
    }

    // Store tokens in a secure way (in production, use a session or database)
    // For now, we'll pass the access token back to the client via URL
    // In production, you'd want to store this server-side
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    // Redirect back to the page with the access token
    // Note: In production, store tokens server-side and use a session ID
    return NextResponse.redirect(
      new URL(`/csv-to-google-sheets?token=${encodeURIComponent(accessToken)}&refresh=${encodeURIComponent(refreshToken || "")}`, request.url)
    );
  } catch (err) {
    console.error("Token exchange error:", err);
    return NextResponse.redirect(
      new URL("/csv-to-google-sheets?error=token_exchange_failed", request.url)
    );
  }
}
