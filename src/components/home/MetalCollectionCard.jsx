'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MetalCollectionCard({ collection, priority = false }) {
  const handleClick = (e) => {
    const target = document.querySelector(collection.href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link
      href={collection.href}
      onClick={handleClick}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-ivory border border-border-soft hover:border-gold/60 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-burgundy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Consistent 4:5 Aspect Ratio */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-charcoal/5">
        <Image
          src={collection.image}
          alt={collection.alt || collection.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Ambient Luxury Dark/Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top Tag */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/90 text-charcoal backdrop-blur-xs border border-white/50 shadow-xs">
            {collection.tag}
          </span>
        </div>

        {/* Bottom Editorial Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 space-y-2 text-left">
          <h3 className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-champagne transition-colors">
            {collection.name}
          </h3>
          <p className="font-sans text-xs text-white/80 leading-relaxed font-normal line-clamp-2">
            {collection.description}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold-light group-hover:text-white transition-colors">
              <span>{collection.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

