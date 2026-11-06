'use client';

import GenderCollectionCard from './GenderCollectionCard';
import genderData from '@/data/genderCollections.json';

export default function ShopByGender() {
  const title = genderData.title || 'Curated For You';
  const subtitle = genderData.subtitle || 'Shop By Gender';
  const collections = genderData.collections || genderData;

  return (
    <section
      id="shop-by-gender"
      aria-labelledby="gender-heading"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-champagne/60 relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header: Minimal, Centered, No Sentences */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2
            id="gender-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-normal"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-sm sm:text-base text-charcoal/70 mt-1 sm:mt-2 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3-Column Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {collections.map((collection, index) => (
            <GenderCollectionCard
              key={collection.id || index}
              collection={collection}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
