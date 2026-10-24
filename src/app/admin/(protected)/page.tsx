import Link from "next/link";
import { getProducts, getBlog, getPages } from "@/lib/db";

export default function AdminHome() {
  const { products, categories } = getProducts();
  const { posts } = getBlog();
  const pages = getPages();

  return (
    <>
      <div className="topbar">
        <div>
          <h1>仪表盘</h1>
          <div className="sub">欢迎回来 👋 在此管理网站所有内容</div>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><div className="n">{products.length}</div><div className="l">产品总数</div></div>
        <div className="admin-stat"><div className="n">{categories?.length ?? 0}</div><div className="l">产品分类</div></div>
        <div className="admin-stat"><div className="n">{posts.length}</div><div className="l">博客文章</div></div>
        <div className="admin-stat"><div className="n">{Object.keys(pages).length}</div><div className="l">静态页面</div></div>
      </div>

      <div className="admin-card">
        <h2>📦 最新产品</h2>
        <table className="admin-table">
          <thead><tr><th>产品</th><th>分类</th><th>状态</th><th></th></tr></thead>
          <tbody>
            {products.slice(0, 6).map(p => (
              <tr key={p.slug}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.status || "published"}</td>
                <td><Link className="edit" href={`/admin/products/${p.slug}`}>编辑</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <h2>📝 最新博客</h2>
        <table className="admin-table">
          <thead><tr><th>标题</th><th>分类</th><th>日期</th><th></th></tr></thead>
          <tbody>
            {posts.slice(0, 6).map(p => (
              <tr key={p.slug}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.publishedAt}</td>
                <td><Link className="edit" href={`/admin/blog/${p.slug}`}>编辑</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
