import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "gatexpay_admin_session";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  // 0. Redirect /dashboard -> /admin/dashboard
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/admin/dashboard" : "/admin/login", req.url)
    );
  }

  // 0.1 Redirect /login -> /admin/login
  if (pathname === "/login") {
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/admin/dashboard" : "/admin/login", req.url)
    );
  }

  // 1. Bare /admin -> redirect to dashboard if authenticated, else login
  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/admin/dashboard" : "/admin/login", req.url)
    );
  }

  // 2. /admin/login -> if already authenticated, go to dashboard
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 3. /admin/dashboard and any subroutes -> require authentication
  if (pathname.startsWith("/admin/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/admin", "/admin/:path*"],
};
