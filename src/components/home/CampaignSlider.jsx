'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import bannersData from '@/data/banners.json';

export default function CampaignSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = bannersData.length;

  // Touch swipe coordinates
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Dynamic auto-swap every 2 seconds with hover pause
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 2000); // 2-second swap interval

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      aria-label="Hero Jewellery Campaigns"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-champagne/20 via-ivory/40 to-white overflow-hidden focus:outline-none"
    >
      {/* 3D Coverflow Cards Stage */}
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center">
        {bannersData.map((banner, index) => {
          // Calculate cyclic offset relative to currentSlide
          let diff = (index - currentSlide) % totalSlides;
          if (diff < -Math.floor(totalSlides / 2)) diff += totalSlides;
          if (diff > Math.floor(totalSlides / 2)) diff -= totalSlides;

          const isActive = diff === 0;
          const isPrev = diff === -1;
          const isNext = diff === 1;

          // Compute 3D translation & scale
          let transformStyle = '';
          let zIndex = 10;
          let opacity = 0;
          let pointerEvents = 'none';

          if (isActive) {
            transformStyle = 'translate3d(0%, 0, 0) scale(1)';
            zIndex = 30;
            opacity = 1;
            pointerEvents = 'auto';
          } else if (isPrev) {
            transformStyle = 'translate3d(-72%, 0, -60px) scale(0.88)';
            zIndex = 20;
            opacity = 0.6;
            pointerEvents = 'auto';
          } else if (isNext) {
            transformStyle = 'translate3d(72%, 0, -60px) scale(0.88)';
            zIndex = 20;
            opacity = 0.6;
            pointerEvents = 'auto';
          } else {
            transformStyle = `translate3d(${diff > 0 ? 120 : -120}%, 0, -100px) scale(0.75)`;
            zIndex = 10;
            opacity = 0;
            pointerEvents = 'none';
          }

          return (
            <div
              key={banner.id}
              onClick={() => {
                if (isPrev) prevSlide();
                if (isNext) nextSlide();
              }}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                pointerEvents,
              }}
              className={`absolute top-0 bottom-0 w-[88vw] sm:w-[80vw] lg:w-[74vw] max-w-[1080px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl transition-all duration-700 ease-out select-none ${
                !isActive ? 'cursor-pointer hover:opacity-80' : ''
              } motion-reduce:transition-none`}
            >
              {banner.isGraphicArtwork && banner.images ? (
                /* Complete Graphic Artwork Banner (Responsive <picture> with no overlaid HTML text/buttons) */
                <Link
                  href={banner.ctaLink}
                  onClick={(e) => {
                    if (!isActive) e.preventDefault();
                  }}
                  className="block relative w-full h-full focus:outline-none"
                  style={{ backgroundColor: banner.bgColor || '#FAF4EC' }}
                  aria-label={`${banner.title} - ${banner.subtitle}`}
                >
                  <picture className="w-full h-full block">
                    {/* Desktop: 1024px+ */}
                    <source
                      media="(min-width: 1024px)"
                      srcSet={banner.images.desktop}
                    />
                    {/* Tablet: 640px to 1023px */}
                    <source
                      media="(min-width: 640px)"
                      srcSet={banner.images.tablet}
                    />
                    {/* Mobile: default fallback */}
                    <img
                      src={banner.images.mobile}
                      alt={banner.title || 'Jain Jewellers'}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className="w-full h-full object-contain sm:object-cover object-center select-none"
                    />
                  </picture>
                </Link>
              ) : (
                /* Standard Editorial Campaign Slide with Text Overlay */
                <div className="relative w-full h-full bg-charcoal">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 90vw, 75vw"
                    className={`object-cover ${banner.objectPosition || 'object-right sm:object-center'} transition-transform duration-1000 ease-out`}
                  />

                  {/* Subtle Editorial Gradient on Left for Lean Minimal Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark/95 via-burgundy/80 sm:via-burgundy/75 to-transparent w-full sm:w-3/5 lg:w-1/2 pointer-events-none" />

                  {/* Card Content (Lean & Minimal) */}
                  <div className="absolute inset-0 z-10 flex items-center p-6 sm:p-10 lg:p-14">
                    <div className="max-w-xs sm:max-w-sm lg:max-w-md text-left">
                      {/* Brand Tag */}
                      <div className="mb-2 sm:mb-3">
                        <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                          {banner.brandTag}
                        </span>
                      </div>

                      {/* Headline */}
                      <h2 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2 sm:mb-3">
                        {banner.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm lg:text-base text-ivory/90 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                        {banner.subtitle}
                      </p>

                      {/* Minimal Clean Pill Button */}
                      <div>
                        <Link
                          href={banner.ctaLink}
                          className="group inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white hover:bg-gold-light text-burgundy hover:text-charcoal font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
                          onClick={(e) => {
                            if (!isActive) e.preventDefault();
                          }}
                        >
                          <span>{banner.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-burgundy group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Circular Prev & Next Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Campaign"
          className="absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-charcoal hover:text-burgundy shadow-xl flex items-center justify-center border border-champagne transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Campaign"
          className="absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-charcoal hover:text-burgundy shadow-xl flex items-center justify-center border border-champagne transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Elegant Diamond / Dot Indicators */}
      <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
        {bannersData.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to campaign ${idx + 1}`}
            className="p-1 focus:outline-none focus:ring-2 focus:ring-gold rounded"
          >
            <span
              className={`inline-block transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-3 h-3 bg-burgundy rotate-45 scale-110 shadow-xs'
                  : 'w-2 h-2 bg-champagne hover:bg-gold rotate-45'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
