import { NextResponse } from "next/server";
import { requireAdminOr401 } from "@/lib/guard";
import { getPage, updatePage } from "@/lib/db";

const VALID_KEYS = ["home", "about", "faq", "contact", "shippingReturns"];

export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  if (!VALID_KEYS.includes(params.key)) return NextResponse.json({ error: "invalid key" }, { status: 400 });
  const page = getPage(params.key);
  if (!page) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  if (!VALID_KEYS.includes(params.key)) return NextResponse.json({ error: "invalid key" }, { status: 400 });
  try {
    const body = await req.json();
    const saved = updatePage(params.key, body);
    return NextResponse.json(saved);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "bad request" }, { status: 400 });
  }
}
