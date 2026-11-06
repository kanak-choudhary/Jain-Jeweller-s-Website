'use client';

import PromiseCard from './PromiseCard';
import promisesData from '@/data/promises.json';

export default function JainPromises() {
  return (
    <section
      id="jain-promises"
      aria-labelledby="promises-heading"
      className="pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-32 lg:pb-40 bg-white border-b border-champagne relative overflow-hidden"
    >
      {/* Decorative Star Sparkles on Top-Left (Matching Reference) */}
      <div className="absolute top-10 left-8 sm:left-16 lg:left-24 pointer-events-none select-none">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy/30 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy/25 ml-6 -mt-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: "Jain" Eyebrow + "Promises" Major Heading */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12 sm:mb-16 lg:mb-20">
          <p className="font-serif text-sm sm:text-base font-bold text-burgundy/80 tracking-[0.25em] uppercase">
            Jain
          </p>

          <h2
            id="promises-heading"
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-burgundy tracking-tight"
          >
            Promises
          </h2>

          <p className="font-sans text-xs sm:text-sm text-muted max-w-md mx-auto pt-1 leading-relaxed">
            Our timeless commitment to certified purity, authentic Indian craftsmanship, and an effortless luxury jewellery experience.
          </p>
        </div>

        {/* Upward Curved Arch of 6 Promise Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-3 items-start pt-4 sm:pt-6">
          {promisesData.map((promise, index) => (
            <PromiseCard
              key={promise.id}
              promise={promise}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
