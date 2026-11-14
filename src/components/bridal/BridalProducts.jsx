import BridalProductCard from './BridalProductCard';
import bridalProducts from '@/data/bridalProducts.json';

const categoryAnchorMap = {
  101: 'bridal-necklaces',
  102: 'bridal-earrings',
  103: 'bridal-maang-tikka',
  104: 'bridal-bangles',
  105: 'bridal-nath',
};

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

        {/* Product Grid with category anchors */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {bridalProducts.map((product) => (
            <div
              key={product.id}
              id={categoryAnchorMap[product.id]}
              className="scroll-mt-28"
            >
              <BridalProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

