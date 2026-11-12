'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ExperienceServiceCard({ service, priority = false }) {
  const { title, image, alt, href = '#experience' } = service;

  return (
    <Link
      href={href}
      className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl transition-all duration-300"
      aria-label={title}
    >
      {/* Landscape Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ivory border border-soft-border/70 shadow-xs group-hover:shadow-lg transition-all duration-500">
        <Image
          src={image}
          alt={alt || title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>

      {/* Service Title Directly Below Image */}
      <div className="pt-4 sm:pt-5 text-center">
        <h3 className="font-playfair text-base sm:text-lg lg:text-xl font-bold tracking-wider text-charcoal group-hover:text-burgundy transition-colors duration-300 uppercase">
          {title}
        </h3>
      </div>
    </Link>
  );
}

