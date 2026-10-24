"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminFetch, uploadFiles, slugify, nowISO } from "../../lib";

const empty = {
  slug: "", title: "", description: "", images: [] as string[],
  rating: 4.5, reviews: 0, sellingPoints: [] as string[],
  category: "makeup", subcategory: "", price: 0, shade: "",
  featured: false, status: "published", ingredients: "", createdAt: "",
};

export default function ProductEditorPage({ params }: { params: { slug: string } }) {
  const isNew = params.slug === "new";
  const api = useAdminFetch();
  const [item, setItem] = useState<any>({ ...empty, slug: isNew ? "" : params.slug });
  const [cats, setCats] = useState<string[]>(["makeup", "skincare", "gifts"]);
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await api(`/api/admin/products/${params.slug}`);
      if (res.ok) {
        const json = await res.json();
        setItem(json);
      }
      const all = await api("/api/admin/products");
      const ad = await all.json();
      if (ad.categories) setCats(ad.categories.map((c: any) => c.slug));
    })();
  }, [isNew, params.slug]);

  const set = (k: string, v: any) => setItem((o: any) => ({ ...o, [k]: v }));

  const autoSlug = () => {
    if (!item.slug || item.slug === slugify(item.title)) set("slug", slugify(item.title));
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    try {
      setBusy(true);
      const urls = await uploadFiles(Array.from(e.target.files));
      set("images", [...(item.images || []), ...urls]);
    } catch (err: any) {
      alert("上传失败: " + err.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const removeImg = async (idx: number) => {
    const url = item.images[idx];
    const list = [...item.images]; list.splice(idx, 1);
    set("images", list);
    try { await api("/api/admin/upload", { method: "DELETE", body: JSON.stringify({ url }) }); } catch {}
  };

  const save = async () => {
    setBusy(true);
    try {
      const body = { ...item };
      if (!body.createdAt) body.createdAt = nowISO();
      const res = await api(`/api/admin/products/${body.slug}`, {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      setFlash("✅ 已保存");
      setTimeout(() => setFlash(null), 2000);
      if (isNew) {
        const data = await res.json();
        window.location.href = `/admin/products/${data.slug}`;
      }
    } catch (e: any) {
      setFlash("❌ 保存失败: " + e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h1>{isNew ? "新建产品" : `编辑 · ${item.title || item.slug}`}</h1>
          <div className="sub">填写产品信息，点击保存即可发布</div>
        </div>
      </div>
      {flash && <div className={`admin-flash ${flash.startsWith("✅") ? "ok" : "err"}`}>{flash}</div>}

      <div className="admin-card">
        <div className="admin-form">
          <div className="row">
            <div className="field">
              <label>产品名称 *</label>
              <input type="text" value={item.title || ""} onChange={e => set("title", e.target.value)} onBlur={autoSlug} />
            </div>
            <div className="field">
              <label>Slug *（URL 里用，英文连字符）</label>
              <input type="text" value={item.slug || ""} onChange={e => set("slug", e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>产品简介</label>
            <textarea rows={3} value={item.description || ""} onChange={e => set("description", e.target.value)} />
          </div>

          <div className="field">
            <label>产品图片（可上传多张）</label>
            <input type="file" multiple accept="image/*" onChange={onUpload} style={{ marginBottom: 10 }} />
            {busy && <span style={{ color: "#c89c6d", marginLeft: 8 }}>上传中...</span>}
            <div className="admin-imgs">
              {(item.images || []).map((u: string, i: number) => (
                <div className="admin-img" key={i}>
                  <img src={u.startsWith("/") ? u : u} alt="" />
                  <button className="x" onClick={() => removeImg(i)}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="row3">
            <div className="field">
              <label>价格 ($)</label>
              <input type="number" step="0.01" value={item.price ?? 0} onChange={e => set("price", +e.target.value)} />
            </div>
            <div className="field">
              <label>分类</label>
              <select value={item.category || "makeup"} onChange={e => set("category", e.target.value)}>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>子分类</label>
              <input type="text" value={item.subcategory || ""} onChange={e => set("subcategory", e.target.value)} placeholder="face / eyes / ..." />
            </div>
          </div>

          <div className="row3">
            <div className="field">
              <label>评分</label>
              <input type="number" step="0.1" value={item.rating ?? 0} onChange={e => set("rating", +e.target.value)} />
            </div>
            <div className="field">
              <label>评价数</label>
              <input type="number" value={item.reviews ?? 0} onChange={e => set("reviews", +e.target.value)} />
            </div>
            <div className="field switch">
              <input id="f" type="checkbox" checked={!!item.featured} onChange={e => set("featured", e.target.checked)} />
              <label htmlFor="f" style={{ margin: 0, textTransform: "none" }}>⭐ 首页推荐</label>
            </div>
          </div>

          <div className="field">
            <label>主色调 / 色号</label>
            <input type="text" value={item.shade || ""} onChange={e => set("shade", e.target.value)} placeholder="Nougat | Fairest Neutral" />
          </div>

          <div className="field">
            <label>核心卖点（每行一个）</label>
            <textarea rows={4} value={(item.sellingPoints || []).join("\n")} onChange={e => set("sellingPoints", e.target.value.split("\n").filter(Boolean))} />
          </div>

          <div className="field">
            <label>成分</label>
            <textarea rows={2} value={item.ingredients || ""} onChange={e => set("ingredients", e.target.value)} />
          </div>

          <div className="actions">
            <button className="admin-btn" onClick={save} disabled={busy}>{busy ? "保存中..." : "💾 保存"}</button>
            <Link className="admin-btn ghost" href="/admin/products">取消</Link>
          </div>
        </div>
      </div>
    </>
  );
}
