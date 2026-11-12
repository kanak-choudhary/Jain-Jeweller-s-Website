'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DiwaliPromotions() {
  // SVG background pattern definition for authentic, low-contrast luxury Indian jaali motif
  const backgroundPatternStyle = {
    backgroundColor: '#FAF8F4',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23650100' stroke-width='0.6' stroke-opacity='0.045' /%3E%3Ccircle cx='30' cy='30' r='14' fill='none' stroke='%23D99506' stroke-width='0.5' stroke-opacity='0.05' /%3E%3Ccircle cx='0' cy='0' r='14' fill='none' stroke='%23D99506' stroke-width='0.5' stroke-opacity='0.05' /%3E%3Ccircle cx='60' cy='0' r='14' fill='none' stroke='%23D99506' stroke-width='0.5' stroke-opacity='0.05' /%3E%3Ccircle cx='0' cy='60' r='14' fill='none' stroke='%23D99506' stroke-width='0.5' stroke-opacity='0.05' /%3E%3Ccircle cx='60' cy='60' r='14' fill='none' stroke='%23D99506' stroke-width='0.5' stroke-opacity='0.05' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  return (
    <div className="w-full flex flex-col">
      {/* ======================================================== */}
      {/* 1. GOLD JEWELLERY PROMOTION (Image Left, Content Right)   */}
      {/* ======================================================== */}
      <section
        aria-label="Gold Jewellery Promotion"
        style={backgroundPatternStyle}
        className="w-full py-16 sm:py-20 lg:py-24 border-t border-champagne/60 overflow-hidden"
      >
        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Gold Editorial Image with offset shadow frame */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-[1.36/1] w-full max-w-[480px]">
                {/* Subtle dark offset shadow behind the photo */}
                <div
                  className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 inset-0 bg-[#3D2C24]/30 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Clean rectangular image */}
                <div className="relative z-10 w-full h-full overflow-hidden bg-ivory">
                  <Image
                    src="/images/whats-trending/diwali/promotions/gold-promotion.png"
                    alt="Jain Jewellers Royal Gold Jewellery Collection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
                  />
                </div>
              </div>
            </div>

            {/* Right: Promotional Content */}
            <div className="flex flex-col items-center text-center justify-center lg:items-start lg:text-left lg:pl-4">
              <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col items-center text-center">
                {/* GOLD Heading */}
                <h3 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-[0.06em] text-[#650100] leading-none">
                  GOLD
                </h3>

                {/* Subtitle */}
                <p className="font-serif italic text-xs sm:text-[13px] tracking-[0.16em] text-[#650100] mt-2 sm:mt-2.5 uppercase font-medium">
                  WITH A LIFE OF ITS OWN
                </p>

                {/* Dotted divider with UP TO */}
                <div className="flex items-center justify-center gap-3 w-52 sm:w-60 my-5 sm:my-6">
                  <div className="flex-1 h-[0.75px] border-t border-dashed border-[#650100]/40" />
                  <span className="text-xs sm:text-[13px] tracking-[0.18em] uppercase font-bold text-[#650100]/90">
                    UP TO
                  </span>
                  <div className="flex-1 h-[0.75px] border-t border-dashed border-[#650100]/40" />
                </div>

                {/* 20% OFF Dominant Typography */}
                <div className="flex items-baseline justify-center leading-none text-[#650100]">
                  <span className="font-serif text-6xl sm:text-7xl lg:text-[84px] font-bold tracking-tight">
                    20
                  </span>
                  <div className="flex flex-col items-start ml-1.5 self-start">
                    <span className="font-serif text-3xl sm:text-4xl font-bold leading-none -mt-1">
                      %*
                    </span>
                    <span className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase leading-tight mt-1">
                      OFF
                    </span>
                  </div>
                </div>

                {/* Offer description */}
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#650100] uppercase text-center mt-3 sm:mt-4 leading-relaxed">
                  MAKING CHARGES ON <br />
                  PLAIN GOLD JEWELLERY
                </p>

                {/* CTA Button */}
                <Link
                  href="/all-jewellery?metal=gold"
                  className="inline-block bg-[#4A0000] hover:bg-[#650100] text-white font-serif tracking-[0.18em] text-xs uppercase px-9 py-3.5 transition-all duration-300 mt-6 sm:mt-7 shadow-xs hover:shadow-md hover:scale-102"
                >
                  EXPLORE GOLD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DIAMOND JEWELLERY PROMOTION (Content Left, Image Right) */}
      {/* ======================================================== */}
      <section
        aria-label="Diamond Jewellery Promotion"
        style={backgroundPatternStyle}
        className="w-full py-16 sm:py-20 lg:py-24 border-t border-champagne/40 overflow-hidden"
      >
        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Promotional Content (on mobile stacks 2nd) */}
            <div className="order-2 lg:order-1 flex flex-col items-center text-center justify-center lg:items-end lg:text-right lg:pr-4">
              <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col items-center text-center">
                {/* DIAMONDS Heading */}
                <h3 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-[0.06em] text-[#650100] leading-none">
                  DIAMONDS
                </h3>

                {/* Subtitle */}
                <p className="font-serif italic text-xs sm:text-[13px] tracking-[0.16em] text-[#650100] mt-2 sm:mt-2.5 uppercase font-medium">
                  WITH SOMETHING TO SAY
                </p>

                {/* Dotted divider with FLAT */}
                <div className="flex items-center justify-center gap-3 w-52 sm:w-60 my-5 sm:my-6">
                  <div className="flex-1 h-[0.75px] border-t border-dashed border-[#650100]/40" />
                  <span className="text-xs sm:text-[13px] tracking-[0.18em] uppercase font-bold text-[#650100]/90">
                    FLAT
                  </span>
                  <div className="flex-1 h-[0.75px] border-t border-dashed border-[#650100]/40" />
                </div>

                {/* 25% OFF Dominant Typography */}
                <div className="flex items-baseline justify-center leading-none text-[#650100]">
                  <span className="font-serif text-6xl sm:text-7xl lg:text-[84px] font-bold tracking-tight">
                    25
                  </span>
                  <div className="flex flex-col items-start ml-1.5 self-start">
                    <span className="font-serif text-3xl sm:text-4xl font-bold leading-none -mt-1">
                      %*
                    </span>
                    <span className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase leading-tight mt-1">
                      OFF
                    </span>
                  </div>
                </div>

                {/* Offer description */}
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#650100] uppercase text-center mt-3 sm:mt-4 leading-relaxed">
                  ON GOLD USED IN <br />
                  DIAMOND JEWELLERY
                </p>

                {/* CTA Button */}
                <Link
                  href="/all-jewellery?metal=diamond"
                  className="inline-block bg-[#4A0000] hover:bg-[#650100] text-white font-serif tracking-[0.18em] text-xs uppercase px-9 py-3.5 transition-all duration-300 mt-6 sm:mt-7 shadow-xs hover:shadow-md hover:scale-102"
                >
                  EXPLORE DIAMONDS
                </Link>
              </div>
            </div>

            {/* Right: Diamond Editorial Image (on mobile stacks 1st) */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <div className="relative aspect-[1.36/1] w-full max-w-[480px]">
                {/* Subtle dark offset shadow behind the photo */}
                <div
                  className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 inset-0 bg-[#3D2C24]/30 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Clean rectangular image */}
                <div className="relative z-10 w-full h-full overflow-hidden bg-ivory">
                  <Image
                    src="/images/whats-trending/diwali/promotions/diamond-promotion.png"
                    alt="Jain Jewellers Solitaire Diamond Jewellery Collection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

