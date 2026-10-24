import Link from "next/link";
import Image from "next/image";
import { getBlog } from "@/lib/db";

export const dynamic = "force-dynamic";

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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getBlog().posts as BlogPost[];

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="container-site py-12 md:py-16 lg:py-20">
      {/* Page header */}
      <header className="reveal visible text-center mb-12 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          The Journal
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-3">
          Journal
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-primary/70 font-sans text-base md:text-lg">
          Stories, beauty tips, and clean beauty insights from the Lightyear team.
        </p>
      </header>

      {/* Post grid */}
      <div className="reveal visible grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {sortedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="space-y-4">
              {/* Cover image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider-2 text-muted font-sans">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-primary leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-primary/60 font-sans text-sm md:text-base leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
