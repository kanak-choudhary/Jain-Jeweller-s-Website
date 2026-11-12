'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BudgetCard({ tier, className = '', priority = false }) {
  const { label = 'Under', amount, range, image, href = '#budget', alt } = tier;
  const displayAmount = amount || range;

  return (
    <div
      className={`filter drop-shadow-[0_12px_28px_rgba(41,35,33,0.12)] hover:drop-shadow-[0_18px_36px_rgba(138,2,1,0.18)] transition-all duration-500 ${className}`}
    >
      <Link
        href={href}
        className="group relative block w-full h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        style={{
          clipPath: 'url(#budget-card-clip)',
          WebkitClipPath: 'url(#budget-card-clip)',
        }}
        aria-label={`${label} ${displayAmount}`}
      >
        {/* Jewellery Image */}
        <Image
          src={image}
          alt={alt || `${label} ${displayAmount}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 35vw, 30vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 motion-reduce:transform-none"
        />

        {/* Ambient Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-charcoal/35 transition-opacity duration-500 group-hover:opacity-85 pointer-events-none" />

        {/* Centered Budget Typography */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center pointer-events-none select-none">
          <span className="font-sans text-xs sm:text-sm lg:text-base font-medium tracking-wider text-white/95 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {label}
          </span>
          <span className="font-playfair text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] mt-0.5">
            {displayAmount}
          </span>
        </div>
      </Link>
    </div>
  );
}
