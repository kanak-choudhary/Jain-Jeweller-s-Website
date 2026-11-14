'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function BridalEdit() {
  return (
    <section
      id="bridal-edit"
      aria-labelledby="bridal-edit-heading"
      className="py-16 sm:py-24 lg:py-28 bg-white border-b border-champagne/60 relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left: Large Editorial Photography (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-charcoal/5 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop"
                alt="Indian bride in royal pastel attire adorned with heritage bridal jewellery"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Minimal Editorial Text & Subtle CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <p className="text-xs font-semibold tracking-[0.25em] text-burgundy uppercase">
              THE BRIDAL EDIT
            </p>

            <h2
              id="bridal-edit-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal tracking-tight leading-tight"
            >
              An Expression of Tradition
            </h2>

            <p className="font-sans text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
              Celebrate the beauty of bridal jewellery through timeless details and graceful designs.
            </p>

            <div className="pt-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-burgundy pointer-events-none cursor-default select-none"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

