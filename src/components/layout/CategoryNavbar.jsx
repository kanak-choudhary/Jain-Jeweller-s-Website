'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { navigationCategories } from '@/data/navigation';
import AllJewelleryMegaMenu from '@/components/navigation/AllJewelleryMegaMenu';
import TrendingMegaMenu from '@/components/navigation/TrendingMegaMenu';
import MetalMegaMenu from '@/components/navigation/MetalMegaMenu';
import CoinsMegaMenu from '@/components/navigation/CoinsMegaMenu';
import { goldMenuData, diamondMenuData, silverMenuData } from '@/data/metalMegaMenuData';

export default function CategoryNavbar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);
  const navRef = useRef(null);

  const handleMouseEnter = (categoryId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 180);
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (category.hasMegaMenu) {
        e.preventDefault();
        setActiveCategory(activeCategory === category.id ? null : category.id);
      }
    } else if (e.key === 'Escape') {
      setActiveCategory(null);
    }
  };

  // Outside click & global escape key handling
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCategory(null);
      }
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveCategory(null);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Jewellery Categories"
      className="hidden lg:block bg-white/95 backdrop-blur-sm border-b border-champagne relative z-40"
      onMouseLeave={handleMouseLeave}
    >
      <div className="container-custom">
        <ul className="flex items-center justify-center gap-6 xl:gap-8 list-none m-0 p-0">
          {navigationCategories.map((cat) => {
            const isOpen = activeCategory === cat.id;

            return (
              <li
                key={cat.id}
                className="relative py-[12.5px] group"
                onMouseEnter={() => handleMouseEnter(cat.id)}
              >
                <Link
                  href={cat.href}
                  onClick={(e) => {
                    if (cat.hasMegaMenu) {
                      e.preventDefault();
                      setActiveCategory(activeCategory === cat.id ? null : cat.id);
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, cat)}
                  aria-expanded={cat.hasMegaMenu ? isOpen : undefined}
                  aria-haspopup={cat.hasMegaMenu ? 'true' : undefined}
                  className={`flex items-center gap-1.5 text-[13px] tracking-[0.06em] uppercase font-medium transition-colors duration-200 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                    isOpen ? 'text-burgundy' : 'text-charcoal hover:text-burgundy'
                  }`}
                >
                  <span>{cat.label}</span>

                  {cat.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-burgundy/10 text-burgundy font-bold rounded-full tracking-normal lowercase">
                      {cat.badge}
                    </span>
                  )}

                  {cat.hasMegaMenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-burgundy' : 'text-muted group-hover:text-burgundy'
                      }`}
                    />
                  )}

                  {/* Gold Underline Animation on Hover/Active */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ease-out ${
                      isOpen ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>

                {/* MEGA MENUS */}
                {cat.id === 'all-jewellery' ? (
                  <AllJewelleryMegaMenu
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                  />
                ) : cat.id === 'trending' ? (
                  <TrendingMegaMenu
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                  />
                ) : cat.id === 'gold' ? (
                  <MetalMegaMenu
                    data={goldMenuData}
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                    align="left"
                  />
                ) : cat.id === 'diamond' ? (
                  <MetalMegaMenu
                    data={diamondMenuData}
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                    align="center"
                  />
                ) : cat.id === 'silver' ? (
                  <MetalMegaMenu
                    data={silverMenuData}
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                    align="center"
                  />
                ) : cat.id === 'coins' ? (
                  <CoinsMegaMenu
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                  />
                ) : (
                  /* STANDARD CATEGORY MEGA MENU (e.g. Collections) */
                  cat.hasMegaMenu &&
                  cat.subcategories && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[720px] transition-all duration-200 ease-out ${
                        isOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white border border-border-soft rounded-2xl shadow-2xl shadow-burgundy/10 p-6 grid grid-cols-12 gap-6 text-left">
                        {cat.subcategories.map((sub, idx) => {
                          const isFeatured = !!sub.featured;
                          const colSpan = isFeatured ? 'col-span-4' : 'col-span-4';

                          return (
                            <div key={idx} className={`${colSpan} space-y-3`}>
                              <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal border-b border-champagne/60 pb-2">
                                {sub.title}
                              </h3>

                              {sub.items && (
                                <ul className="space-y-2.5 list-none m-0 p-0">
                                  {sub.items.map((item, i) => (
                                    <li key={i}>
                                      <Link
                                        href={item.href}
                                        className="group/item block text-xs transition-colors hover:text-burgundy"
                                      >
                                        <span className="font-serif font-medium text-charcoal group-hover/item:text-burgundy transition-colors block">
                                          {item.name}
                                        </span>
                                        {item.description && (
                                          <span className="text-[11px] text-muted line-clamp-1 block">
                                            {item.description}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Optional Featured Highlight in Mega Menu */}
                              {sub.featured && (
                                <div className="bg-ivory border border-border-soft rounded-xl p-4 space-y-2">
                                  <div className="flex items-center gap-1.5 text-gold text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" /> Exclusive
                                  </div>
                                  <h4 className="font-serif font-bold text-sm text-burgundy">
                                    {sub.featured.title}
                                  </h4>
                                  <p className="text-[11px] text-muted leading-relaxed">
                                    {sub.featured.subtitle}
                                  </p>
                                  <Link
                                    href={sub.featured.href}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal hover:text-burgundy transition-colors pt-1"
                                  >
                                    {sub.featured.cta} <ArrowRight className="w-3 h-3 text-gold" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
