'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function BridalProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="group flex flex-col justify-between">
      {/* Product Image Tile */}
      <Link
        href={product.href || '#'}
        className="relative block w-full aspect-square rounded-2xl overflow-hidden bg-ivory shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Image
          src={product.image}
          alt={product.alt || product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Ambient Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-charcoal hover:text-burgundy hover:scale-110 shadow-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-burgundy text-burgundy' : 'text-charcoal/70'
            }`}
          />
        </button>
      </Link>

      {/* Product Details Below Image */}
      <div className="mt-3.5 space-y-1 px-1 text-left">
        {product.category && (
          <p className="text-[11px] font-sans uppercase tracking-widest text-charcoal/60">
            {product.category}
          </p>
        )}
        <h3 className="font-serif text-base sm:text-lg font-normal text-charcoal tracking-normal group-hover:text-burgundy transition-colors line-clamp-1">
          <Link href={product.href || '#'}>{product.name}</Link>
        </h3>
        {product.price && (
          <p className="text-sm font-sans font-semibold text-charcoal">
            {product.price}
          </p>
        )}
      </div>
    </div>
  );
}

