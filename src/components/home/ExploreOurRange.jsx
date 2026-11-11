'use client';

import ShopByMetal from './ShopByMetal';

export default function ExploreOurRange() {
  return (
    <section
      id="explore-our-range"
      aria-label="Explore Our Range"
      className="py-20 sm:py-28 bg-white border-b border-champagne relative overflow-hidden"
    >
      <div className="container-custom">
        <ShopByMetal />
      </div>
    </section>
  );
}

