'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BudgetCard({
  tier,
  className = '',
  priority = false,
  sizeVariant = 'md',
}) {
  const { label = 'Under', amount, range, image, href = '#budget', alt } = tier;
  const displayAmount = amount || range;

  // Typography sizing per small / medium / large card variant to match attached reference exactly
  const fontSizes = {
    sm: {
      label: 'text-xs sm:text-sm font-medium',
      amount: 'text-xl sm:text-2xl lg:text-3xl font-bold mt-0.5',
    },
    md: {
      label: 'text-xs sm:text-sm lg:text-base font-medium',
      amount: 'text-2xl sm:text-3xl lg:text-4xl font-bold mt-0.5',
    },
    lg: {
      label: 'text-sm sm:text-base lg:text-lg font-medium',
      amount: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mt-1',
    },
  }[sizeVariant] || {
    label: 'text-xs sm:text-sm lg:text-base font-medium',
    amount: 'text-2xl sm:text-3xl lg:text-4xl font-bold mt-0.5',
  };

  return (
    <div
      className={`filter drop-shadow-[0_14px_32px_rgba(41,35,33,0.14)] hover:drop-shadow-[0_20px_42px_rgba(138,2,1,0.22)] transition-all duration-500 ${className}`}
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
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 35vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />

        {/* Subtle Ambient Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/30 transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" />

        {/* Centered Budget Typography matching attached reference */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center pointer-events-none select-none">
          <span
            className={`font-sans ${fontSizes.label} text-white tracking-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
          >
            {label}
          </span>
          <span
            className={`font-playfair ${fontSizes.amount} text-white tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]`}
          >
            {displayAmount}
          </span>
        </div>
      </Link>
    </div>
  );
}
