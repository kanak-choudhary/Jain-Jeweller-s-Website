'use client';

import { ArrowUpDown, ChevronDown } from 'lucide-react';

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Featured & Relevance' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'best-selling', label: 'Best Selling' },
];

export default function ProductSortDropdown({ currentSort, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="shop-sort" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted font-medium uppercase tracking-wider">
        <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
        <span>Sort By:</span>
      </label>

      <div className="relative inline-block">
        <select
          id="shop-sort"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-border-soft hover:border-gold rounded-lg py-2 pl-3.5 pr-8 text-xs font-serif font-medium text-charcoal focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy cursor-pointer transition-colors shadow-2xs"
          aria-label="Sort jewellery pieces"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-muted pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

