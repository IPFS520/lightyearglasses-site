import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-wide mb-4 block">
              Lightyear
            </Link>
            <p className="text-sm text-white/70 mb-6 max-w-xs">
              Sustainable makeup and skincare powered by superfood ingredients. Clean beauty that actually performs.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener" aria-label="Pinterest" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.407-5.957 1.407-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641 0 12.017 0z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm uppercase tracking-wider-2 mb-4 font-sans">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/collections/makeup" className="text-sm text-white/70 hover:text-white transition-colors">Makeup</Link></li>
              <li><Link href="/collections/skincare" className="text-sm text-white/70 hover:text-white transition-colors">Skincare</Link></li>
              <li><Link href="/collections/gifts" className="text-sm text-white/70 hover:text-white transition-colors">Gifts & Sets</Link></li>
              <li><Link href="/collections/best-sellers" className="text-sm text-white/70 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/collections/all" className="text-sm text-white/70 hover:text-white transition-colors">Shop All</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm uppercase tracking-wider-2 mb-4 font-sans">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/pages/faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/pages/shipping-returns" className="text-sm text-white/70 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/pages/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/pages/retailers" className="text-sm text-white/70 hover:text-white transition-colors">Retailers</Link></li>
              <li><Link href="/pages/terms" className="text-sm text-white/70 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider-2 mb-4 font-sans">Stay Connected</h4>
            <p className="text-sm text-white/70 mb-4">
              Get 10% off your first order and be the first to know about new launches.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:border-accent rounded-none"
              />
              <button
                type="submit"
                className="bg-white text-primary px-4 py-2 text-sm font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center md:text-left">
            © {year} Lightyear Glasses. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>Secure Checkout</span>
            <span>•</span>
            <span>Free Returns</span>
            <span>•</span>
            <span>Cruelty-Free & Vegan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
