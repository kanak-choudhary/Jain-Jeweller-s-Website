'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BridalCategoryCard({ category }) {
  const handleClick = (e) => {
    if (category.href && category.href.startsWith('#')) {
      const target = document.querySelector(category.href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link
      href={category.href || '#'}
      onClick={handleClick}
      className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
    >
      {/* Editorial Image Container - 4:5 Portrait */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500">
        <Image
          src={category.image}
          alt={category.alt || category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Category Name & Minimal Arrow Link */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between px-1">
        <h3 className="font-serif text-sm sm:text-base lg:text-lg font-normal text-charcoal tracking-normal group-hover:text-burgundy transition-colors duration-300">
          {category.name}
        </h3>
        <div className="w-6 h-6 rounded-full bg-champagne/40 group-hover:bg-burgundy text-charcoal group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

