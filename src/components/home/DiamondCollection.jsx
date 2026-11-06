'use client';

import Image from 'next/image';
import Link from 'next/link';
import diamondData from '@/data/diamondCollection.json';

export default function DiamondCollection() {
  const { title, subtitle, heroCard, bannerCard, collectionCards } = diamondData;

  const handleLinkClick = (e, href) => {
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="diamond-jewellery"
      aria-labelledby="diamond-jewellery-heading"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-champagne/60 relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header: Minimal & Centered */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2
            id="diamond-jewellery-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-[0.08em] uppercase"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-sm sm:text-base text-charcoal/75 mt-2 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* 5-Card Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* Card 1: Left Full-Height Hero Card */}
          {heroCard && (
            <Link
              href={heroCard.href || '#diamond'}
              onClick={(e) => handleLinkClick(e, heroCard.href)}
              className="group relative block w-full h-[480px] sm:h-[560px] lg:h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[580px] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Image
                src={heroCard.image}
                alt={heroCard.alt || heroCard.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <span className="sr-only">{heroCard.title}</span>
            </Link>
          )}

          {/* Right Column: 4 Cards (1 Wide Banner Top + 3 Cards Bottom) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 2: Top Wide Banner Card */}
            {bannerCard && (
              <Link
                href={bannerCard.href || '#diamond'}
                onClick={(e) => handleLinkClick(e, bannerCard.href)}
                className="group relative block w-full aspect-[2.1/1] min-h-[200px] sm:min-h-[240px] lg:min-h-[260px] rounded-2xl overflow-hidden bg-[#7A1E17] shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Image
                  src={bannerCard.image}
                  alt={bannerCard.alt || bannerCard.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <span className="sr-only">{bannerCard.title}</span>
              </Link>
            )}

            {/* Cards 3, 4, 5: Bottom 3-Card Row */}
            {collectionCards && collectionCards.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 flex-1">
                {collectionCards.map((card, idx) => (
                  <Link
                    key={card.id || idx}
                    href={card.href || '#diamond'}
                    onClick={(e) => handleLinkClick(e, card.href)}
                    className="group relative block w-full aspect-[1/1.15] sm:aspect-square lg:aspect-[1/1.12] rounded-xl sm:rounded-2xl overflow-hidden bg-[#7A1E17] shadow-xs hover:shadow-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Image
                      src={card.image}
                      alt={card.alt || card.title}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Subtle hover sheen */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    <span className="sr-only">{card.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
