import { NextResponse } from "next/server";
import { requireAdminOr401 } from "@/lib/guard";
import { getBlogPost, upsertBlogPost, deleteBlogPost } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  const p = getBlogPost(params.slug);
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(p);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const saved = upsertBlogPost({ ...body, slug: params.slug });
    return NextResponse.json(saved);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "bad request" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  const ok = deleteBlogPost(params.slug);
  return NextResponse.json({ ok });
}
