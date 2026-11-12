'use client';

import { X, RotateCcw } from 'lucide-react';

export default function ActiveFilterChips({ activeFilters, onRemoveFilter, onClearAll }) {
  // activeFilters is an array of { type: 'category'|'metal'|'price'|'purity'|'gender'|'occasion'|'collection', label: string, value: string }
  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center flex-wrap gap-2 py-3">
      <span className="text-xs text-muted font-medium mr-1">Active Filters ({activeFilters.length}):</span>

      {activeFilters.map((filter) => (
        <span
          key={`${filter.type}-${filter.value}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif bg-ivory border border-border-soft text-charcoal hover:border-burgundy/40 transition-colors shadow-2xs"
        >
          <span className="text-muted text-[10px] uppercase tracking-wider">{filter.type}:</span>
          <span className="font-medium text-burgundy">{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            aria-label={`Remove filter ${filter.label}`}
            className="p-0.5 -mr-1 rounded-full hover:bg-burgundy/10 hover:text-burgundy text-muted transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 ml-2 text-xs font-semibold text-burgundy hover:text-burgundy-dark underline underline-offset-4 transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
}

