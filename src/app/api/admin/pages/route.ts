import { NextResponse } from "next/server";
import { requireAdminOr401 } from "@/lib/guard";
import { getPages, updatePage } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminOr401();
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json(getPages());
}
