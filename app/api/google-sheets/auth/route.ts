import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json(
      { error: "Google Client ID not configured" },
      { status: 500 }
    );
  }

  // Get base URL from request
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/google-sheets/callback`;
  const scope = "https://www.googleapis.com/auth/spreadsheets";
  const responseType = "code";
  const accessType = "offline";
  const prompt = "consent";

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=${responseType}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=${accessType}&` +
    `prompt=${prompt}`;

  return NextResponse.json({ authUrl });
}
