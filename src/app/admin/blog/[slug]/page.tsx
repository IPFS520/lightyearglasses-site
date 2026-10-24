"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminFetch, uploadFiles, slugify, nowISO } from "../lib";

const empty = {
  slug: "", title: "", excerpt: "", coverImage: "", content: "",
  author: "", category: "", tags: [] as string[], publishedAt: "",
};

export default function BlogEditorPage({ params }: { params: { slug: string } }) {
  const isNew = params.slug === "new";
  const api = useAdminFetch();
  const [item, setItem] = useState<any>({ ...empty, slug: isNew ? "" : params.slug });
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await api(`/api/admin/blog/${params.slug}`);
      if (res.ok) setItem(await res.json());
    })();
  }, [isNew, params.slug]);

  const set = (k: string, v: any) => setItem((o: any) => ({ ...o, [k]: v }));
  const autoSlug = () => { if (!item.slug || item.slug === slugify(item.title)) set("slug", slugify(item.title)); };

  const onUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { setBusy(true); const urls = await uploadFiles([f]); if (urls[0]) set("coverImage", urls[0]); }
    catch (err: any) { alert("上传失败: " + err.message); } finally { setBusy(false); e.target.value = ""; }
  };

  const save = async () => {
    setBusy(true);
    try {
      const body = { ...item };
      if (!body.publishedAt) body.publishedAt = nowISO();
      const res = await api(`/api/admin/blog/${body.slug}`, {
        method: isNew ? "POST" : "PUT", body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      setFlash("✅ 已保存"); setTimeout(() => setFlash(null), 2000);
      if (isNew) { const d = await res.json(); window.location.href = `/admin/blog/${d.slug}`; }
    } catch (e: any) { setFlash("❌ " + e.message); } finally { setBusy(false); }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h1>{isNew ? "新建博客文章" : `编辑 · ${item.title || item.slug}`}</h1>
        </div>
      </div>
      {flash && <div className={`admin-flash ${flash.startsWith("✅") ? "ok" : "err"}`}>{flash}</div>}

      <div className="admin-card">
        <div className="admin-form">
          <div className="row">
            <div className="field">
              <label>标题 *</label>
              <input type="text" value={item.title || ""} onChange={e => set("title", e.target.value)} onBlur={autoSlug} />
            </div>
            <div className="field">
              <label>Slug *</label>
              <input type="text" value={item.slug || ""} onChange={e => set("slug", e.target.value)} />
            </div>
          </div>
          <div className="row3">
            <div className="field"><label>作者</label><input type="text" value={item.author || ""} onChange={e => set("author", e.target.value)} /></div>
            <div className="field"><label>分类</label><input type="text" value={item.category || ""} onChange={e => set("category", e.target.value)} /></div>
            <div className="field"><label>发布日期</label><input type="date" value={item.publishedAt || ""} onChange={e => set("publishedAt", e.target.value)} /></div>
          </div>
          <div className="field">
            <label>摘要</label>
            <textarea rows={2} value={item.excerpt || ""} onChange={e => set("excerpt", e.target.value)} />
          </div>
          <div className="field">
            <label>封面图（点击上传）</label>
            <input type="file" accept="image/*" onChange={onUploadCover} style={{ marginBottom: 10 }} />
            {item.coverImage && (
              <img src={item.coverImage} style={{ maxWidth: 200, borderRadius: 6, border: "1px solid #eee" }} alt="" />
            )}
          </div>
          <div className="field">
            <label>正文（支持 Markdown）</label>
            <textarea rows={14} value={item.content || ""} onChange={e => set("content", e.target.value)} />
          </div>
          <div className="field">
            <label>标签（逗号分隔）</label>
            <input type="text" value={(item.tags || []).join(", ")} onChange={e => set("tags", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
          </div>
          <div className="actions">
            <button className="admin-btn" onClick={save} disabled={busy}>{busy ? "保存中..." : "💾 保存"}</button>
            <Link className="admin-btn ghost" href="/admin/blog">取消</Link>
          </div>
        </div>
      </div>
    </>
  );
}
