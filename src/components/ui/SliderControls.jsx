'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function SliderControls({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onDotClick,
  isPlaying,
  onTogglePlay,
}) {
  return (
    <div className="flex items-center justify-between gap-4 select-none">
      {/* Slide Index Counter (e.g. 01 / 03) */}
      <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-white/90">
        <span className="font-bold text-gold text-sm sm:text-base">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-white/40">/</span>
        <span className="text-white/70">
          {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Pagination Bar / Indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                isActive
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>

      {/* Navigation Arrows & Play/Pause */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous campaign slide"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal/40 hover:bg-burgundy text-white border border-white/20 hover:border-gold transition-all duration-200 flex items-center justify-center backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          className="w-8 h-8 rounded-full bg-charcoal/30 hover:bg-charcoal/60 text-white/80 hover:text-white transition-colors flex items-center justify-center backdrop-blur-xs hidden sm:flex"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next campaign slide"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal/40 hover:bg-burgundy text-white border border-white/20 hover:border-gold transition-all duration-200 flex items-center justify-center backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

