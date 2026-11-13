'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { navigationCategories } from '@/data/navigation';
import AllJewelleryMegaMenu from '@/components/navigation/AllJewelleryMegaMenu';
import TrendingMegaMenu from '@/components/navigation/TrendingMegaMenu';
import MetalMegaMenu from '@/components/navigation/MetalMegaMenu';
import CoinsMegaMenu from '@/components/navigation/CoinsMegaMenu';
import CollectionsMegaMenu from '@/components/navigation/CollectionsMegaMenu';
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
                    if (cat.href && cat.href.startsWith('/')) {
                      // Allow navigation to page and close open mega menu
                      setActiveCategory(null);
                    } else if (cat.hasMegaMenu) {
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
                ) : cat.id === 'collections' ? (
                  <CollectionsMegaMenu
                    isOpen={isOpen}
                    onClose={() => setActiveCategory(null)}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
