'use client';

import ShopByMetal from './ShopByMetal';
import JainWorld from './JainWorld';

export default function ExploreOurRange() {
  return (
    <section
      id="explore-our-range"
      aria-label="Explore Our Range"
      className="py-20 sm:py-28 bg-white border-b border-champagne relative overflow-hidden"
    >
      <div className="container-custom space-y-16 sm:space-y-20">
        {/* Part A: Shop by Metal */}
        <ShopByMetal />

        {/* Part B: Jain World */}
        <JainWorld />
      </div>
    </section>
  );
}

