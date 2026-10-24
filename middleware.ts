import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // 中间件主逻辑——已通过 token 验证
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      // 只有有效 token 才能进入守卫范围
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    // 保护所有 /admin/* 路径...
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    // ...但中间件机制会通过 pages.signIn 自动放行 /admin/login
  ],
};
