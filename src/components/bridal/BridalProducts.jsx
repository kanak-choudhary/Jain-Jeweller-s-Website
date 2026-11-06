import BridalProductCard from './BridalProductCard';
import bridalProducts from '@/data/bridalProducts.json';

export default function BridalProducts() {
  return (
    <section
      id="bridal-products"
      aria-labelledby="bridal-products-heading"
      className="py-16 sm:py-24 bg-[#FAF8F4] border-b border-champagne/60"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2
            id="bridal-products-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-normal"
          >
            The Bridal Selection
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 mt-2 font-normal">
            A curated selection for your most special moments.
          </p>
        </div>

        {/* 6-Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {bridalProducts.map((product) => (
            <BridalProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

