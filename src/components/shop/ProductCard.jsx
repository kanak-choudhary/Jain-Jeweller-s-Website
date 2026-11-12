'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.formattedPrice || `₹ ${product.price?.toLocaleString('en-IN')}`,
      image: product.image,
    });
  };

  // Format purity label: e.g. "925 Silver", "22K", "18K", "24K"
  const formattedPurity =
    product.metal === 'silver' && product.purity === '925'
      ? '925 Silver'
      : product.purity;

  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      {/* 1. Image Section - edge-to-edge fit, zero borders, zero extra space */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ivory">
        {/* Favorite Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-charcoal/60 hover:text-burgundy transition-all duration-200 hover:scale-110 focus:outline-none"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? 'text-burgundy fill-burgundy'
                : 'text-charcoal/70 hover:text-burgundy'
            }`}
            strokeWidth={1.4}
          />
        </button>

        {/* Product Image - perfectly fitted edge-to-edge without extra padding or empty borders */}
        <Link href={`#${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.image || '/images/home/shop-by-category/rings-category.webp'}
            alt={product.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Purity at bottom of image */}
        {formattedPurity && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-medium tracking-wide text-charcoal/90 shadow-xs">
              {formattedPurity}
            </span>
          </div>
        )}
      </div>

      {/* 2. Detail Section Below Image */}
      <div className="pt-3 sm:pt-3.5 px-0.5 flex flex-col flex-grow justify-start">
        {/* Product Name */}
        <h3 className="font-serif text-base sm:text-[17px] font-normal text-charcoal group-hover:text-burgundy transition-colors line-clamp-1 leading-snug">
          <Link href={`#${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Product Price & In Stock / Out of Stock */}
        <div className="mt-1 flex items-baseline gap-2.5">
          <span className="font-serif text-base sm:text-lg font-normal text-charcoal tracking-tight">
            {product.formattedPrice || `₹ ${product.price?.toLocaleString('en-IN')}`}
          </span>

          <span
            className={`text-xs sm:text-[13px] font-serif font-normal ${
              product.inStock ? 'text-emerald-700' : 'text-muted'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
