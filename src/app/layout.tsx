import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  variable: "--font-frank-ruhl-libre",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lightyear Glasses — Beauty Beyond Clean | Natural Makeup & Skincare",
  description:
    "Sustainable makeup and skincare powered by superfood ingredients. Clean beauty that actually performs — gentle enough for sensitive skin.",
  metadataBase: new URL("https://mo.lightyearglasses.com"),
  openGraph: {
    title: "Lightyear Glasses — Beauty Beyond Clean",
    description:
      "Sustainable makeup and skincare powered by superfood ingredients.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lightyear Glasses — Beauty Beyond Clean",
    description:
      "Sustainable makeup and skincare powered by superfood ingredients.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${frankRuhlLibre.variable} ${roboto.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-bg">
        <ScrollReveal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
