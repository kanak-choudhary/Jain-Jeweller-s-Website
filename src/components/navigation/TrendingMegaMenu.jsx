'use client';

import Link from 'next/link';
import { trendingMenuData } from '@/data/trendingMenuData';

export default function TrendingMegaMenu({ isOpen, onClose }) {
  return (
    <div
      role="region"
      aria-label="What's Trending Mega Menu"
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white border border-border-soft rounded-2xl shadow-xl shadow-burgundy/5 p-6 text-left">
        {/* Heading */}
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal/80 pb-2.5 border-b border-champagne/70">
          {trendingMenuData.title}
        </h3>

        {/* 2-Column Minimal Collection Links */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-3.5">
          {trendingMenuData.columns.map((col, colIdx) => (
            <ul key={colIdx} className="space-y-2.5 list-none m-0 p-0">
              {col.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    href={item.href}
                    onClick={() => onClose?.()}
                    className="block font-serif text-[13px] tracking-wide text-charcoal/90 hover:text-burgundy transition-colors duration-200 py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

