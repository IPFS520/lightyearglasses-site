import type { Metadata } from "next";
import Link from "next/link";
import pagesData from "@/data/pages.json";
import FAQAccordion from "@/components/faq/FAQAccordion";
import ContactForm from "@/components/contact/ContactForm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PageProps {
  params: { slug: string };
}

interface AboutSection {
  heading: string;
  content: string;
}

interface AboutPage {
  title: string;
  subtitle?: string;
  sections: AboutSection[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPage {
  title: string;
  items: FAQItem[];
}

interface ContactPage {
  title: string;
  subtitle?: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

interface ShippingReturnsPage {
  title: string;
  content: string;
}

interface AsSeenIn {
  title: string;
  logos: string[];
}

// ---------------------------------------------------------------------------
// Fallback data for pages not defined in pages.json
// ---------------------------------------------------------------------------
const PRESS_ARTICLES = [
  {
    source: "Vogue",
    title: "The Next Generation of Clean Beauty",
    date: "March 2026",
    excerpt:
      "Lightyear Glasses is redefining what clean beauty can be — luxurious, effective, and truly sustainable.",
  },
  {
    source: "Allure",
    title: "Best Clean Beauty Brands You Need to Know",
    date: "February 2026",
    excerpt:
      "Our founder's commitment to superfood ingredients has earned Lightyear Glasses a coveted spot on Allure's annual list.",
  },
  {
    source: "Byrdie",
    title: "Why Everyone is Obsessed with This Under-the-Radar Brand",
    date: "January 2026",
    excerpt:
      "From their zero-waste packaging to their clinically-proven formulas, Lightyear Glasses has become a cult favorite among beauty insiders.",
  },
];

const RETAILERS = [
  {
    name: "Sephora",
    address: "500 Broadway, New York, NY 10012",
    city: "New York, NY",
  },
  {
    name: "Ulta Beauty",
    address: "2100 Broadway, New York, NY 10023",
    city: "New York, NY",
  },
  {
    name: "Bluemercury",
    address: "1920 M St NW, Washington, DC 20036",
    city: "Washington, DC",
  },
  {
    name: "Space NK",
    address: "356 West Broadway, New York, NY 10012",
    city: "New York, NY",
  },
  {
    name: "Credo Beauty",
    address: "2035 Fillmore St, San Francisco, CA 94115",
    city: "San Francisco, CA",
  },
  {
    name: "The Detox Market",
    address: "468 W Sixth St, Los Angeles, CA 90014",
    city: "Los Angeles, CA",
  },
];

const TERMS_FALLBACK = `Last Updated: October 2026

Welcome to Lightyear Glasses. By accessing or using our website, you agree to be bound by these Terms & Conditions.

1. Use of Website
   You may use our website for lawful purposes only. You agree not to misuse, copy, or distribute any content without permission.

2. Intellectual Property
   All content, trademarks, and branding on this site are owned by Lightyear Glasses and protected by applicable laws.

3. Orders & Payment
   All orders are subject to availability. We reserve the right to refuse any order at our discretion. Payment is processed securely.

4. Shipping & Delivery
   Please refer to our Shipping & Returns page for detailed shipping information.

5. Limitation of Liability
   Lightyear Glasses shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.

6. Changes to Terms
   We may update these terms from time to time. Continued use of our site constitutes acceptance of the updated terms.

7. Contact
   For any questions about these terms, please email hello@lightyearglasses.com.`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const pages = pagesData as {
  home: { asSeenIn?: AsSeenIn };
  about?: AboutPage;
  faq?: FAQPage;
  contact?: ContactPage;
  shippingReturns?: ShippingReturnsPage;
};

const TITLE_MAP: Record<string, string> = {
  about: "Our Story",
  faq: "Frequently Asked Questions",
  contact: "Get in Touch",
  "shipping-returns": "Shipping & Returns",
  terms: "Terms & Conditions",
  press: "As Seen In",
  retailers: "Where to Find Us",
};

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return [
    { slug: "about" },
    { slug: "faq" },
    { slug: "contact" },
    { slug: "shipping-returns" },
    { slug: "terms" },
    { slug: "press" },
    { slug: "retailers" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = TITLE_MAP[params.slug] || "Page";
  return {
    title: `${title} — Lightyear Glasses`,
    description:
      params.slug === "about"
        ? "Learn about Lightyear Glasses' commitment to clean beauty, sustainability, and superfood-powered formulas."
        : params.slug === "faq"
        ? "Answers to frequently asked questions about our clean beauty products, shipping, returns, and ingredients."
        : params.slug === "contact"
        ? "Get in touch with the Lightyear Glasses team. We'd love to hear from you."
        : "Lightyear Glasses — Beauty Beyond Clean",
    alternates: { canonical: `/pages/${params.slug}` },
  };
}

// ---------------------------------------------------------------------------
// Paragraph splitter (reusable)
// ---------------------------------------------------------------------------
function renderParagraphs(text: string) {
  return text.split("\n\n").map((p, i) => (
    <p
      key={i}
      className="text-primary/80 font-sans leading-relaxed text-base md:text-lg"
    >
      {p}
    </p>
  ));
}

// ---------------------------------------------------------------------------
// Renderers — one per slug
// ---------------------------------------------------------------------------

function AboutRenderer({ data }: { data: AboutPage }) {
  return (
    <>
      {/* Hero */}
      <header className="reveal visible text-center mb-16 md:mb-20">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Our Story
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="mt-6 max-w-xl mx-auto text-primary/70 font-sans text-base md:text-lg">
            {data.subtitle}
          </p>
        )}
      </header>

      {/* Sections */}
      <div className="reveal visible max-w-3xl mx-auto space-y-14 md:space-y-20">
        {(data.sections || []).map((section, idx) => (
          <section key={idx}>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">
              {section.heading}
            </h2>
            <div className="space-y-5">{renderParagraphs(section.content)}</div>
          </section>
        ))}
      </div>
    </>
  );
}

function FAQRenderer({ data }: { data: FAQPage }) {
  return (
    <>
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Help Center
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          {data.title}
        </h1>
      </header>

      <div className="reveal visible max-w-3xl mx-auto">
        <FAQAccordion items={data.items || []} />
      </div>
    </>
  );
}

function ContactRenderer({ data }: { data: ContactPage }) {
  return (
    <>
      {/* Hero */}
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Contact
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="mt-6 max-w-xl mx-auto text-primary/70 font-sans text-base md:text-lg">
            {data.subtitle}
          </p>
        )}
      </header>

      {/* Two-column: contact info + form */}
      <div className="reveal visible grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
        {/* Left — contact info */}
        <div className="space-y-8 font-sans">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">
              Email
            </p>
            <a
              href={`mailto:${data.email}`}
              className="text-primary hover:text-accent transition-colors"
            >
              {data.email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">
              Phone
            </p>
            <a
              href={`tel:${data.phone.replace(/\s|\(|\)|-/g, "")}`}
              className="text-primary hover:text-accent transition-colors"
            >
              {data.phone}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">
              Address
            </p>
            <p className="text-primary">{data.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">
              Business Hours
            </p>
            <p className="text-primary">{data.hours}</p>
          </div>
        </div>

        {/* Right — simple form placeholder */}
        <ContactForm />
      </div>
    </>
  );
}

function ShippingReturnsRenderer({ data }: { data: ShippingReturnsPage }) {
  return (
    <>
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Customer Care
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          {data.title}
        </h1>
      </header>

      <div className="reveal visible max-w-3xl mx-auto space-y-6">
        {renderParagraphs(data.content)}
      </div>
    </>
  );
}

function TermsRenderer() {
  return (
    <>
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Legal
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          Terms & Conditions
        </h1>
      </header>

      <div className="reveal visible max-w-3xl mx-auto space-y-6">
        {renderParagraphs(TERMS_FALLBACK)}
      </div>
    </>
  );
}

function PressRenderer() {
  const logos = pages.home?.asSeenIn?.logos || [
    "VOGUE",
    "ALLURE",
    "ELLE",
    "HARPER'S BAZAAR",
    "Glamour",
    "InStyle",
    "Marie Claire",
    "Cosmopolitan",
  ];

  return (
    <>
      {/* Hero */}
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Press
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          As Seen In
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-primary/70 font-sans text-base md:text-lg">
          Lightyear Glasses has been featured in the world&apos;s most trusted
          beauty and lifestyle publications.
        </p>
      </header>

      {/* Logo wall */}
      <section className="reveal visible py-12 md:py-16 border-y border-primary/10 bg-cream">
        <div className="container-site">
          <div className="flex flex-wrap justify-center items-center gap-x-10 md:gap-x-16 gap-y-8">
            {logos.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="text-muted/70 font-serif text-xl md:text-2xl tracking-wider uppercase"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Press articles */}
      <section className="reveal visible py-16 md:py-24">
        <div className="container-site">
          <header className="text-center mb-12 md:mb-16">
            <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
              Featured Stories
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mt-3">
              In the Media
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {PRESS_ARTICLES.map((article, idx) => (
              <article
                key={idx}
                className="border border-primary/10 p-6 md:p-8 flex flex-col gap-3 hover:border-accent transition-colors duration-300"
              >
                <p className="text-xs uppercase tracking-wider text-accent font-sans">
                  {article.source}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-primary leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-muted font-sans">{article.date}</p>
                <p className="text-primary/70 font-sans text-sm leading-relaxed mt-1">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RetailersRenderer() {
  return (
    <>
      {/* Hero */}
      <header className="reveal visible text-center mb-14 md:mb-16">
        <p className="section-title uppercase text-xs tracking-wider-2 text-muted font-sans">
          Find Us
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mt-4">
          Where to Find Us
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-primary/70 font-sans text-base md:text-lg">
          Our products are available at select beauty retailers across the
          country.
        </p>
      </header>

      <div className="reveal visible grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {RETAILERS.map((r, idx) => (
          <div
            key={idx}
            className="border border-primary/10 bg-white p-6 md:p-8 flex flex-col gap-2 hover:border-accent hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-serif text-xl md:text-2xl text-primary">
              {r.name}
            </h3>
            <p className="text-primary/70 font-sans text-sm leading-relaxed">
              {r.address}
            </p>
            <p className="text-xs text-muted font-sans uppercase tracking-wider mt-1">
              {r.city}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function PagesPage({ params }: PageProps) {
  const slug = params.slug;

  switch (slug) {
    case "about": {
      const data = pages.about;
      if (!data) return <NoDataFallback slug={slug} />;
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <AboutRenderer data={data} />
        </div>
      );
    }

    case "faq": {
      const data = pages.faq;
      if (!data) return <NoDataFallback slug={slug} />;
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <FAQRenderer data={data} />
        </div>
      );
    }

    case "contact": {
      const data = pages.contact;
      if (!data) return <NoDataFallback slug={slug} />;
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <ContactRenderer data={data} />
        </div>
      );
    }

    case "shipping-returns": {
      const data = pages.shippingReturns;
      if (!data) return <NoDataFallback slug={slug} />;
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <ShippingReturnsRenderer data={data} />
        </div>
      );
    }

    case "terms":
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <TermsRenderer />
        </div>
      );

    case "press":
      return <PressRenderer />;

    case "retailers":
      return (
        <div className="container-site py-16 md:py-24 lg:py-32">
          <RetailersRenderer />
        </div>
      );

    default:
      return <NoDataFallback slug={slug} />;
  }
}

// ---------------------------------------------------------------------------
// Fallback when no matching page is found
// ---------------------------------------------------------------------------
function NoDataFallback({ slug }: { slug: string }) {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
        Page not found
      </h1>
      <p className="text-primary/60 font-sans mb-8">
        We couldn&apos;t find content for &ldquo;{slug}&rdquo;.
      </p>
      <Link href="/" className="btn btn-outline">
        Back to Home
      </Link>
    </div>
  );
}
