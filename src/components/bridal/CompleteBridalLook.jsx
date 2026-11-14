'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const BRIDAL_LOOK_CATEGORIES = [
  {
    id: 'earrings',
    name: 'Earrings',
    image: '/images/collections/bridal/categories/bridal-earrings.webp',
    alt: 'Heritage bridal earrings and chandeliers',
    href: '/all-jewellery?category=earrings',
  },
  {
    id: 'maang-tikka',
    name: 'Maang Tikka',
    image: '/images/collections/bridal/categories/bridal-maang-tikka.webp',
    alt: 'Handcrafted bridal maang tikka with uncut stones',
    href: '/all-jewellery?category=maang-tikka',
  },
  {
    id: 'bangles',
    name: 'Bangles',
    image: '/images/collections/bridal/categories/bridal-bangles.webp',
    alt: 'Intricate 22KT gold bridal bangles and kadas',
    href: '/all-jewellery?category=bangles',
  },
  {
    id: 'nath',
    name: 'Nath',
    image: '/images/collections/bridal/categories/bridal-nath-nose-rings.webp',
    alt: 'Traditional bridal nath and nose ring with pearl chain',
    href: '/all-jewellery?category=nose-pins',
  },
];

export default function CompleteBridalLook() {
  const handleClick = (e, href) => {
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
      id="complete-bridal-look"
      aria-labelledby="complete-look-heading"
      className="py-16 sm:py-24 bg-[#FAF8F4] border-b border-champagne/60"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2
            id="complete-look-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-normal"
          >
            Complete Your Bridal Look
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 mt-2 font-normal">
            Discover the finishing touches to your wedding jewellery.
          </p>
        </div>

        {/* 4-Column Sleek 4:5 Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {BRIDAL_LOOK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={(e) => handleClick(e, cat.href)}
              className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
            >
              {/* Image Container with strict 4:5 portrait aspect ratio */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal/5 shadow-xs hover:shadow-xl transition-all duration-500">
                <Image
                  src={cat.image}
                  alt={cat.alt || cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Category Name & Subtle Arrow */}
              <div className="mt-3.5 sm:mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-base sm:text-lg font-normal text-charcoal tracking-normal group-hover:text-burgundy transition-colors duration-300">
                  {cat.name}
                </h3>
                <div className="w-6 h-6 rounded-full bg-champagne/40 group-hover:bg-burgundy text-charcoal group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

