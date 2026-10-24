import { NextResponse } from "next/server";
import { getProducts, getBlog, getPages } from "@/lib/db";

// 公开数据 API，供前台运行时读取最新 JSON
// NEXT_PUBLIC 不暴露敏感字段
export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  switch (type) {
    case "products":
      return NextResponse.json(getProducts());
    case "blog":
      return NextResponse.json(getBlog());
    case "pages":
      return NextResponse.json(getPages());
    default:
      return NextResponse.json(
        {
          products: getProducts(),
          blog: getBlog(),
          pages: getPages(),
        },
        { headers: { "Cache-Control": "no-store" } }
      );
  }
}
