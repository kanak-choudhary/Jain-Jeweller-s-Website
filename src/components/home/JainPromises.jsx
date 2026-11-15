'use client';

import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/animations';
import PromiseCard from './PromiseCard';
import promisesData from '@/data/promises.json';
import { FadeUp } from '@/components/ui/Motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function JainPromises() {
  const gridRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const cards = grid.querySelectorAll('.jain-promises-card');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
          clearProps: 'transform', // Ensures transforms are cleanly released after animation
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="jain-promises"
      aria-labelledby="promises-heading"
      className="pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-28 lg:pb-36 bg-white border-b border-champagne relative"
    >
      {/* Decorative Star Sparkles on Top-Left */}
      <div className="absolute top-10 left-8 sm:left-16 lg:left-24 pointer-events-none select-none">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy/30 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy/25 ml-6 -mt-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: "Jain" Eyebrow + "Promises" Major Heading */}
        <FadeUp className="text-center max-w-xl mx-auto space-y-2 mb-10 sm:mb-14 lg:mb-16">
          <p className="font-serif text-sm sm:text-base font-bold text-burgundy/80 tracking-[0.25em] uppercase">
            Jain
          </p>

          <h2
            id="promises-heading"
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-burgundy tracking-tight"
          >
            Promises
          </h2>

          <p className="font-sans text-xs sm:text-sm text-muted max-w-md mx-auto pt-1 leading-relaxed">
            Our timeless commitment to certified purity, authentic Indian craftsmanship, and an effortless luxury jewellery experience.
          </p>
        </FadeUp>

        {/* Inverted U / Rainbow Arc Layout Container */}
        <div
          ref={gridRef}
          className="jain-promises-grid max-w-7xl mx-auto items-start pt-2 sm:pt-4"
        >
          {promisesData.map((promise, index) => (
            <PromiseCard
              key={promise.id}
              promise={promise}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
