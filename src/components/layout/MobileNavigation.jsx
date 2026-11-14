'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ChevronDown, Search, Heart, ShoppingBag, User, Phone, MapPin, Crown, Link2, Flower2, Sparkles } from 'lucide-react';
import { navigationCategories } from '@/data/navigation';
import { allJewelleryMenuData } from '@/data/allJewelleryMenu';
import { goldMenuData, diamondMenuData, silverMenuData, coinsMenuData } from '@/data/metalMegaMenuData';
import { trendingMenuData } from '@/data/trendingMenuData';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const metalDataMap = {
  gold: goldMenuData,
  diamond: diamondMenuData,
  silver: silverMenuData,
};

export default function MobileNavigation({ isOpen, onClose }) {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [mobileAllJewelleryTab, setMobileAllJewelleryTab] = useState('category');
  const [mobileMetalTabs, setMobileMetalTabs] = useState({
    gold: 'category',
    diamond: 'category',
    silver: 'category',
  });
  const [isMobileBridalOpen, setIsMobileBridalOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer sliding from right */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-champagne">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center"
            aria-label="Jain Jewellers - Home"
          >
            <Image
              src="/images/logo.jpg"
              alt="Jain Jewellers"
              width={160}
              height={54}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-charcoal hover:text-burgundy transition-colors rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Mobile Search */}
        <div className="px-6 py-4 bg-ivory/50 border-b border-border-soft">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="relative"
          >
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search jewellery, gold, bridal..."
              className="w-full h-10 pl-10 pr-4 text-xs bg-white border border-border-soft rounded-full text-charcoal placeholder:text-muted focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
            />
            <Search className="w-4 h-4 text-burgundy absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Navigation Categories List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border-soft/60">
          <ul className="space-y-1 pb-4 list-none m-0 p-0">
            {navigationCategories.map((cat) => {
              const isExpanded = !!expandedCategories[cat.id];

              return (
                <li key={cat.id} className="py-1">
                  {cat.hasMegaMenu ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium text-charcoal hover:text-burgundy transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          {cat.label}
                          {cat.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-burgundy/10 text-burgundy font-bold rounded-full normal-case">
                              {cat.badge}
                            </span>
                          )}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-burgundy' : ''
                          }`}
                        />
                      </button>

                      {/* Expandable Submenu */}
                      {isExpanded && (
                        <div className="pl-3 pr-2 py-2 space-y-3 bg-ivory/60 rounded-xl my-1 border border-border-soft/60 animate-in fade-in duration-150">
                          {cat.id === 'all-jewellery' ? (
                            <div className="space-y-3">
                              {/* Horizontal Tab Selector for All Jewellery */}
                              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar border-b border-champagne/60">
                                {allJewelleryMenuData.tabs.map((tab) => (
                                  <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setMobileAllJewelleryTab(tab.id)}
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-colors ${
                                      mobileAllJewelleryTab === tab.id
                                        ? 'bg-burgundy text-white shadow-xs font-semibold'
                                        : 'bg-champagne/40 text-charcoal hover:bg-champagne/70'
                                    }`}
                                  >
                                    {tab.label}
                                  </button>
                                ))}
                              </div>

                              {/* Mobile Tab Content */}
                              {mobileAllJewelleryTab === 'category' ? (
                                <div className="space-y-3">
                                  {allJewelleryMenuData.content.category.columns.map((col, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                      <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 border-b border-champagne/40 pb-0.5">
                                        {col.title}
                                      </p>
                                      <div className="grid grid-cols-2 gap-1.5">
                                        {col.items.map((item, i) => (
                                          <Link
                                            key={i}
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className="text-xs text-charcoal hover:text-burgundy transition-colors py-1 px-1.5 rounded-md hover:bg-white/80 font-serif line-clamp-1"
                                          >
                                            {item.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {allJewelleryMenuData.content[mobileAllJewelleryTab]?.columns[0]?.items.map((item, i) => (
                                    <Link
                                      key={i}
                                      href={item.href}
                                      onClick={handleLinkClick}
                                      className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/70 hover:bg-white transition-colors"
                                    >
                                      <div>
                                        <span className="text-xs font-serif font-medium text-charcoal hover:text-burgundy block">
                                          {item.name}
                                        </span>
                                        {item.detail && (
                                          <span className="text-[10px] text-muted block line-clamp-1">
                                            {item.detail}
                                          </span>
                                        )}
                                      </div>
                                      <ChevronRight className="w-3 h-3 text-muted" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : metalDataMap[cat.id] ? (
                            (() => {
                              const mData = metalDataMap[cat.id];
                              const activeTab = mobileMetalTabs[cat.id] || 'category';
                              const tabContent = mData.content[activeTab];

                              return (
                                <div className="space-y-3">
                                  {/* Horizontal Tab Selector for Gold / Diamond / Silver */}
                                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar border-b border-champagne/60">
                                    {mData.tabs.map((tab) => (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() =>
                                          setMobileMetalTabs((prev) => ({
                                            ...prev,
                                            [cat.id]: tab.id,
                                          }))
                                        }
                                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-colors ${
                                          activeTab === tab.id
                                            ? 'bg-burgundy text-white shadow-xs font-semibold'
                                            : 'bg-champagne/40 text-charcoal hover:bg-champagne/70'
                                        }`}
                                      >
                                        {tab.label}
                                      </button>
                                    ))}
                                  </div>

                                  {/* Metal Mobile Tab Content */}
                                  {activeTab === 'category' ? (
                                    <div className="space-y-3">
                                      {tabContent?.columns?.map((col, idx) => (
                                        <div key={idx} className="space-y-1.5">
                                          <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 border-b border-champagne/40 pb-0.5">
                                            {col.title}
                                          </p>
                                          <div className="grid grid-cols-2 gap-1.5">
                                            {col.items.map((item, i) => (
                                              <Link
                                                key={i}
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className="text-xs text-charcoal hover:text-burgundy transition-colors py-1 px-1.5 rounded-md hover:bg-white/80 font-serif line-clamp-1"
                                              >
                                                {item.name}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                                      {tabContent?.items?.map((item, i) => (
                                        <Link
                                          key={i}
                                          href={item.href}
                                          onClick={handleLinkClick}
                                          className={`py-1.5 px-2 rounded-lg text-xs font-serif transition-colors block ${
                                            item.isHighlight
                                              ? 'font-semibold text-burgundy bg-champagne/30'
                                              : 'text-charcoal hover:text-burgundy bg-white/70 hover:bg-white'
                                          }`}
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}

                                  {/* View All Metal CTA */}
                                  <div className="pt-2 border-t border-champagne/60">
                                    <Link
                                      href={cat.href}
                                      onClick={handleLinkClick}
                                      className="block w-full py-2 px-3 rounded-lg bg-burgundy text-white text-center text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-dark transition-colors"
                                    >
                                      View All {cat.label} Jewellery
                                    </Link>
                                  </div>
                                </div>
                              );
                            })()
                          ) : cat.id === 'trending' ? (
                            <div className="space-y-3">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/80 border-b border-champagne/40 pb-0.5">
                                {trendingMenuData.title}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {trendingMenuData.columns.flatMap((col) => col.items).map((item, i) => (
                                  <Link
                                    key={i}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="text-xs transition-colors py-1.5 px-2 rounded-md font-serif text-charcoal hover:text-burgundy hover:bg-white/80"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>

                              {/* View Diwali Collection CTA */}
                              <div className="pt-2 border-t border-champagne/60">
                                <Link
                                  href="/diwali"
                                  onClick={handleLinkClick}
                                  className="block w-full py-2 px-3 rounded-lg bg-burgundy text-white text-center text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-dark transition-colors"
                                >
                                  Explore Diwali Collection
                                </Link>
                              </div>
                            </div>
                          ) : cat.id === 'coins' ? (
                            <div className="space-y-3">
                              {coinsMenuData.columns.map((col, idx) => (
                                <div key={idx} className="space-y-1.5">
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold border-b border-champagne/40 pb-0.5">
                                    {col.title}
                                  </p>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {col.items.map((item, i) => (
                                      <Link
                                        key={i}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className={`text-xs transition-colors py-1 px-1.5 rounded-md font-serif line-clamp-1 ${
                                          item.isHighlight
                                            ? 'font-semibold text-burgundy bg-champagne/30'
                                            : 'text-charcoal hover:text-burgundy hover:bg-white/80'
                                        }`}
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              {/* View All Coins CTA */}
                              <div className="pt-2 border-t border-champagne/60">
                                <Link
                                  href="/all-jewellery?category=coins"
                                  onClick={handleLinkClick}
                                  className="block w-full py-2 px-3 rounded-lg bg-burgundy text-white text-center text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-dark transition-colors"
                                >
                                  View All Coins
                                </Link>
                              </div>
                            </div>
                          ) : cat.id === 'collections' ? (
                            <div className="space-y-3 py-1">
                              {/* Bridal Collection with Click-to-Open Sub-items */}
                              <div>
                                <div className="flex items-center justify-between pb-1.5 border-b border-champagne/40">
                                  <Link
                                    href="/bridal-collection"
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-2.5 text-xs font-serif font-bold text-charcoal hover:text-burgundy transition-colors flex-1"
                                  >
                                    <span className="w-5 h-5 rounded-md bg-champagne/40 text-gold flex items-center justify-center shrink-0">
                                      <Crown className="w-3 h-3" strokeWidth={1.7} />
                                    </span>
                                    <span>Bridal Collection</span>
                                  </Link>

                                  <button
                                    type="button"
                                    onClick={() => setIsMobileBridalOpen((prev) => !prev)}
                                    className="p-1 rounded-md text-muted hover:text-burgundy transition-colors"
                                    aria-expanded={isMobileBridalOpen}
                                    aria-label="Toggle Bridal subcategories"
                                  >
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        isMobileBridalOpen ? 'rotate-180 text-burgundy' : ''
                                      }`}
                                    />
                                  </button>
                                </div>

                                {isMobileBridalOpen && (
                                  <div className="mt-2 ml-3.5 pl-3 space-y-1.5 border-l-2 border-champagne/70 animate-in fade-in duration-150">
                                    {['Marathi Bride', 'Kerala Bride', 'Tamil Bride', 'Rajisthani Bride'].map((bride, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-[11px] font-serif text-muted/90 py-0.5 select-none">
                                        <Sparkles className="w-2.5 h-2.5 text-gold/80 shrink-0" strokeWidth={1.5} />
                                        <span>{bride}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Other Collection Links in Sequence */}
                              <div className="space-y-1.5 pt-1 border-t border-champagne/40">
                                <Link
                                  href="/collections"
                                  onClick={handleLinkClick}
                                  className="flex items-center gap-2.5 text-xs font-serif font-semibold text-charcoal hover:text-burgundy transition-colors py-1"
                                >
                                  <span className="w-5 h-5 rounded-md bg-champagne/40 text-gold flex items-center justify-center shrink-0">
                                    <Link2 className="w-3 h-3" strokeWidth={1.7} />
                                  </span>
                                  <span>Station Mangalsutra</span>
                                </Link>
                                <Link
                                  href="/collections"
                                  onClick={handleLinkClick}
                                  className="flex items-center gap-2.5 text-xs font-serif font-semibold text-charcoal hover:text-burgundy transition-colors py-1"
                                >
                                  <span className="w-5 h-5 rounded-md bg-champagne/40 text-gold flex items-center justify-center shrink-0">
                                    <Flower2 className="w-3 h-3" strokeWidth={1.7} />
                                  </span>
                                  <span>Floral Bloom</span>
                                </Link>
                                <Link
                                  href="/collections"
                                  onClick={handleLinkClick}
                                  className="flex items-center gap-2.5 text-xs font-serif font-semibold text-charcoal hover:text-burgundy transition-colors py-1"
                                >
                                  <span className="w-5 h-5 rounded-md bg-champagne/40 text-gold flex items-center justify-center shrink-0">
                                    <Heart className="w-3 h-3" strokeWidth={1.7} />
                                  </span>
                                  <span>Valentine Special</span>
                                </Link>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={cat.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium text-charcoal hover:text-burgundy transition-colors"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Account, Wishlist & Cart Actions */}
          <div className="pt-4 space-y-2">
            <Link
              href="#account"
              onClick={handleLinkClick}
              className="flex items-center gap-3 py-2 text-xs font-semibold text-charcoal hover:text-burgundy transition-colors"
            >
              <User className="w-4 h-4 text-burgundy" /> Sign In / My Account
            </Link>

            <Link
              href="#wishlist"
              onClick={handleLinkClick}
              className="flex items-center justify-between py-2 text-xs font-semibold text-charcoal hover:text-burgundy transition-colors"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-burgundy" /> My Wishlist
              </span>
              {wishlistCount > 0 && (
                <span className="px-2 py-0.5 bg-burgundy text-white text-[10px] font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/bag"
              onClick={handleLinkClick}
              className="flex items-center justify-between py-2 text-xs font-semibold text-charcoal hover:text-burgundy transition-colors"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-burgundy" /> Shopping Bag
              </span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Drawer Footer Assistance */}
        <div className="p-6 bg-ivory border-t border-border-soft space-y-2 text-xs text-muted">
          <div className="flex items-center gap-2 text-charcoal font-medium">
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>Assistance: +91 (800) 524-6539</span>
          </div>
          <div className="flex items-center gap-2 text-charcoal font-medium">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>Store Locator &amp; Private Appointment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

