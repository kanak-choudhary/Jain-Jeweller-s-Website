'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GenderCollectionCard({ collection, priority = false }) {
  const handleClick = (e) => {
    if (collection.href && collection.href.startsWith('#')) {
      const target = document.querySelector(collection.href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link
      href={collection.href || '#'}
      onClick={handleClick}
      className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
    >
      {/* Clean Minimal Rounded Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500">
        <Image
          src={collection.image}
          alt={collection.alt || collection.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Luxury Sheen on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Minimal Label Below Image (Exact Reference Match) */}
      <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal text-center mt-3.5 sm:mt-4 tracking-normal group-hover:text-burgundy transition-colors duration-300">
        {collection.name}
      </h3>
    </Link>
  );
}
