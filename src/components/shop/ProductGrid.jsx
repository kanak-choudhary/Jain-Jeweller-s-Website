'use client';

import ProductCard from './ProductCard';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function ProductGrid({ products, onClearAll }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white border border-border-soft rounded-2xl p-10 sm:p-16 text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-champagne/40 border border-gold/30 flex items-center justify-center text-burgundy mb-4 shadow-xs">
          <Sparkles className="w-8 h-8 text-gold" strokeWidth={1.5} />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-2">
          No Jewellery Found
        </h3>
        <p className="text-sm text-muted max-w-md mx-auto mb-6 leading-relaxed font-serif">
          We couldn&apos;t find any pieces matching your specific filter combination. Try adjusting or clearing your filters to discover our royal handcrafted collections.
        </p>

        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-burgundy/20 hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

