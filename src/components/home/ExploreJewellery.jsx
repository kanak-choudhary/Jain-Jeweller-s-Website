'use client';

import JewelleryExploreCard from './JewelleryExploreCard';
import exploreData from '@/data/exploreJewellery.json';

export default function ExploreJewellery() {
  const featuredCard = exploreData.find((item) => item.featured) || exploreData[0];
  const supportingCards = exploreData.filter((item) => !item.featured);

  return (
    <section
      id="explore-jewellery"
      aria-labelledby="explore-heading"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-champagne/60 relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header: Minimal & Centered */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2
            id="explore-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-normal"
          >
            Explore Jewellery
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 mt-1 sm:mt-2 font-normal">
            Discover Your Style
          </p>
        </div>

        {/* Editorial Asymmetric Magazine Grid (1 Featured Tall + 4 Supporting 2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* LEFT: Featured Tall Flagship Card (5 cols) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <JewelleryExploreCard
              card={featuredCard}
              isFeatured={true}
              priority={true}
            />
          </div>

          {/* RIGHT: Supporting 4 Cards in 2x2 Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {supportingCards.map((card, index) => (
              <JewelleryExploreCard
                key={card.id}
                card={card}
                isFeatured={false}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
