/**
 * 运行时数据读取（Server Component / Server Action 直接用）
 * 与 src/lib/db.ts 共用同一个 DATA_DIR，保证后台改完前台立刻读到
 */
export {
  getProducts, getProduct,
  getBlog, getBlogPost,
  getPages, getPage,
  DATA_PATH, UPLOAD_PATH,
} from "./db";

/** 给 Client Component 用的简单封装 */
export async function fetchPublicData(type?: "products" | "blog" | "pages") {
  const params = type ? `?type=${type}` : "";
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/data${params}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("fetch data failed");
  return res.json();
}
