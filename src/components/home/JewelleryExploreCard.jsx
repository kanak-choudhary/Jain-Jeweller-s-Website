'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function JewelleryExploreCard({ card, isFeatured = false, priority = false }) {
  const handleClick = (e) => {
    if (card.href && card.href.startsWith('#')) {
      const target = document.querySelector(card.href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isFeatured) {
    return (
      <Link
        href={card.href || '#'}
        onClick={handleClick}
        className="group relative flex flex-col justify-end w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {/* Background Image */}
        <Image
          src={card.image}
          alt={card.alt || card.title}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        {/* Minimal Bottom Content: Title + Sleek Link */}
        <div className="relative z-10 p-6 sm:p-8 flex items-end justify-between gap-4 text-left">
          <div className="space-y-1.5">
            {card.tag && (
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-light">
                {card.tag}
              </span>
            )}
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-normal group-hover:text-champagne transition-colors">
              {card.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/90 group-hover:text-white shrink-0 pb-1">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard Supporting Card (part of 2x2 grid)
  return (
    <Link
      href={card.href || '#'}
      onClick={handleClick}
      className="group relative flex flex-col justify-end w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Background Image */}
      <Image
        src={card.image}
        alt={card.alt || card.title}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Minimal Bottom Content: Title + Sleek Arrow */}
      <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between gap-3 text-left">
        <div>
          {card.tag && (
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gold-light block mb-1">
              {card.tag}
            </span>
          )}
          <h4 className="font-serif text-lg sm:text-xl font-normal text-white tracking-normal group-hover:text-champagne transition-colors">
            {card.title}
          </h4>
        </div>

        {/* Minimal Arrow Action Icon */}
        <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-burgundy text-white flex items-center justify-center shrink-0 border border-white/30 group-hover:border-gold transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4 text-white group-hover:text-gold-light" />
        </div>
      </div>
    </Link>
  );
}
