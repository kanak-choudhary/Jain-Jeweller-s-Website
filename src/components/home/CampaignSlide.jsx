'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CampaignSlide({ banner, isActive, priority = false }) {
  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      {/* Background Image Container with Ken Burns subtle scale */}
      <div className="relative w-full h-full overflow-hidden bg-charcoal">
        <Image
          src={banner.desktopImage || banner.image}
          alt={banner.title}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
            isActive ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Editorial Royal Luxury Overlays */}
        {/* Primary left gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-transparent sm:w-3/4 lg:w-3/5" />
        
        {/* Subtle royal burgundy tint overlay */}
        <div className="absolute inset-0 bg-burgundy/15 mix-blend-multiply" />
        
        {/* Top & bottom subtle vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-custom">
          <div className="max-w-xl lg:max-w-2xl py-12 sm:py-20 space-y-4 sm:space-y-6 text-left">
            {/* Eyebrow & Badge */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 delay-100 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-gold" />
                {banner.tag}
              </span>

              {banner.badge && (
                <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-champagne/80 font-medium border-l border-white/20 pl-3">
                  {banner.badge}
                </span>
              )}
            </div>

            {/* Campaign Headline */}
            <h2
              className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] transition-all duration-700 delay-200 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {banner.title}
            </h2>

            {/* Subtitle / Description */}
            <p
              className={`font-sans text-sm sm:text-base lg:text-lg text-champagne/90 leading-relaxed font-normal max-w-lg transition-all duration-700 delay-300 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {banner.subtitle}
            </p>

            {/* Call-to-Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3.5 pt-2 sm:pt-4 transition-all duration-700 delay-500 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Link
                href={banner.ctaLink}
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-burgundy hover:bg-burgundy-dark text-white rounded-full text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg shadow-burgundy/30 border border-gold/30 hover:border-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{banner.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              {banner.secondaryCta && (
                <Link
                  href={banner.secondaryLink}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white hover:text-gold-light rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium backdrop-blur-sm border border-white/25 hover:border-gold/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span>{banner.secondaryCta}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

