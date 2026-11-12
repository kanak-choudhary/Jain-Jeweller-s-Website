'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { diwaliBanners } from '@/data/diwaliBanners';

export default function DiwaliBannerCarousel({ banners = diwaliBanners }) {
  const realCount = banners.length;

  // Extended slides array for true seamless infinite looping:
  // [lastBanner, ...banners, firstBanner]
  const extendedSlides = useMemo(() => {
    if (!banners || banners.length === 0) return [];
    return [banners[banners.length - 1], ...banners, banners[0]];
  }, [banners]);

  // Virtual index: starts at 1 (first real slide)
  const [virtualIndex, setVirtualIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportMode, setViewportMode] = useState('desktop');

  // Touch gesture coordinates
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  // Compute active real slide index (0 to realCount - 1) for indicators
  const activeRealIndex = (virtualIndex - 1 + realCount) % realCount;

  // Responsive breakpoint listener for center and peek calculations
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewportMode('mobile');
      } else if (width < 1024) {
        setViewportMode('tablet');
      } else {
        setViewportMode('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive slide layout metrics
  // Desktop: central active banner takes 80%, 10% side peeks
  // Tablet: central active banner takes 88%, 6% side peeks
  // Mobile: central active banner takes 100%, side previews hidden for maximum clarity
  const { slideWidth, sideOffset, gapPx } = {
    mobile: { slideWidth: 100, sideOffset: 0, gapPx: 16 },
    tablet: { slideWidth: 88, sideOffset: 6, gapPx: 20 },
    desktop: { slideWidth: 80, sideOffset: 10, gapPx: 24 },
  }[viewportMode];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setVirtualIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setWithTransition(true);
    setVirtualIndex((prev) => prev - 1);
  }, []);

  const goToSlide = (realIndex) => {
    setWithTransition(true);
    setVirtualIndex(realIndex + 1);
  };

  // Seamless boundary wrap when transition finishes
  const handleTransitionEnd = () => {
    if (virtualIndex >= realCount + 1) {
      // Reached the trailing clone -> snap seamlessly to first real slide
      setWithTransition(false);
      setVirtualIndex(1);
    } else if (virtualIndex <= 0) {
      // Reached the leading clone -> snap seamlessly to last real slide
      setWithTransition(false);
      setVirtualIndex(realCount);
    }
  };

  // Autoplay timer (4.5s interval, pauses on hover, respects prefers-reduced-motion)
  useEffect(() => {
    if (isPaused || realCount <= 1) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, realCount, nextSlide]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 45) {
      // Swiped Left -> advance
      nextSlide();
    } else if (diff < -45) {
      // Swiped Right -> retreat
      prevSlide();
    }
  };

  return (
    <section
      aria-label="Diwali Campaign Banner Carousel"
      className="w-full py-6 sm:py-10 lg:py-12 bg-gradient-to-b from-[#FAF8F4] via-[#FCFBF8] to-white overflow-hidden"
    >
      {/* Outer Viewport Container */}
      <div
        className="relative w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${
            withTransition
              ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'
              : 'transition-none'
          }`}
          style={{
            transform: `translateX(calc(${sideOffset}% - ${virtualIndex} * (${slideWidth}% + ${gapPx}px)))`,
          }}
        >
          {extendedSlides.map((banner, index) => {
            const isActive = index === virtualIndex;

            return (
              <div
                key={`${banner.id}-clone-${index}`}
                className="shrink-0 transition-all duration-700 ease-out"
                style={{
                  width: `${slideWidth}%`,
                  marginRight: `${gapPx}px`,
                }}
              >
                {/* Banner Card Container - Exact 2.5:1 (5:2) aspect ratio, softly rounded 18-22px corners */}
                <div
                  className={`relative w-full aspect-[2.5/1] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-ivory transition-all duration-700 ${
                    isActive
                      ? 'opacity-100 scale-100 shadow-xl shadow-charcoal/5 ring-1 ring-champagne/40'
                      : 'opacity-55 sm:opacity-65 scale-[0.98]'
                  }`}
                >
                  <Image
                    src={banner.image}
                    alt={banner.alt || banner.title}
                    fill
                    priority={index === 1}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 88vw, 80vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Carousel Indicators */}
      {realCount > 1 && (
        <div
          className="flex items-center justify-center gap-2.5 mt-5 sm:mt-7"
          role="tablist"
          aria-label="Diwali campaign slides"
        >
          {banners.map((banner, index) => {
            const isActive = index === activeRealIndex;
            return (
              <button
                key={banner.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}: ${banner.title}`}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? 'w-7 sm:w-8 h-2 bg-burgundy shadow-xs'
                    : 'w-2 h-2 bg-border-soft hover:bg-gold/60 hover:scale-125'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
