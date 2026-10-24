import "./admin.css";
import Link from "next/link";
import { SignOutLink } from "./SignOutLink";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const nav = [
    { href: "/admin", label: "仪表盘" },
    { href: "/admin/products", label: "产品管理" },
    { href: "/admin/blog", label: "博客文章" },
    { href: "/admin/pages", label: "页面内容" },
  ];

  return (
    <div className="admin-wrap admin-layout">
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
