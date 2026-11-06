'use client';

import Image from 'next/image';
import Link from 'next/link';
import jainWorldData from '@/data/jainWorld.json';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function JainWorld() {
  const handleClick = (e, href) => {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pt-16 sm:pt-20 border-t border-champagne/80">
      {/* Jain World Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs uppercase tracking-[0.2em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          {jainWorldData.eyebrow}
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight">
          {jainWorldData.title}
        </h2>

        <div className="flex items-center justify-center gap-3 py-1">
          <span className="h-px w-10 bg-border-soft" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-10 bg-border-soft" />
        </div>

        <p className="font-sans text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
          {jainWorldData.description}
        </p>
      </div>

      {/* 3 Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {jainWorldData.stories.map((story) => (
          <Link
            key={story.id}
            href={story.href}
            onClick={(e) => handleClick(e, story.href)}
            className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-border-soft hover:border-gold/60 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-burgundy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {/* Editorial Image */}
            <div className="relative w-full aspect-[16/11] overflow-hidden bg-charcoal/5">
              <Image
                src={story.image}
                alt={story.alt || story.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-60" />

              {/* Floating Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/95 text-charcoal backdrop-blur-xs border border-white/60 shadow-xs">
                  {story.tag}
                </span>
              </div>
            </div>

            {/* Story Card Content */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-burgundy transition-colors">
                  {story.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed font-normal">
                  {story.description}
                </p>
              </div>

              {/* CTA Link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-burgundy group-hover:text-burgundy-dark transition-colors">
                  <span>{story.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

