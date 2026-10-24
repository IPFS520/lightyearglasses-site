"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProduct {
  id: string;
  slug: string;
  title: string;
  images: string[];
  rating: number;
  reviews: number;
  sellingPoints?: string[];
  price: number;
  shade?: string;
  featured?: boolean;
  category?: string;
  status?: string;
  ingredients?: string;
}

interface ProductCardProps {
  product: ProductCardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasSecondImage = product.images && product.images.length > 1;

  const renderStars = () => {
    const full = Math.round(product.rating || 0);
    const empty = 5 - full;
    return (
      <span className="inline-flex items-center">
        {"★".repeat(full)}
        {"☆".repeat(empty)}
      </span>
    );
  };

  const buildImageUrl = (url: string, fallback: number): string => {
    if (!url || imageError) {
      // Fallback to a placeholder
      return `https://images.unsplash.com/photo-${fallback}?w=600&h=600&fit=crop`;
    }
    return url;
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative bg-white transition-all duration-500 ease-out ${
          hovered ? "-translate-y-1 shadow-xl" : "shadow-sm"
        }`}
      >
        {/* 1:1 square image container */}
        <div className="relative w-full aspect-square overflow-hidden bg-cream">
          {/* Primary image */}
          <Image
            src={buildImageUrl(product.images?.[0], 1631730359585)}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-500 ease-out ${
              hasSecondImage && hovered ? "opacity-0" : "opacity-100"
            }`}
            onError={() => setImageError(true)}
          />

          {/* Secondary image (hover fade-in) */}
          {hasSecondImage && (
            <Image
              src={buildImageUrl(product.images?.[1], 1596462502278)}
              alt={`${product.title} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`absolute inset-0 object-cover transition-opacity duration-500 ease-out ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
              onError={() => setImageError(true)}
            />
          )}

          {/* Shade tag if present */}
          {product.shade && (
            <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider bg-white/90 backdrop-blur px-2 py-1 text-primary/70 font-sans">
              {product.shade}
            </span>
          )}
        </div>

        {/* Info below image */}
        <div className="pt-4 pb-2 text-center">
          <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors duration-300">
            {product.title}
          </h3>

          {/* Rating + Reviews */}
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted font-sans">
            <span className="text-accent text-sm leading-none">
              {renderStars()}
            </span>
            <span className="tracking-wide">({product.reviews})</span>
          </div>

          {/* Price */}
          <p className="mt-3 text-sm text-primary font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
