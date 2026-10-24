import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutLink } from "../SignOutLink";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  const nav = [
    { href: "/admin", label: "仪表盘" },
    { href: "/admin/products", label: "产品管理" },
    { href: "/admin/blog", label: "博客文章" },
    { href: "/admin/pages", label: "页面内容" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">✨ Lightyear Admin</div>
        <nav>
          {nav.map(n => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <SignOutLink />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
