'use client';

import {
  Award,
  Scale,
  RefreshCw,
  Truck,
  RotateCcw,
  Gem,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

const iconMap = {
  Award,
  Scale,
  RefreshCw,
  Truck,
  RotateCcw,
  Gem,
  Sparkles,
  ShieldCheck,
};

// Exact vertical offsets as specified in design requirements:
// Card 1 (Far left): +100px
// Card 2 (Left): +55px
// Card 3 (Inner left): +20px
// Card 4 (Center Apex): 0px
// Card 5 (Inner right): +20px
// Card 6 (Right): +55px
// Card 7 (Far right): +100px
const rainbowMarginClasses = [
  'mt-0 md:mt-[55px] lg:mt-[100px]', // Card 1
  'mt-0 md:mt-[30px] lg:mt-[55px]',  // Card 2
  'mt-0 md:mt-[12px] lg:mt-[20px]',  // Card 3
  'mt-0 md:mt-0 lg:mt-0',            // Card 4 (Apex)
  'mt-0 md:mt-[12px] lg:mt-[20px]',  // Card 5
  'mt-0 md:mt-[30px] lg:mt-[55px]',  // Card 6
  'mt-0 md:mt-[55px] lg:mt-[100px]', // Card 7
];

export default function PromiseCard({ promise, index }) {
  const IconComponent = iconMap[promise.icon] || Sparkles;
  const marginOffsetClass = rainbowMarginClasses[index % rainbowMarginClasses.length];
  // Center 7th card on mobile 2-col and 3-col grids while maintaining 1 column in 7-col layout
  const colSpanClass = index === 6 ? 'col-span-2 sm:col-span-3 md:col-span-1' : '';

  return (
    <div
      className={`jain-promises-card group flex flex-col items-center text-center transition-all duration-300 ease-out select-none ${marginOffsetClass} ${colSpanClass}`}
    >
      {/* Soft Pink / Warm Champagne Circular Illustration Disc */}
      <div className="relative mb-3 sm:mb-4 flex items-center justify-center">
        {/* Circular Outer Disc */}
        <div className="w-24 h-24 sm:w-26 sm:h-26 md:w-22 md:h-22 lg:w-26 lg:h-26 xl:w-28 xl:h-28 rounded-full bg-gradient-to-b from-[#FFF3F1] via-[#FDF0ED] to-[#FCE8E4] border border-[#F4DDD8]/90 group-hover:border-gold/60 shadow-xs group-hover:shadow-xl group-hover:shadow-burgundy/10 transition-all duration-500 flex items-center justify-center relative">
          {/* Inner Floating Badge with Icon */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-15 xl:h-15 rounded-full bg-white/95 shadow-xs flex items-center justify-center text-burgundy group-hover:text-burgundy-dark transition-all duration-300 group-hover:scale-110 transform">
            <IconComponent
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-burgundy stroke-[1.6]"
            />
          </div>

          {/* Decorative Corner Sparkle */}
          <Sparkles className="w-3.5 h-3.5 text-gold absolute top-1 right-2 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
        </div>
      </div>

      {/* Text Hierarchy */}
      <div className="space-y-1 max-w-[150px] sm:max-w-[160px] md:max-w-[125px] lg:max-w-[150px] xl:max-w-[165px] mx-auto">
        <h3 className="font-serif text-xs sm:text-sm lg:text-[14px] xl:text-[15px] font-bold text-charcoal group-hover:text-burgundy transition-colors tracking-tight leading-snug">
          {promise.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs text-muted leading-relaxed font-sans font-normal line-clamp-3">
          {promise.subtitle}
        </p>
      </div>
    </div>
  );
}
