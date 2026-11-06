'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ChevronDown, Search, Heart, ShoppingBag, User, Phone, MapPin } from 'lucide-react';
import { navigationCategories } from '@/data/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function MobileNavigation({ isOpen, onClose }) {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [expandedCategories, setExpandedCategories] = useState({});
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
                          {cat.subcategories.map((sub, idx) => (
                            <div key={idx} className="space-y-1.5">
                              {sub.title && (
                                <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/80 border-b border-champagne/60 pb-1">
                                  {sub.title}
                                </p>
                              )}
                              {sub.items && (
                                <ul className="space-y-1.5 list-none m-0 p-0">
                                  {sub.items.map((item, i) => (
                                    <li key={i}>
                                      <Link
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="text-xs text-charcoal/90 hover:text-burgundy transition-colors block py-1 font-serif"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
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
              href="#cart"
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

