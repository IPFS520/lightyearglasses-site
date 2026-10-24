"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminFetch } from "../lib";

export default function BlogListPage() {
  const api = useAdminFetch();
  const [posts, setPosts] = useState<any[]>([]);
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    const res = await api("/api/admin/blog");
    setPosts((await res.json()).posts || []);
  };

  useEffect(() => { load(); }, []);

  const del = async (slug: string, title: string) => {
    if (!confirm(`确定删除「${title}」吗？`)) return;
    const res = await api(`/api/admin/blog/${slug}`, { method: "DELETE" });
    if (res.ok) { setFlash("已删除"); setTimeout(() => setFlash(null), 2000); load(); }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h1>博客文章</h1>
          <div className="sub">共 {posts.length} 篇</div>
        </div>
        <div className="admin-bar">
          <Link className="admin-btn" href="/admin/blog/new">+ 新建文章</Link>
        </div>
      </div>
      {flash && <div className="admin-flash ok">{flash}</div>}
      <div className="admin-card">
        {posts.length === 0 ? (
          <div className="admin-empty">暂无文章</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>封面</th><th>标题</th><th>作者</th><th>分类</th><th>日期</th><th></th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.slug}>
                  <td>{p.coverImage && <img src={p.coverImage} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }} alt="" />}</td>
                  <td>{p.title}</td>
                  <td>{p.author}</td>
                  <td>{p.category}</td>
                  <td>{p.publishedAt}</td>
                  <td>
                    <Link className="edit" href={`/admin/blog/${p.slug}`}>编辑</Link>
                    <button className="del" onClick={() => del(p.slug, p.title)}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
