'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GiftingCard({ card, priority = false, className = '' }) {
  const { title, image, href = '#gifting', alt } = card;

  return (
    <Link
      href={href}
      className={`group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-champagne/20 shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
      aria-label={title}
    >
      <Image
        src={image}
        alt={alt || title}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </Link>
  );
}

