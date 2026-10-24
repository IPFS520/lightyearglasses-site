import { NextResponse } from "next/server";
import { requireAdminOr401 } from "@/lib/guard";
import fs from "node:fs";
import path from "node:path";
import { UPLOAD_PATH } from "@/lib/db";

// 简单的 multipart 解析（只用文件字段，规避 formidable 对 stream 的限制）
async function parseMultipart(req: Request) {
  const ctype = req.headers.get("content-type") || "";
  const m = ctype.match(/boundary=(.+?)(?:$|;)/);
  if (!m) throw new Error("no boundary");
  const boundary = "--" + m[1];
  const buf = Buffer.from(await req.arrayBuffer());
  const parts = buf.toString("binary").split(boundary);
  const files: { field: string; filename: string; mime: string; data: Buffer }[] = [];
  for (const part of parts) {
    if (part.startsWith("--")) continue;
    const trimmed = part.replace(/^\r\n/, "").replace(/\r\n--.*$/, "");
    const headerEnd = trimmed.indexOf("\r\n\r\n");
    if (headerEnd < 0) continue;
    const headers = trimmed.slice(0, headerEnd);
    const body = trimmed.slice(headerEnd + 4);
    const name = headers.match(/name="([^"]+)"/)?.[1];
    const filename = headers.match(/filename="([^"]*)"/)?.[1];
    const mime = headers.match(/Content-Type:\s*(\S+)/i)?.[1] || "application/octet-stream";
    if (name && filename) {
      files.push({
        field: name,
        filename,
        mime,
        data: Buffer.from(body, "binary"),
      });
    }
  }
  return files;
}

function sanitizeExt(name: string) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return null;
  return ext === "jpeg" ? "jpg" : ext;
}

export async function POST(req: Request) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;

  try {
    const files = await parseMultipart(req);
    if (!files.length) return NextResponse.json({ error: "no file" }, { status: 400 });

    if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH, { recursive: true });

    const urls: string[] = [];
    for (const f of files) {
      const ext = sanitizeExt(f.filename);
      if (!ext) continue;
      // 校验真实 mime
      if (!f.mime.startsWith("image/")) continue;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const file = `${id}.${ext}`;
      const full = path.join(UPLOAD_PATH, file);
      fs.writeFileSync(full, f.data);
      urls.push(`/uploads/${file}`);
    }

    return NextResponse.json({ urls });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "upload failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  try {
    const { url } = await req.json();
    if (!url || !url.startsWith("/uploads/")) return NextResponse.json({ error: "bad url" }, { status: 400 });
    const full = path.join(UPLOAD_PATH, path.basename(url));
    if (fs.existsSync(full)) fs.unlinkSync(full);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 400 });
  }
}
