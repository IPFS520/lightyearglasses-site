import type { Metadata } from "next";

export const metadata: Metadata = { title: "登录 · Lightyear Admin" };

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-wrap admin-login">{children}</div>;
}
