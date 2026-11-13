'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CollectionProductCard from './CollectionProductCard';

export default function CollectionCampaignSection({ campaign, products }) {
  const { title, bannerImage, bannerAlt, ctaText, ctaHref, width = 1024, height = 320 } = campaign;

  return (
    <section
      aria-label={`${title} Campaign Section`}
      className="w-full mb-16 sm:mb-20 lg:mb-24 last:mb-12"
    >
      {/* 1. Full-Width Edge-to-Edge Campaign Banner (100vw, Zero side margins, Sharp rectangular edges) */}
      <div className="w-full overflow-hidden bg-charcoal">
        <Image
          src={bannerImage}
          alt={bannerAlt || title}
          width={width}
          height={height}
          priority
          unoptimized
          sizes="100vw"
          className="w-full h-auto block select-none pointer-events-none"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* 2. Four Product Cards Grid Directly Below Banner */}
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12">
          {products.map((product) => (
            <CollectionProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 3. Centered "SHOP THE COLLECTION" Button */}
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
          <Link
            href={ctaHref}
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-serif text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-102 border border-gold/30 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>{ctaText || 'SHOP THE COLLECTION'}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

