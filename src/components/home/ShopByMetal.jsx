'use client';

import MetalCollectionCard from './MetalCollectionCard';
import metalData from '@/data/metalCollections.json';
import { Sparkles } from 'lucide-react';

export default function ShopByMetal() {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs uppercase tracking-[0.2em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          PRECIOUS METALS &amp; PURITY
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight">
          Shop by Metal
        </h2>

        <div className="flex items-center justify-center gap-3 py-1">
          <span className="h-px w-10 bg-border-soft" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-10 bg-border-soft" />
        </div>

        <p className="font-sans text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
          Explore jewellery collections crafted to complement every style and occasion.
        </p>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metalData.map((collection, index) => (
          <MetalCollectionCard
            key={collection.id}
            collection={collection}
            priority={index < 2}
          />
        ))}
      </div>
    </div>
  );
}

