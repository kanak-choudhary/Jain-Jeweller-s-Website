'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function DiamondFeatureCard({ card }) {
  if (!card) return null;

  return (
    <Link
      href={card.href || '#diamond'}
      className="group relative block w-full rounded-2xl overflow-hidden bg-ivory border border-border-soft hover:border-gold/60 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-burgundy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-charcoal/5">
        <Image
          src={card.image}
          alt={card.alt || card.title}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Dark/Warm Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top Tag */}
        {card.tag && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-white/90 text-charcoal backdrop-blur-xs border border-white/40 shadow-xs">
              {card.tag}
            </span>
          </div>
        )}

        {/* Bottom Editorial Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex items-end justify-between gap-3">
          <div className="space-y-1 text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-champagne transition-colors">
              {card.title}
            </h4>
            {card.description && (
              <p className="text-xs text-white/80 font-sans font-normal line-clamp-2 max-w-sm">
                {card.description}
              </p>
            )}
          </div>

          <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-burgundy text-white flex items-center justify-center shrink-0 border border-white/30 group-hover:border-gold transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-gold-light" />
          </div>
        </div>
      </div>
    </Link>
  );
}

