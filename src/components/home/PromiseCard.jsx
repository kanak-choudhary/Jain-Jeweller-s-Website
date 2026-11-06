'use client';

import {
  Award,
  Scale,
  RefreshCw,
  Truck,
  RotateCcw,
  Gem,
  Sparkles,
} from 'lucide-react';

const iconMap = {
  Award,
  Scale,
  RefreshCw,
  Truck,
  RotateCcw,
  Gem,
};

// Upward arched curve offsets: center cards are elevated, edge cards slope down
const curveOffsets = [
  'lg:translate-y-14 md:translate-y-6',   // Index 0 (far left)
  'lg:translate-y-4 md:-translate-y-2',   // Index 1 (mid left)
  'lg:-translate-y-6 md:translate-y-2',   // Index 2 (center left, crest of curve)
  'lg:-translate-y-6 md:translate-y-2',   // Index 3 (center right, crest of curve)
  'lg:translate-y-4 md:-translate-y-2',   // Index 4 (mid right)
  'lg:translate-y-14 md:translate-y-6',   // Index 5 (far right)
];

export default function PromiseCard({ promise, index }) {
  const IconComponent = iconMap[promise.icon] || Sparkles;
  const curveClass = curveOffsets[index % curveOffsets.length];

  return (
    <div
      className={`group flex flex-col items-center text-center transition-all duration-500 ease-out select-none ${curveClass}`}
    >
      {/* Soft Blush / Warm Champagne Circular Illustration Disc */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Circular Outer Disc */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#FFF3F1] via-[#FDF0ED] to-[#FCE8E4] border border-[#F4DDD8]/90 group-hover:border-gold/60 shadow-xs group-hover:shadow-xl group-hover:shadow-burgundy/10 transition-all duration-500 flex items-center justify-center relative">
          {/* Inner Floating Badge with Icon */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/95 shadow-xs flex items-center justify-center text-burgundy group-hover:text-burgundy-dark transition-all duration-300 group-hover:scale-110 transform">
            <IconComponent
              className="w-8 h-8 sm:w-9 sm:h-9 text-burgundy stroke-[1.6]"
            />
          </div>

          {/* Decorative Corner Sparkle */}
          <Sparkles className="w-3.5 h-3.5 text-gold absolute top-1 right-2 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
        </div>
      </div>

      {/* Text Hierarchy (Content preserved exactly) */}
      <div className="space-y-1 max-w-[180px] sm:max-w-[190px]">
        <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal group-hover:text-burgundy transition-colors tracking-tight">
          {promise.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-muted leading-relaxed font-sans font-normal">
          {promise.subtitle}
        </p>
      </div>
    </div>
  );
}
