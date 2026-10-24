import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/db";
import ProductDetail from "@/components/product/ProductDetail";
import ProductCard, { ProductCardProduct } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

function getProductBySlug(slug: string): ProductCardProduct | undefined {
  return getProducts().products.find((p) => p.slug === slug && p.status === "published");
}

export function generateStaticParams(): { slug: string }[] {
  return [];
}

function getAll(): ProductCardProduct[] {
  return getProducts().products;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found — Lightyear Glasses" };
  }
  return {
    title: `${product.title} — Lightyear Glasses`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const all = getAll();
  const related = all
    .filter(
      (p) =>
        p.status === "published" &&
        p.slug !== product.slug &&
        p.category === product.category
    )
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="container-site pt-10 pb-4 text-xs uppercase tracking-wider text-muted font-sans">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/collections/${product.category || "all"}`}
              className="hover:text-primary transition-colors"
            >
              {product.category || "collection"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-primary">{product.title}</li>
        </ol>
      </nav>

      {/* Main product detail */}
      <ProductDetail product={product} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="reveal visible border-t border-primary/10">
          <div className="container-site py-16 md:py-20 lg:py-24">
            <header className="text-center mb-10 md:mb-14">
              <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
                You May Also Like
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mt-3">
                Related Products
              </h2>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
