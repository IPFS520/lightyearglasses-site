import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "登录 · Lightyear Admin" };

export const dynamic = "force-dynamic";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrap admin-login">
      <Suspense fallback={<div className="admin-login-box">加载中...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
