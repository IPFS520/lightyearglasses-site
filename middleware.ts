import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EXCLUDED = ["/admin/login", "/admin/login/", "/api/auth", "/api/data"];

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 排除的直接放行
  if (EXCLUDED.some(p => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 不保护的路径放行
  const needsProtect =
    pathname === "/admin" || pathname.startsWith("/admin/") ||
    pathname === "/api/admin" || pathname.startsWith("/api/admin/");
  if (!needsProtect) {
    return NextResponse.next();
  }

  // 检查 session cookie
  const hasSession =
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  if (hasSession) {
    return NextResponse.next();
  }

  // API 请求返回 401
  if (pathname.startsWith("/api/")) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 页面请求重定向到登录
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
