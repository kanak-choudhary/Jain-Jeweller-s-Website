'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import allProductsData from '@/data/products.json';
import { FadeUp } from '@/components/ui/Motion';

const CATEGORY_LINK_MAP = {
  earrings: '/all-jewellery?category=earrings',
  rings: '/all-jewellery?category=rings',
  'pendants-sets': '/all-jewellery?category=pendants',
  'necklaces-sets': '/all-jewellery?category=necklaces',
  'bangles-bracelets': '/all-jewellery?category=bangles',
  chains: '/all-jewellery?category=chains',
  mangalsutra: '/all-jewellery?category=mangalsutra',
  'nose-pins': '/all-jewellery?category=nose-pins',
  anklets: '/all-jewellery?category=anklets',
  'maang-tikka': '/all-jewellery?category=maang-tikka',
  'waist-belts': '/all-jewellery?category=waist-belts',
  'haath-phool': '/all-jewellery?category=haath-phool',
  crowns: '/all-jewellery?category=crowns',
  accessories: '/all-jewellery?category=accessories',
  coins: '/all-jewellery?category=coins',
  'silver-articles': '/all-jewellery?category=silver-articles',
  idols: '/all-jewellery?metal=silver&category=idols',
  'pooja-items': '/all-jewellery?metal=silver&category=pooja-items',
  'gifting-articles': '/all-jewellery?metal=silver&category=gifting-articles',
};

export default function SimilarProductsSection({ currentProduct }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { requireAuth } = useAuth();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleWishlistClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      id: product.id,
      name: product.name,
      price: product.formattedPrice || `₹ ${Number(product.price).toLocaleString('en-IN')}`,
      image: product.image || product.images?.[0] || '/images/home/shop-by-category/earrings-category.webp',
      slug: product.slug,
    };

    requireAuth({
      action: 'wishlist',
      product: payload,
      returnUrl: typeof window !== 'undefined' ? window.location.pathname + window.location.search : `/product/${product.slug}`,
      onAllowed: () => {
        toggleWishlist(payload);
      },
    });
  };

  // 1. Dynamic Similar Products Query
  const similarProducts = useMemo(() => {
    if (!currentProduct) return [];

    // Prioritize exact same category
    let matches = allProductsData.filter(
      (p) => p.id !== currentProduct.id && p.slug !== currentProduct.slug && p.category === currentProduct.category
    );

    // Sort by same metal first
    matches.sort((a, b) => {
      if (a.metal === currentProduct.metal && b.metal !== currentProduct.metal) return -1;
      if (b.metal === currentProduct.metal && a.metal !== currentProduct.metal) return 1;
      return 0;
    });

    // Supplement if fewer than 6 so carousel always has items to browse
    if (matches.length < 6) {
      const supplementary = allProductsData.filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.slug !== currentProduct.slug &&
          p.category !== currentProduct.category &&
          (p.metal === currentProduct.metal || p.collection === currentProduct.collection)
      );
      matches = [...matches, ...supplementary];
    }

    return matches.slice(0, 10);
  }, [currentProduct]);

  // 2. View More Link based on category
  const viewMoreLink = useMemo(() => {
    if (!currentProduct?.category) return '/all-jewellery';
    return CATEGORY_LINK_MAP[currentProduct.category] || `/all-jewellery?category=${currentProduct.category}`;
  }, [currentProduct]);

  // 3. Scroll position detection
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, similarProducts]);

  // 4. Scroll handlers
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (similarProducts.length === 0) return null;

  return (
    <section
      aria-labelledby="similar-products-heading"
      className="py-12 sm:py-16 border-t border-border-soft/70 bg-white"
    >
      <div className="container-custom">
        {/* Section Header: Title & View More on Left, Carousel Controls on Right */}
        <FadeUp className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2
              id="similar-products-heading"
              className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-normal"
            >
              Similar Products
            </h2>
            <Link
              href={viewMoreLink}
              className="text-xs sm:text-sm text-[#D99506] hover:text-burgundy transition-colors font-sans mt-1 inline-flex items-center gap-1 group"
            >
              <span>View More Products</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Carousel Arrows Pill */}
          <div className="inline-flex items-center rounded-full border border-border-soft bg-white shadow-xs overflow-hidden shrink-0 mt-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className={`p-2 sm:p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                canScrollLeft
                  ? 'text-charcoal hover:bg-ivory hover:text-burgundy cursor-pointer'
                  : 'text-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="h-4 w-[1px] bg-border-soft" />
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next products"
              className={`p-2 sm:p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                canScrollRight
                  ? 'text-charcoal hover:bg-ivory hover:text-burgundy cursor-pointer'
                  : 'text-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </FadeUp>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 px-0.5 scrollbar-none"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {similarProducts.map((p) => {
            const mrp = Number(p.mrp || p.originalPrice) || Math.round(p.price * 1.08);
            const discount =
              p.discount || (mrp > p.price ? Math.round(((mrp - p.price) / mrp) * 100) : 0);
            const isWishlisted = isInWishlist(p.id);

            return (
              <div
                key={p.id}
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="group relative flex flex-col h-full bg-transparent">
                  {/* Square 1:1 Product Image Container (No borders, frames, or shadows) */}
                  <div
                    className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ivory"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    {/* Favourite / Wishlist Heart Icon (Top-Right) */}
                    <button
                      type="button"
                      onClick={(e) => handleWishlistClick(e, p)}
                      aria-label={isWishlisted ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                      className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full text-charcoal/70 hover:text-burgundy bg-white/70 hover:bg-white backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                          isWishlisted
                            ? 'text-burgundy fill-burgundy animate-heart-pop'
                            : 'text-charcoal/70 hover:text-burgundy'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Product Image Link */}
                    <Link
                      href={`/product/${p.slug}`}
                      className="block w-full h-full relative focus-visible:outline-none"
                    >
                      <Image
                        src={p.image || p.images?.[0] || '/images/home/shop-by-category/earrings-category.webp'}
                        alt={p.alt || p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>
                  </div>

                  {/* Product Details (Compact & Minimal) */}
                  <Link
                    href={`/product/${p.slug}`}
                    className="pt-3 px-1 text-left block focus-visible:outline-none"
                  >
                    <h3 className="font-sans text-xs sm:text-sm font-medium text-charcoal group-hover:text-burgundy transition-colors line-clamp-1 leading-snug">
                      {p.name}
                    </h3>

                    {/* Price Line with Strikethrough and Discount */}
                    <div className="mt-1 flex items-baseline gap-2 font-sans text-xs sm:text-sm">
                      <span className="font-semibold text-charcoal">
                        ₹ {Number(p.price).toLocaleString('en-IN')}
                      </span>

                      {mrp > p.price && (
                        <span className="text-muted line-through text-[11px] sm:text-xs font-light">
                          ₹{mrp.toLocaleString('en-IN')}
                        </span>
                      )}

                      {discount > 0 && (
                        <span className="text-[#D99506] font-medium text-[11px] sm:text-xs">
                          -{discount}%
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

