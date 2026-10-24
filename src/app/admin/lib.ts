"use client";

import { useCallback } from "react";

/** 统一 fetch，自动带 credentials + CSRF 头 */
export function useAdminFetch() {
  return useCallback(async (url: string, init?: RequestInit) => {
    const res = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });
    if (res.status === 401) {
      window.location.href = "/admin/login?error=session";
      throw new Error("unauthorized");
    }
    return res;
  }, []);
}

/** 文件上传 */
export async function uploadFiles(files: File[]): Promise<string[]> {
  const form = new FormData();
  files.forEach(f => form.append("files", f));
  const res = await fetch("/api/admin/upload", { method: "POST", body: form, credentials: "include" });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.urls || [];
}

/** slug 化 */
export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export function nowISO() {
  return new Date().toISOString().slice(0, 10);
}
