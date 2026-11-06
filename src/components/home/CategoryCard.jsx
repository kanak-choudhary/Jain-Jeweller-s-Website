'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ category, priority = false }) {
  const { name, image, link, isViewAll } = category;

  if (isViewAll) {
    return (
      <Link
        href={link}
        className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
        aria-label="View more categories"
      >
        {/* Blank Luxury Card with Centered Typography */}
        <div className="relative w-full aspect-square rounded-2xl bg-[#FCFBF8] border border-champagne/60 hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            EXPLORE
          </span>
          <span className="font-playfair text-3xl sm:text-4xl lg:text-[42px] font-normal text-burgundy my-1 sm:my-1.5 transition-transform duration-300 group-hover:scale-105">
            More
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-charcoal/70 uppercase">
            CATEGORIES
          </span>
        </div>

        {/* Text Below Card */}
        <h3 className="mt-3 text-center text-sm sm:text-base font-medium text-charcoal group-hover:text-burgundy transition-colors duration-200">
          {name}
        </h3>
      </Link>
    );
  }

  return (
    <Link
      href={link}
      className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
      aria-label={`Shop ${name}`}
    >
      {/* Image Container with Consistent Aspect Ratio */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-champagne/20 border border-champagne/40 hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>

      {/* Text Below Card */}
      <h3 className="mt-3 text-center text-sm sm:text-base font-medium text-charcoal group-hover:text-burgundy transition-colors duration-200">
        {name}
      </h3>
    </Link>
  );
}
