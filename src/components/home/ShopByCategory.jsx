'use client';

import CategoryCard from './CategoryCard';
import categoriesData from '@/data/categories.json';

export default function ShopByCategory() {
  return (
    <section
      id="shop-by-category"
      aria-labelledby="category-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-champagne"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Attached Reference */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-2">
            BRILLIANT DESIGNS AND UNPARALLELED CRAFTSMANSHIP.
          </p>

          <h2
            id="category-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            Shop by Category
          </h2>

          {/* Elegant Gold Accent Line */}
          <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
        </div>

        {/* Categories Grid: 4 Cards per Row (2 Rows = 8 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categoriesData.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
