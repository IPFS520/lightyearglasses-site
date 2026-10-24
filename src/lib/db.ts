/**
 * 数据层：管理 products.json / blog.json / pages.json 的读写
 * - 生产环境：DATA_DIR 指向 /var/www/lightyear-site/data
 * - 开发环境：默认指向 ./data（= src/data 同级），首次启动自动从 src/data 复制作为种子
 */
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const SEED_DIR = path.join(process.cwd(), 'src', 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/** 首次启动时用源码里的 JSON 作为种子 */
function ensureSeeded() {
  ensureDir();
  for (const name of ['products.json', 'blog.json', 'pages.json']) {
    const target = path.join(DATA_DIR, name);
    if (!fs.existsSync(target)) {
      const seed = path.join(SEED_DIR, name);
      if (fs.existsSync(seed)) {
        fs.copyFileSync(seed, target);
      } else {
        // 兜底空结构
        const empty = name === 'pages.json'
          ? JSON.stringify({ home: {}, about: {}, faq: {}, contact: {}, shippingReturns: {} }, null, 2)
          : JSON.stringify({ [name === 'products.json' ? 'products' : 'posts']: [] }, null, 2);
        fs.writeFileSync(target, empty, 'utf8');
      }
    }
  }
}

function readJSON<T>(name: string): T {
  ensureSeeded();
  const file = path.join(DATA_DIR, name);
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw) as T;
}

function writeJSON<T>(name: string, data: T): void {
  ensureSeeded();
  const file = path.join(DATA_DIR, name);
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, file); // 原子替换，避免读到半写文件
}

// ====== 产品 ======
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  rating?: number;
  reviews?: number;
  sellingPoints?: string[];
  category?: string;
  subcategory?: string;
  price?: number;
  shade?: string;
  featured?: boolean;
  status?: string;
  ingredients?: string;
  createdAt?: string;
}

export function getProducts() {
  const data = readJSON<{ products: Product[]; categories?: { slug: string; title: string }[] }>('products.json');
  return data;
}

export function saveProducts(data: { products: Product[]; categories?: any[] }) {
  writeJSON('products.json', data);
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().products.find(p => p.slug === slug);
}

export function upsertProduct(product: Product): Product {
  const db = getProducts();
  const idx = db.products.findIndex(p => p.slug === product.slug);
  const now = new Date().toISOString().slice(0, 10);
  const filled = { ...product, createdAt: product.createdAt || now };
  if (idx >= 0) {
    db.products[idx] = filled;
  } else {
    if (!filled.id) filled.id = String(Date.now());
    db.products.push(filled);
  }
  saveProducts(db);
  return filled;
}

export function deleteProduct(slug: string): boolean {
  const db = getProducts();
  const len = db.products.length;
  db.products = db.products.filter(p => p.slug !== slug);
  if (db.products.length === len) return false;
  saveProducts(db);
  return true;
}

// ====== 博客 ======
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

export function getBlog() {
  return readJSON<{ posts: BlogPost[] }>('blog.json');
}

export function saveBlog(data: { posts: BlogPost[] }) {
  writeJSON('blog.json', data);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlog().posts.find(p => p.slug === slug);
}

export function upsertBlogPost(post: BlogPost): BlogPost {
  const db = getBlog();
  const idx = db.posts.findIndex(p => p.slug === post.slug);
  const now = new Date().toISOString().slice(0, 10);
  const filled = { ...post, publishedAt: post.publishedAt || now };
  if (idx >= 0) {
    db.posts[idx] = filled;
  } else {
    if (!filled.id) filled.id = String(Date.now());
    db.posts.unshift(filled);
  }
  saveBlog(db);
  return filled;
}

export function deleteBlogPost(slug: string): boolean {
  const db = getBlog();
  const len = db.posts.length;
  db.posts = db.posts.filter(p => p.slug !== slug);
  if (db.posts.length === len) return false;
  saveBlog(db);
  return true;
}

// ====== 页面内容 ======
export function getPages() {
  return readJSON<Record<string, any>>('pages.json');
}

export function savePages(pages: Record<string, any>) {
  writeJSON('pages.json', pages);
}

export function getPage(key: string): any {
  return getPages()[key];
}

export function updatePage(key: string, value: any) {
  const pages = getPages();
  pages[key] = value;
  savePages(pages);
  return pages[key];
}

export const DATA_PATH = DATA_DIR;
export const UPLOAD_PATH = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), '.uploads'));
