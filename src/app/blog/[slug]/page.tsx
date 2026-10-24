import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

interface PageProps {
  params: { slug: string };
}

function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = (blogData as any).posts as BlogPost[];
  return posts.find((p) => p.slug === slug);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found — Lightyear Journal" };
  return {
    title: `${post.title} — Lightyear Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export function generateStaticParams() {
  const posts = (blogData as any).posts as BlogPost[];
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const all = (blogData as any).posts as BlogPost[];
  const related = all
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article>
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
            <Link href="/blog" className="hover:text-primary transition-colors">
              Journal
            </Link>
          </li>
        </ol>
      </nav>

      {/* Cover image */}
      <div className="container-site px-0 md:px-0 pb-10 md:pb-14">
        <div className="reveal visible relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-cream">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article content */}
      <div className="container-site pb-20 md:pb-28 lg:pb-32">
        <header className="reveal visible max-w-3xl mx-auto text-center mb-12">
          <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
            {post.category}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mt-4">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted font-sans">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        <div className="reveal visible max-w-3xl mx-auto space-y-6">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="text-primary/80 font-sans leading-relaxed text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-primary/10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-wider bg-cream px-3 py-1.5 text-muted font-sans rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="reveal visible border-t border-primary/10 bg-bg-warm">
          <div className="container-site py-16 md:py-20">
            <header className="text-center mb-10 md:mb-14">
              <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
                Keep Reading
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mt-3">
                Related Articles
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                  <article className="space-y-4">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider-2 text-muted font-sans">
                        {formatDate(p.publishedAt)}
                      </p>
                      <h3 className="font-serif text-xl md:text-2xl text-primary leading-snug group-hover:text-accent transition-colors duration-300">
                        {p.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
