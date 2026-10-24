import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/carousel/Carousel";
import ProductCard from "@/components/product/ProductCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import productsData from "@/data/products.json";
import pagesData from "@/data/pages.json";
import blogData from "@/data/blog.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Product {
  id: string;
  slug: string;
  title: string;
  images: string[];
  rating: number;
  reviews: number;
  sellingPoints?: string[];
  category?: string;
  price: number;
  shade?: string;
  featured?: boolean;
  status?: string;
  ingredients?: string;
}

interface Testimonial {
  name: string;
  rating: number;
  content: string;
  product: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  publishedAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const products = (productsData as { products: Product[] }).products;
const featured: Product[] = products.filter(
  (p) => p.featured && p.status === "published"
);

const home = (pagesData as { home: Record<string, any> }).home;
const hero = home.hero || {};
const brandIntro = home.brandIntro || {};
const asSeenIn = home.asSeenIn || {};
const bestSellers = home.bestSellers || {};
const featuredSection = home.featuredSection || {};
const testimonials = (home.testimonials || { items: [] }) as {
  title: string;
  items: Testimonial[];
};
const quote = home.quote || {};
const newsletter = home.newsletter || {};

const blogPosts: BlogPost[] = ((blogData as { posts: BlogPost[] }).posts || []).slice(0, 3);

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderStars(rating: number) {
  const full = Math.round(rating);
  return "★".repeat(full);
}

// ---------------------------------------------------------------------------
// Page — Server Component
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* 1. Hero                                                      */}
      {/* ------------------------------------------------------------ */}
      <section className="relative w-full h-[85vh] md:h-[92vh] overflow-hidden bg-cream reveal">
        {hero.image && (
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {hero.eyebrow && (
            <span className="section-title text-white/90 mb-6">
              {hero.eyebrow}
            </span>
          )}
          <h1 className="font-serif text-white text-balance max-w-3xl">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-6 text-white/90 text-base md:text-lg max-w-xl font-sans">
              {hero.subtitle}
            </p>
          )}
          {hero.ctaText && (
            <Link
              href={hero.ctaHref || "/collections/makeup"}
              className="mt-10 btn bg-white text-primary border-white hover:bg-primary hover:text-white hover:border-primary"
            >
              {hero.ctaText}
            </Link>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 2. Brand Intro — Beauty Beyond Clean                        */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-bg reveal">
        <div className="container-site">
          <div className="text-center mb-16 md:mb-20">
            <span className="section-title">Our Philosophy</span>
            <h2 className="font-serif text-primary max-w-3xl mx-auto text-balance">
              {brandIntro.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left image */}
            {brandIntro.image && (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={brandIntro.image}
                  alt={brandIntro.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Right text */}
            <div className="flex flex-col gap-6 max-w-xl">
              {(brandIntro.paragraphs as string[])?.map((p, i) => (
                <p key={i} className="text-primary/80 leading-relaxed">
                  {p}
                </p>
              ))}
              <Link
                href="/about"
                className="mt-2 btn btn-outline self-start"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 3. As Seen In — marquee of logos                             */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-cream reveal">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="section-title">{asSeenIn.title || "As Seen In"}</span>
          </div>

          <div className="overflow-hidden relative">
            <div className="flex gap-14 md:gap-20 animate-marquee whitespace-nowrap w-max">
              {[...(asSeenIn.logos || []), ...(asSeenIn.logos || [])].map(
                (logo: string, i: number) => (
                  <span
                    key={`${logo}-${i}`}
                    className="text-muted/70 font-serif text-2xl md:text-3xl tracking-wider uppercase"
                  >
                    {logo}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 4. Best Sellers — Carousel                                   */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-bg reveal">
        <div className="container-site">
          <div className="text-center mb-12 md:mb-16">
            <span className="section-title">Shop Now</span>
            <h2 className="font-serif text-primary">{bestSellers.title}</h2>
            {bestSellers.subtitle && (
              <p className="mt-4 text-primary/70 max-w-xl mx-auto font-sans">
                {bestSellers.subtitle}
              </p>
            )}
          </div>

          {featured.length > 0 ? (
            <Carousel slidesPerView={4} className="overflow-hidden">
              {featured.map((p) => (
                <div key={p.id} className="px-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-muted">No featured products yet.</p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 5. Featured Section — full-width bg image                     */}
      {/* ------------------------------------------------------------ */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden bg-primary reveal">
        {featuredSection.image && (
          <Image
            src={featuredSection.image}
            alt={featuredSection.title}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-site text-center text-white">
            <span className="section-title text-white/80 mb-4">New!</span>
            <h2 className="font-serif max-w-3xl mx-auto text-balance">
              {featuredSection.title}
            </h2>
            {featuredSection.subtitle && (
              <p className="mt-6 text-white/80 text-base md:text-lg max-w-xl mx-auto font-sans">
                {featuredSection.subtitle}
              </p>
            )}
            {featuredSection.ctaText && (
              <Link
                href={featuredSection.ctaHref || "/collections/makeup"}
                className="mt-10 btn bg-white text-primary border-white hover:bg-primary hover:text-white hover:border-white"
              >
                {featuredSection.ctaText}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 6. Testimonials — Loved by Many                              */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-bg reveal">
        <div className="container-site">
          <div className="text-center mb-12 md:mb-16">
            <span className="section-title">Reviews</span>
            <h2 className="font-serif text-primary">{testimonials.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {testimonials.items.map((t, i) => (
              <div
                key={i}
                className="border border-primary/10 p-8 flex flex-col gap-3 bg-cream/40"
              >
                <p className="text-accent text-sm leading-none">
                  {renderStars(t.rating)}
                </p>
                <p className="text-primary/80 italic font-serif text-lg leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-2 flex justify-between items-end font-sans">
                  <span className="text-sm font-medium text-primary">
                    {t.name}
                  </span>
                  <span className="text-xs text-muted uppercase tracking-wider">
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 7. Quote Section                                             */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-cream reveal">
        <div className="container-site text-center">
          <span className="text-accent text-6xl md:text-7xl font-serif leading-none block mb-6">
            &ldquo;
          </span>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary max-w-3xl mx-auto italic text-balance leading-snug">
            {quote.text}
          </blockquote>
          {quote.author && (
            <p className="mt-8 text-xs uppercase tracking-wider text-muted font-sans">
              — {quote.author}
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 8. Journal Preview                                           */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-bg reveal">
        <div className="container-site">
          <div className="text-center mb-12 md:mb-16">
            <span className="section-title">Journal</span>
            <h2 className="font-serif text-primary">From the Journal</h2>
            <p className="mt-4 text-primary/70 max-w-xl mx-auto font-sans">
              Beauty tips, product deep-dives, and stories from our community.
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted font-sans mb-2">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="font-serif text-xl text-primary group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No journal entries yet.</p>
          )}

          <div className="text-center mt-12">
            <Link href="/blog" className="btn btn-outline">
              Read the Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 9. Newsletter CTA                                            */}
      {/* ------------------------------------------------------------ */}
      <section className="section bg-cream reveal">
        <div className="container-site max-w-2xl text-center">
          <span className="section-title">Stay Connected</span>
          <h2 className="font-serif text-primary">{newsletter.title}</h2>
          {newsletter.subtitle && (
            <p className="mt-4 text-primary/70 font-sans">{newsletter.subtitle}</p>
          )}

          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
