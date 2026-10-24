"use client";

import { useEffect, useState } from "react";
import { useAdminFetch } from "../../lib";

const PAGES: { key: string; label: string; path?: string }[] = [
  { key: "home", label: "🏠 首页内容", path: "/" },
  { key: "about", label: "📖 关于我们", path: "/pages/about" },
  { key: "faq", label: "❓ 常见问题", path: "/pages/faq" },
  { key: "contact", label: "📞 联系我们", path: "/pages/contact" },
  { key: "shippingReturns", label: "📦 物流与退货", path: "/pages/shipping-returns" },
];

export default function PagesPage() {
  const api = useAdminFetch();
  const [active, setActive] = useState(PAGES[0].key);
  const [raw, setRaw] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api(`/api/admin/pages/${active}`);
      if (res.ok) {
        const json = await res.json();
        setRaw(JSON.stringify(json, null, 2));
      }
    })();
  }, [active]);

  const prettify = () => {
    try { setRaw(JSON.stringify(JSON.parse(raw), null, 2)); }
    catch { alert("JSON 有语法错误，无法格式化"); }
  };

  const save = async () => {
    setBusy(true);
    try {
      const body = JSON.parse(raw);
      const res = await api(`/api/admin/pages/${active}`, {
        method: "PUT", body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      setFlash("✅ 已保存"); setTimeout(() => setFlash(null), 2000);
    } catch (e: any) {
      setFlash("❌ 保存失败: " + e.message);
    } finally { setBusy(false); }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h1>页面内容</h1>
          <div className="sub">用 JSON 编辑器直接修改每个页面的文字、图片、结构</div>
        </div>
      </div>
      {flash && <div className={`admin-flash ${flash.startsWith("✅") ? "ok" : "err"}`}>{flash}</div>}

      <div className="admin-card">
        <div className="admin-bar">
          {PAGES.map(p => (
            <button
              key={p.key}
              className={`admin-btn ${active === p.key ? "" : "ghost"}`}
              onClick={() => setActive(p.key)}
            >
              {p.label}
            </button>
          ))}
          <div className="spacer" />
          <button className="admin-btn ghost" onClick={prettify}>🔧 格式化</button>
          <button className="admin-btn" onClick={save} disabled={busy}>{busy ? "保存中..." : "💾 保存"}</button>
        </div>

        <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
          💡 左侧字段参考：<code style={{ background: "#f5f6f8", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>
            {active === "home" && "hero / brandIntro / testimonials / newsletter / featuredSection / bestSellers / asSeenIn / quote"}
            {active === "about" && "title / subtitle / sections[] (heading + content)"}
            {active === "faq" && "title / items[] (question + answer)"}
            {active === "contact" && "title / subtitle / email / phone / address / hours"}
            {active === "shippingReturns" && "title / content (支持 Markdown 段落)"}
          </code>
        </div>

        <textarea
          value={raw}
          onChange={e => setRaw(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%", minHeight: 480, fontFamily: "Consolas, Monaco, monospace",
            fontSize: 13, background: "#fafbfc", border: "1px solid #e5e7eb", borderRadius: 6,
            padding: 14, lineHeight: 1.55,
          }}
        />
      </div>
    </>
  );
}
