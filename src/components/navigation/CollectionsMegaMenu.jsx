'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Link2, Flower2, Heart, ChevronDown, Sparkles } from 'lucide-react';

export default function CollectionsMegaMenu({ isOpen, onClose }) {
  const [isBridalOpen, setIsBridalOpen] = useState(false);

  const brideSubItems = [
    'Marathi Bride',
    'Kerala Bride',
    'Tamil Bride',
    'Rajisthani Bride',
  ];

  return (
    <div
      role="region"
      aria-label="Collections Mega Menu"
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[330px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white border border-border-soft rounded-2xl shadow-xl shadow-burgundy/10 p-3.5 sm:p-4 text-left">
        <ul className="space-y-1 list-none m-0 p-0">
          {/* 1. Bridal Collection with Sub-Dropdown (Click-to-Open) */}
          <li className="rounded-xl transition-colors">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-ivory transition-colors group">
              <Link
                href="/bridal-collection"
                onClick={() => onClose?.()}
                className="flex items-center gap-3 flex-1 font-serif text-sm font-semibold text-charcoal group-hover:text-burgundy transition-colors tracking-wide"
              >
                <span className="w-7 h-7 rounded-lg bg-champagne/40 text-gold flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-white transition-all duration-200">
                  <Crown className="w-4 h-4" strokeWidth={1.7} />
                </span>
                <span>Bridal Collection</span>
              </Link>

              {/* Sub-Dropdown Toggle Chevron Button (Click only) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsBridalOpen((prev) => !prev);
                }}
                aria-expanded={isBridalOpen}
                aria-label="Toggle Bridal categories dropdown"
                title={isBridalOpen ? "Collapse bridal categories" : "Expand bridal categories"}
                className="p-1.5 rounded-lg text-muted hover:text-burgundy hover:bg-champagne/40 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isBridalOpen ? 'rotate-180 text-burgundy' : 'text-charcoal/70'
                  }`}
                />
              </button>
            </div>

            {/* Sub-Dropdown Categories (Revealed strictly on click, Link: None) */}
            {isBridalOpen && (
              <div className="mt-1 mb-2 ml-6 pl-4 border-l-2 border-champagne/70 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {brideSubItems.map((bride, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-1 px-2 rounded-md font-serif text-xs text-muted/90 select-none hover:text-charcoal transition-colors tracking-wide"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-gold/80 shrink-0" strokeWidth={1.5} />
                    <span>{bride}</span>
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* 2. Station Mangalsutra */}
          <li>
            <Link
              href="/collections"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-charcoal hover:text-burgundy hover:bg-ivory transition-all duration-200 group font-serif text-sm font-semibold tracking-wide"
            >
              <span className="w-7 h-7 rounded-lg bg-champagne/40 text-gold flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-white transition-all duration-200">
                <Link2 className="w-4 h-4" strokeWidth={1.7} />
              </span>
              <span>Station Mangalsutra</span>
            </Link>
          </li>

          {/* 3. Floral Bloom */}
          <li>
            <Link
              href="/collections"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-charcoal hover:text-burgundy hover:bg-ivory transition-all duration-200 group font-serif text-sm font-semibold tracking-wide"
            >
              <span className="w-7 h-7 rounded-lg bg-champagne/40 text-gold flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-white transition-all duration-200">
                <Flower2 className="w-4 h-4" strokeWidth={1.7} />
              </span>
              <span>Floral Bloom</span>
            </Link>
          </li>

          {/* 4. Valentine Special */}
          <li>
            <Link
              href="/collections"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-charcoal hover:text-burgundy hover:bg-ivory transition-all duration-200 group font-serif text-sm font-semibold tracking-wide"
            >
              <span className="w-7 h-7 rounded-lg bg-champagne/40 text-gold flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-white transition-all duration-200">
                <Heart className="w-4 h-4" strokeWidth={1.7} />
              </span>
              <span>Valentine Special</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
