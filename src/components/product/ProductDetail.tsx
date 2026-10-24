"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardProduct } from "./ProductCard";

interface ProductDetailProps {
  product: ProductCardProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [bagDisabled, setBagDisabled] = useState(true);

  const renderStars = () => {
    const full = Math.round(product.rating || 0);
    const empty = 5 - full;
    return (
      <span className="inline-flex items-center text-accent">
        {"★".repeat(full)}
        <span className="text-muted">{"★".repeat(empty)}</span>
      </span>
    );
  };

  const displayImage = product.images?.[activeImage] || product.images?.[0];

  return (
    <div className="container-site py-16 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* LEFT: Large image + thumbnail list */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 md:w-20">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden border transition-all duration-300 ${
                    activeImage === idx
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1 relative aspect-square bg-cream overflow-hidden">
            {displayImage && (
              <Image
                src={displayImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary">
            {product.title}
          </h1>

          {/* Rating + Reviews */}
          <div className="mt-4 flex items-center gap-3 text-sm text-muted font-sans">
            <span className="text-base leading-none">{renderStars()}</span>
            <span>{product.rating} · ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <p className="mt-6 text-2xl text-primary font-medium">
            ${product.price.toFixed(2)}
          </p>

          {/* Selling Points */}
          {product.sellingPoints && product.sellingPoints.length > 0 && (
            <ul className="mt-8 space-y-2 text-sm text-primary/80 font-sans">
              {product.sellingPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent font-semibold mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Shade */}
          {product.shade && (
            <div className="mt-8 pt-6 border-t border-primary/10">
              <p className="text-xs uppercase tracking-wider text-muted font-sans mb-2">
                Shade
              </p>
              <p className="font-serif text-lg text-primary">{product.shade}</p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mt-8 pt-6 border-t border-primary/10">
              <p className="text-xs uppercase tracking-wider text-muted font-sans mb-3">
                Key Ingredients
              </p>
              <p className="text-sm text-primary/80 font-sans leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/collections/${product.category || "all"}`}
              className="btn btn-outline"
            >
              Learn More
            </Link>
            <button
              onClick={() => setBagDisabled(false)}
              disabled={bagDisabled}
              className="btn bg-muted text-white border-muted cursor-not-allowed"
              aria-label="Add to bag"
            >
              +bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
