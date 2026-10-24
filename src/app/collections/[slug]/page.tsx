export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard, { ProductCardProduct } from "@/components/product/ProductCard";

interface PageProps {
  params: { slug: string };
}

const SLUG_TO_TITLE: Record<string, string> = {
  all: "All Products",
  "best-sellers": "Best Sellers",
  makeup: "Makeup",
  skincare: "Skincare",
  gifts: "Gifts & Sets",
};

const TABS = [
  { slug: "all", label: "All" },
  { slug: "best-sellers", label: "Best Sellers" },
  { slug: "makeup", label: "Makeup" },
  { slug: "skincare", label: "Skincare" },
  { slug: "gifts", label: "Gifts" },
];

function filterProducts(slug: string, raw: ProductCardProduct[]): ProductCardProduct[] {
  const published = raw.filter((p) => p.status === "published");

  switch (slug) {
    case "all":
      return published;
    case "best-sellers":
      return published.filter((p) => p.featured);
    case "makeup":
    case "skincare":
    case "gifts":
      return published.filter((p) => p.category === slug);
    default:
      return published;
  }
}

export function generateStaticParams() {
  return [
    { slug: "all" },
    { slug: "makeup" },
    { slug: "skincare" },
    { slug: "gifts" },
    { slug: "best-sellers" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const title = SLUG_TO_TITLE[slug] || "Collections";
  return {
    title: `${title} — Lightyear Glasses`,
    description: `Shop our ${title.toLowerCase()} collection. Clean, natural beauty products powered by superfood ingredients.`,
    alternates: { canonical: `/collections/${slug}` },
  };
}

export default function CollectionPage({ params }: PageProps) {
  const slug = params.slug;
  const all = (productsData as { products: ProductCardProduct[] }).products;
  const filtered = filterProducts(slug, all);
  const title = SLUG_TO_TITLE[slug] || "All Products";

  return (
    <div className="container-site py-12 md:py-16 lg:py-20">
      {/* Page header */}
      <header className="reveal visible text-center mb-10 md:mb-14">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          The Collection
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mt-3">
          {title}
        </h1>
      </header>

      {/* Category tab filter */}
      <nav
        className="reveal visible flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12 border-b border-primary/10 pb-6"
        aria-label="Collection filters"
      >
        {TABS.map((tab) => {
          const active = tab.slug === slug;
          return (
            <Link
              key={tab.slug}
              href={`/collections/${tab.slug}`}
              className={`text-sm font-sans uppercase tracking-wider pb-2 border-b-2 transition-colors duration-300 ${
                active
                  ? "border-accent text-primary"
                  : "border-transparent text-muted hover:text-primary hover:border-primary/30"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="reveal visible grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="reveal visible text-center py-24">
          <p className="font-serif text-2xl md:text-3xl text-primary mb-4">
            No products found
          </p>
          <p className="text-muted font-sans mb-8">
            We couldn&apos;t find any products in this collection yet.
          </p>
          <Link href="/collections/all" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
