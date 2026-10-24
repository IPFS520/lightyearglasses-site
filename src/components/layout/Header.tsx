"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface NavSubmenu {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubmenu[];
}

const navItems: NavItem[] = [
  {
    label: "Makeup",
    href: "/collections/makeup",
    submenu: [
      { label: "Shop All", href: "/collections/makeup" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Face", href: "/collections/makeup" },
      { label: "Eyes", href: "/collections/makeup" },
      { label: "Lips", href: "/collections/makeup" },
      { label: "Brows", href: "/collections/makeup" },
    ],
  },
  {
    label: "Skincare",
    href: "/collections/skincare",
    submenu: [
      { label: "Shop All", href: "/collections/skincare" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Cleanse & Tone", href: "/collections/skincare" },
      { label: "Moisturise", href: "/collections/skincare" },
      { label: "Eye Care", href: "/collections/skincare" },
      { label: "Serums", href: "/collections/skincare" },
    ],
  },
  {
    label: "Gifts & Sets",
    href: "/collections/gifts",
    submenu: [
      { label: "Gift Sets", href: "/collections/gifts" },
      { label: "Makeup Sets", href: "/collections/gifts" },
      { label: "Skincare Sets", href: "/collections/gifts" },
      { label: "Gift Cards", href: "/collections/gifts" },
    ],
  },
  {
    label: "Our Story",
    href: "/pages/about",
    submenu: [
      { label: "Our Story", href: "/pages/about" },
      { label: "As Seen In", href: "/pages/press" },
      { label: "Retailers", href: "/pages/retailers" },
      { label: "Journal", href: "/blog" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center text-xs py-2 px-4 uppercase tracking-wider-2">
        Free Shipping on Orders Over $75
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop spacer */}
          <div className="hidden md:block w-24" />

          {/* Logo */}
          <Link href="/" className="font-serif text-2xl md:text-3xl tracking-wide">
            Lightyear
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm uppercase tracking-wider-2 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
                {item.submenu && openSubmenu === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-xl border border-gray-100 py-2 mt-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-muted hover:text-primary hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right tools */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/pages/faq"
              className="hidden md:block text-sm hover:text-accent transition-colors"
              aria-label="FAQ"
            >
              FAQ
            </Link>
            <Link
              href="/pages/contact"
              className="hidden md:block text-sm hover:text-accent transition-colors"
              aria-label="Contact"
            >
              Contact
            </Link>
            <button className="hover:text-accent transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hover:text-accent transition-colors hidden md:block" aria-label="Wishlist">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="hover:text-accent transition-colors relative" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="container-site py-4 flex flex-col">
              {navItems.map((item) => (
                <div key={item.label} className="py-1">
                  <Link
                    href={item.href}
                    className="block py-3 font-serif text-xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 border-l border-gray-200 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block py-2 text-sm text-muted"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
                <Link href="/pages/faq" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>
                  FAQ
                </Link>
                <Link href="/pages/contact" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
