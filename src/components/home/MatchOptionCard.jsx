'use client';

import {
  Crown,
  Sparkles,
  Sun,
  Gift,
  Gem,
  Disc,
  CircleDot,
  Circle,
  LifeBuoy,
  Shield,
  Layers,
  Flame,
  Compass,
  MinusCircle,
  Star,
  Check,
} from 'lucide-react';

const iconMap = {
  Crown,
  Sparkles,
  Sun,
  Gift,
  Gem,
  Disc,
  CircleDot,
  Circle,
  LifeBuoy,
  Shield,
  Layers,
  Flame,
  Compass,
  MinusCircle,
  Star,
};

export default function MatchOptionCard({ option, isSelected, onSelect }) {
  const IconComponent = iconMap[option.icon] || Sparkles;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      className={`group relative w-full h-full p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        isSelected
          ? 'bg-ivory border-burgundy shadow-lg shadow-burgundy/10 ring-1 ring-gold/40'
          : 'bg-white border-border-soft hover:border-gold/60 hover:bg-ivory/40 hover:shadow-md hover:shadow-charcoal/5'
      }`}
    >
      {/* Top Row: Icon & Selection Indicator */}
      <div className="flex items-center justify-between w-full mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
            isSelected
              ? 'bg-burgundy text-gold-light'
              : 'bg-ivory border border-border-soft/70 text-charcoal group-hover:text-burgundy group-hover:border-gold/40'
          }`}
        >
          <IconComponent className="w-5 h-5" strokeWidth={1.75} />
        </div>

        {/* Selected Checkmark Badge */}
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 ${
            isSelected
              ? 'bg-burgundy border-burgundy text-white scale-100'
              : 'border-border-soft bg-transparent text-transparent scale-90'
          }`}
        >
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h4
          className={`font-serif text-base sm:text-lg font-bold transition-colors ${
            isSelected
              ? 'text-burgundy'
              : 'text-charcoal group-hover:text-burgundy'
          }`}
        >
          {option.label}
        </h4>
        {option.description && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2">
            {option.description}
          </p>
        )}
      </div>
    </button>
  );
}

