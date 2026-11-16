'use client';

import { useState } from 'react';
import Image from 'next/image';

const FALLBACK_IMAGE = '/images/home/shop-by-category/earrings-category.webp';

export default function ProductImage({
  src,
  alt = 'Jain Jewellers Fine Piece',
  priority = false,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  className = '',
  objectFit = 'cover',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF8F4]">
      {/* 1. Subtle, lightweight luxury shimmer skeleton placeholder */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4] via-[#F3ECE1]/70 to-[#FAF8F4] animate-pulse z-0"
        />
      )}

      {/* 2. Optimized Image with smooth fade-in upon load and zero layout shift */}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imgSrc !== FALLBACK_IMAGE) {
            setImgSrc(FALLBACK_IMAGE);
          }
          setIsLoaded(true);
        }}
        className={`${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } object-center transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}

