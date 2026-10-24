import { NextResponse } from "next/server";
import { requireAdminOr401 } from "@/lib/guard";
import { getProducts, upsertProduct, deleteProduct } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json(getProducts());
}

export async function POST(req: Request) {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: "slug & title required" }, { status: 400 });
    }
    const saved = upsertProduct(body);
    return NextResponse.json(saved);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "bad request" }, { status: 400 });
  }
}
