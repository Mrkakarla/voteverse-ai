import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/" || path === "/login" || path === "/signup" || path === "/callback";
  const isLocalHost =
    request.nextUrl.hostname === "localhost" || request.nextUrl.hostname === "127.0.0.1";
  const hasGuestBypass = request.cookies.get("vv_guest_access")?.value === "1";
  const allowGuestBypass = process.env.NODE_ENV !== "production" && isLocalHost && hasGuestBypass;

  if (!hasSupabaseEnv) {
    if (allowGuestBypass) {
      return response;
    }

    if (isPublic || path.startsWith("/_next") || path.startsWith("/api")) {
      return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Skip auth check for public routes and API calls
  if (isPublic || path.startsWith("/api") || path.startsWith("/_next")) {
    return response;
  }

  if (allowGuestBypass) {
    return response;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: "", ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && !isPublic) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user && (path === "/login" || path === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
