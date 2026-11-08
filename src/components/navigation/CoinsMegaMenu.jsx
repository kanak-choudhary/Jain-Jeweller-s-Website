'use client';

import Link from 'next/link';
import { coinsMenuData } from '@/data/metalMegaMenuData';

export default function CoinsMegaMenu({ isOpen, onClose }) {
  return (
    <div
      role="region"
      aria-label="Coins Mega Menu"
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[520px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white border border-border-soft rounded-2xl shadow-2xl shadow-burgundy/10 p-6 grid grid-cols-2 gap-8 text-left">
        {coinsMenuData.columns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gold border-b border-champagne/60 pb-2">
              {col.title}
            </h3>

            <ul className="space-y-1 list-none m-0 p-0">
              {col.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    href={item.href}
                    onClick={() => onClose?.()}
                    className={`block text-xs py-1.5 px-2 rounded-md transition-colors ${
                      item.isHighlight
                        ? 'font-semibold text-burgundy hover:text-burgundy-dark hover:bg-champagne/30'
                        : 'text-charcoal hover:text-burgundy hover:bg-ivory'
                    }`}
                  >
                    <span className="font-serif tracking-wide">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

