'use client';

import Image from 'next/image';
import Link from 'next/link';

const ACCENT_CATEGORIES = [
  {
    id: 'earrings',
    name: 'Earrings',
    detail: 'Chandbalis & Jhumkas',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    href: '#bridal-earrings',
  },
  {
    id: 'maang-tikka',
    name: 'Maang Tikka',
    detail: 'Matha Patti & Borla',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop',
    href: '#bridal-maang-tikka',
  },
  {
    id: 'bangles',
    name: 'Bangles',
    detail: 'Kadas & Chooda Sets',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop',
    href: '#bridal-bangles',
  },
  {
    id: 'nath',
    name: 'Nath',
    detail: 'Nose Rings & Chains',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop',
    href: '#bridal-nath',
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

        {/* 4-Column Sleek Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {ACCENT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={(e) => handleClick(e, cat.href)}
              className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
            >
              {/* Image with subtle border and rounded-2xl */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-500">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Minimal Text Below */}
              <div className="mt-3.5 space-y-0.5">
                <h3 className="font-serif text-base sm:text-lg font-normal text-charcoal group-hover:text-burgundy transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-sans text-charcoal/60 tracking-wider">
                  {cat.detail}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

