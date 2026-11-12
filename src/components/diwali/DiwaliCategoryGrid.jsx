'use client';

import Link from 'next/link';
import Image from 'next/image';
import { diwaliCategories } from '@/data/diwaliCategories';

export default function DiwaliCategoryGrid({ categories = diwaliCategories }) {
  return (
    <section
      aria-label="Discover the New Diwali Collection"
      className="w-full bg-[#FAF8F4] overflow-hidden"
    >
      {/* 1. Section Heading */}
      <div className="container-custom pt-14 sm:pt-20 pb-10 sm:pb-14 text-center">
        <h2 className="font-serif text-[#650100] text-xl sm:text-2xl lg:text-[28px] font-normal tracking-[0.16em] uppercase leading-tight">
          DISCOVER THE NEW DIWALI COLLECTION
        </h2>
        {/* Subtle, thin burgundy underline */}
        <div
          className="w-14 sm:w-16 h-[1.5px] bg-[#650100]/40 mx-auto mt-3.5"
          aria-hidden="true"
        />
      </div>

      {/* 2. Seamless 4-Category Image Grid */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-0 p-0 m-0">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id || idx}
            href={cat.href}
            className="group relative block w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden focus:outline-none select-none"
            aria-label={`Explore Diwali ${cat.name} Collection`}
          >
            {/* Background Category Image */}
            <Image
              src={cat.image}
              alt={cat.alt || cat.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle dark gradient overlay at bottom for readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/70"
              aria-hidden="true"
            />

            {/* Category Name & Short White Underline at Bottom-Left */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10">
              <span className="block font-serif text-white tracking-[0.18em] text-xs sm:text-sm lg:text-[15px] font-medium uppercase drop-shadow-xs">
                {cat.name}
              </span>
              <div
                className="w-7 h-[1px] bg-white/80 mt-1.5 transition-all duration-300 ease-out group-hover:w-12 group-hover:bg-white"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

