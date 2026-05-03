import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const isLocalHost =
    request.nextUrl.hostname === "localhost" || request.nextUrl.hostname === "127.0.0.1";

  if (process.env.NODE_ENV === "production" || !isLocalHost) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set({
    name: "vv_guest_access",
    value: "1",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}