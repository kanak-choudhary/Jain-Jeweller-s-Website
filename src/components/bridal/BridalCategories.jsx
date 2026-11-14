import BridalCategoryCard from './BridalCategoryCard';
import bridalCategories from '@/data/bridalCategories.json';

export default function BridalCategories() {
  return (
    <section
      id="bridal-categories"
      aria-labelledby="bridal-categories-heading"
      className="py-16 sm:py-24 bg-white border-b border-champagne/60"
    >
      <div className="container-custom">
        {/* Section Header: Minimal & Centered */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2
            id="bridal-categories-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-normal"
          >
            Explore Bridal Jewellery
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 mt-2 font-normal">
            Find the pieces that complete your bridal look.
          </p>
        </div>

        {/* 5-Category Grid: 5 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {bridalCategories.map((category) => (
            <BridalCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

