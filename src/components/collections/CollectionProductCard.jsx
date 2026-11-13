'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function CollectionProductCard({ product }) {
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

  const sellingPrice = product.formattedPrice || `₹ ${product.price?.toLocaleString('en-IN')}`;
  const originalPrice = product.originalPrice
    ? (product.formattedOriginalPrice || `₹ ${product.originalPrice?.toLocaleString('en-IN')}`)
    : null;

  return (
    <div className="group relative flex flex-col h-full bg-transparent select-none cursor-default">
      {/* 1. Square 1:1 Image Container with Neutral Luxury Background */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ivory/50 border border-border-soft/60">
        {/* Minimal Functional Favorite/Heart Icon (Top-Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 z-10 p-2 rounded-full text-charcoal/60 hover:text-burgundy bg-white/70 hover:bg-white backdrop-blur-xs transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <Heart
            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-200 ${
              isWishlisted
                ? 'text-burgundy fill-burgundy'
                : 'text-charcoal/70 hover:text-burgundy'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Centered Product Image with object-fit: contain (Non-clickable) */}
        <div className="relative w-full h-full p-4 sm:p-5 flex items-center justify-center pointer-events-none">
          <Image
            src={product.image || '/images/home/shop-by-category/rings-category.webp'}
            alt={product.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. Product Information Strictly in Order: Name -> Price -> Stock */}
      <div className="pt-3 sm:pt-3.5 px-0.5 flex flex-col flex-grow justify-start">
        {/* 1. Product Name */}
        <h3 className="font-serif text-sm sm:text-base font-normal text-charcoal line-clamp-1 leading-snug">
          {product.name}
        </h3>

        {/* 2. Price and Original Price Strikethrough */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-serif text-sm sm:text-base font-normal text-charcoal tracking-tight">
            {sellingPrice}
          </span>

          {originalPrice && (
            <span className="font-serif text-xs sm:text-sm text-muted/70 line-through font-light">
              {originalPrice}
            </span>
          )}
        </div>

        {/* 3. Stock Availability */}
        <div className="mt-1">
          <span
            className={`text-[11px] sm:text-xs font-serif font-normal ${
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

