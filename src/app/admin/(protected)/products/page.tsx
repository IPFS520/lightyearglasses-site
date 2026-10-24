"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminFetch } from "../../lib";

export default function ProductsListPage() {
  const api = useAdminFetch();
  const [data, setData] = useState<{ products: any[]; categories: any[] }>({ products: [], categories: [] });
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    const res = await api("/api/admin/products");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => { load(); }, []);

  const del = async (slug: string, title: string) => {
    if (!confirm(`确定删除产品「${title}」吗？`)) return;
    const res = await api(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setFlash("已删除");
      setTimeout(() => setFlash(null), 2000);
      load();
    }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h1>产品管理</h1>
          <div className="sub">编辑 / 删除所有产品信息</div>
        </div>
        <div className="admin-bar">
          <Link className="admin-btn" href="/admin/products/new">+ 新建产品</Link>
        </div>
      </div>
      {flash && <div className="admin-flash ok">{flash}</div>}
      <div className="admin-card">
        <h2>产品列表（{data.products.length}）</h2>
        {data.products.length === 0 ? (
          <div className="admin-empty">暂无产品，点右上角「新建产品」开始吧</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th style={{ width: 56 }}>图</th><th>产品</th><th>slug</th><th>分类</th><th>价格</th><th>推荐</th><th></th></tr>
            </thead>
            <tbody>
              {data.products.map(p => (
                <tr key={p.slug}>
                  <td>
                    {p.images?.[0] && <img src={p.images[0]} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} />}
                  </td>
                  <td>{p.title}</td>
                  <td style={{ color: "#888" }}>{p.slug}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.featured ? "⭐" : ""}</td>
                  <td>
                    <Link className="edit" href={`/admin/products/${p.slug}`}>编辑</Link>
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
