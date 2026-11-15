'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { trendingSearches, mockSearchProducts } from '@/data/navigation';
import { useIsMounted } from '@/lib/animations';

export default function MainNavbar({ onOpenMobileMenu }) {
  const { wishlistCount, wishlistItems } = useWishlist();
  const { cartCount, cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const mounted = useIsMounted();

  const displayCartCount = mounted && isAuthenticated ? cartCount : 0;
  const displayWishlistCount = mounted && isAuthenticated ? wishlistCount : 0;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Dropdown states
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  const accountRef = useRef(null);
  const wishlistRef = useRef(null);
  const cartRef = useRef(null);

  // Close dropdowns on outside click & Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setIsWishlistDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAccountOpen(false);
        setIsWishlistDropdownOpen(false);
        setIsCartDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(true);
  };

  const handleTrendingTagClick = (tag) => {
    setSearchQuery(tag);
    setIsSearchOpen(true);
  };

  // Filter matching products based on search query
  const filteredProducts = searchQuery.trim()
    ? mockSearchProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSearchProducts.slice(0, 3);

  return (
    <div className="bg-white border-b border-champagne/60">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 text-burgundy hover:text-burgundy-dark transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              <Menu className="w-6 h-6" strokeWidth={1.8} />
            </button>

            <Link
              href="/"
              className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm py-1"
              aria-label="Jain Jewellers - Home"
            >
              <Image
                src="/images/logo.jpg"
                alt="Jain Jewellers"
                width={192}
                height={64}
                priority
                className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
              />
            </Link>
          </div>

          {/* CENTER: Search Bar (Desktop & Tablet) */}
          <div
            ref={searchContainerRef}
            className="relative hidden md:block flex-1 max-w-lg lg:max-w-xl mx-auto"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search for jewellery, collections..."
                aria-label="Search for jewellery"
                className="w-full h-11 pl-11 pr-10 text-sm bg-ivory/60 border border-border-soft rounded-full text-charcoal placeholder:text-muted/70 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-burgundy hover:text-burgundy-dark transition-colors"
              >
                <Search className="w-4 h-4" strokeWidth={2} />
              </button>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search text"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Search Suggestions & Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-border-soft rounded-2xl shadow-xl shadow-burgundy/5 z-50 p-5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-border-soft">
                  <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    {searchQuery.trim() ? 'Search Results' : 'Trending Searches'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs text-muted hover:text-burgundy transition-colors flex items-center gap-1"
                  >
                    Close <X className="w-3 h-3" />
                  </button>
                </div>

                {!searchQuery.trim() ? (
                  <div className="pt-3 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTrendingTagClick(tag)}
                          className="text-xs px-3 py-1.5 rounded-full bg-ivory border border-border-soft hover:border-gold hover:text-burgundy transition-all duration-150 text-charcoal font-medium"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-border-soft/60">
                      <span className="text-xs text-muted block mb-2 font-medium">Popular Highlights:</span>
                      <div className="space-y-2">
                        {mockSearchProducts.slice(0, 3).map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-ivory transition-colors text-xs"
                          >
                            <span className="font-serif text-charcoal font-medium hover:text-burgundy transition-colors">{item.name}</span>
                            <span className="text-burgundy font-semibold">{item.price}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 space-y-2">
                    {filteredProducts.length > 0 ? (
                      <>
                        <p className="text-xs text-muted mb-2">
                          Showing matches for &quot;<span className="text-burgundy font-medium">{searchQuery}</span>&quot;:
                        </p>
                        {filteredProducts.map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-ivory transition-colors group"
                          >
                            <div>
                              <p className="text-xs font-serif font-semibold text-charcoal group-hover:text-burgundy transition-colors">
                                {item.name}
                              </p>
                              <span className="text-[10px] text-muted tracking-wide uppercase">
                                {item.category} • {item.tag}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-burgundy">{item.price}</span>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="py-6 text-center text-xs text-muted">
                        No jewellery matches found for &quot;{searchQuery}&quot;. Try exploring our trending collections.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Account / Sign In */}
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                aria-label="User Account"
                aria-expanded={isAccountOpen}
                className="p-2.5 text-burgundy hover:text-burgundy-dark hover:bg-ivory rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative"
              >
                <User className="w-5 h-5" strokeWidth={1.8} />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white border border-[#E8E1D8] shadow-2xl z-50 animate-dropdown">
                  {/* Subtle top arrow pointer aligned with profile icon */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-1.5 right-3.5 w-3 h-3 bg-white border-t border-l border-[#E8E1D8] rotate-45 z-10"
                  />

                  {isAuthenticated ? (
                    <div className="relative z-20 flex flex-col divide-y divide-[#E8E1D8] bg-white">
                      {/* 1. My Profile > */}
                      <Link
                        href="/account?tab=profile"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center justify-between w-full px-5 sm:px-6 py-4 hover:bg-[#FAF8F4] transition-colors group"
                      >
                        <span className="font-sans text-sm sm:text-[15px] font-medium text-burgundy tracking-normal">
                          My Profile
                        </span>
                        <ChevronRight
                          className="w-4 h-4 text-burgundy transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </Link>

                      {/* 2. My Address > */}
                      <Link
                        href="/account?tab=address"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center justify-between w-full px-5 sm:px-6 py-4 hover:bg-[#FAF8F4] transition-colors group"
                      >
                        <span className="font-sans text-sm sm:text-[15px] font-medium text-charcoal tracking-normal">
                          My Address
                        </span>
                        <ChevronRight
                          className="w-4 h-4 text-burgundy transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </Link>

                      {/* 3. My Orders > */}
                      <Link
                        href="/account?tab=orders"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center justify-between w-full px-5 sm:px-6 py-4 hover:bg-[#FAF8F4] transition-colors group"
                      >
                        <span className="font-sans text-sm sm:text-[15px] font-medium text-charcoal tracking-normal">
                          My Orders
                        </span>
                        <ChevronRight
                          className="w-4 h-4 text-burgundy transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </Link>

                      {/* 4. My Returns > */}
                      <Link
                        href="/account?tab=returns"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center justify-between w-full px-5 sm:px-6 py-4 hover:bg-[#FAF8F4] transition-colors group"
                      >
                        <span className="font-sans text-sm sm:text-[15px] font-medium text-charcoal tracking-normal">
                          My Returns
                        </span>
                        <ChevronRight
                          className="w-4 h-4 text-burgundy transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </Link>

                      {/* 5. Sign Out */}
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsAccountOpen(false);
                        }}
                        className="flex items-center justify-start w-full px-5 sm:px-6 py-4 text-left hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                      >
                        <span className="font-sans text-sm sm:text-[15px] font-medium text-burgundy tracking-normal">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-20 p-5 text-center bg-white">
                      <p className="font-serif text-base font-bold text-charcoal">Welcome Guest</p>
                      <p className="text-xs text-muted mt-0.5">
                        Sign in to access your luxury jewellery bag &amp; account
                      </p>
                      <div className="pt-3 space-y-2">
                        <Link
                          href="/signin"
                          onClick={() => setIsAccountOpen(false)}
                          className="block text-center w-full py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setIsAccountOpen(false)}
                          className="block text-center w-full py-2 bg-ivory hover:bg-champagne/40 border border-border-soft text-charcoal rounded text-xs font-medium transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <div ref={wishlistRef} className="relative">
              <button
                type="button"
                onClick={() => setIsWishlistDropdownOpen(!isWishlistDropdownOpen)}
                aria-label={mounted && displayWishlistCount > 0 ? `Wishlist, ${displayWishlistCount} items` : 'Wishlist'}
                aria-expanded={isWishlistDropdownOpen}
                className="p-2.5 text-burgundy hover:text-burgundy-dark hover:bg-ivory rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative"
              >
                <Heart className="w-5 h-5" strokeWidth={1.8} />
                {mounted && displayWishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-badge-pulse">
                    {displayWishlistCount}
                  </span>
                )}
              </button>

              {isWishlistDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border-soft rounded-2xl shadow-xl shadow-burgundy/5 p-5 z-50 animate-dropdown">
                  <div className="flex items-center justify-between pb-3 border-b border-border-soft">
                    <span className="font-serif text-sm font-bold text-charcoal">
                      Your Wishlist ({displayWishlistCount})
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsWishlistDropdownOpen(false)}
                      className="text-muted hover:text-charcoal p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {!isAuthenticated ? (
                    <div className="py-5 text-center space-y-3">
                      <p className="font-serif text-sm font-semibold text-charcoal">Sign In to View Wishlist</p>
                      <p className="text-xs text-muted leading-relaxed">
                        Please sign in to save and view your favourite jewellery designs.
                      </p>
                      <Link
                        href="/signin?redirect=/wishlist"
                        onClick={() => setIsWishlistDropdownOpen(false)}
                        className="block w-full py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold tracking-wider uppercase text-center transition-colors shadow-xs"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : wishlistItems.length === 0 ? (
                    <div className="py-6 text-center space-y-2">
                      <p className="font-serif text-sm text-charcoal">Your wishlist is empty</p>
                      <Link
                        href="/all-jewellery"
                        onClick={() => setIsWishlistDropdownOpen(false)}
                        className="text-xs text-burgundy font-medium hover:underline inline-block"
                      >
                        Explore jewellery
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="py-3 max-h-60 overflow-y-auto space-y-3">
                        {wishlistItems.map((item) => (
                          <Link
                            key={item.id}
                            href="/wishlist"
                            onClick={() => setIsWishlistDropdownOpen(false)}
                            className="flex items-center justify-between text-xs py-1.5 border-b border-border-soft/40 last:border-0 hover:text-burgundy transition-colors"
                          >
                            <span className="font-serif font-medium text-charcoal pr-2 truncate">{item.name}</span>
                            <span className="font-semibold text-burgundy whitespace-nowrap">{item.price}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-border-soft">
                        <Link
                          href="/wishlist"
                          onClick={() => setIsWishlistDropdownOpen(false)}
                          className="w-full py-2 bg-ivory hover:bg-champagne/40 border border-border-soft text-charcoal hover:text-burgundy rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          View All Saved Items <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Icon */}
            <div ref={cartRef} className="relative">
              <button
                type="button"
                onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                aria-label={mounted && displayCartCount > 0 ? `Shopping Bag, ${displayCartCount} items` : 'Shopping Bag'}
                aria-expanded={isCartDropdownOpen}
                className="p-2.5 text-burgundy hover:text-burgundy-dark hover:bg-ivory rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
                {mounted && displayCartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-gold text-charcoal text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-badge-pulse">
                    {displayCartCount}
                  </span>
                )}
              </button>

              {isCartDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border-soft rounded-2xl shadow-xl shadow-burgundy/5 p-5 z-50 animate-dropdown">
                  <div className="flex items-center justify-between pb-3 border-b border-border-soft">
                    <span className="font-serif text-sm font-bold text-charcoal">
                      Shopping Bag ({displayCartCount})
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCartDropdownOpen(false)}
                      className="text-muted hover:text-charcoal p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {!isAuthenticated ? (
                    <div className="py-5 text-center space-y-3">
                      <p className="font-serif text-sm font-semibold text-charcoal">Sign In to View Bag</p>
                      <p className="text-xs text-muted leading-relaxed">
                        Please sign in to view items added to your shopping bag and proceed to checkout.
                      </p>
                      <Link
                        href="/signin?redirect=/bag"
                        onClick={() => setIsCartDropdownOpen(false)}
                        className="block w-full py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold tracking-wider uppercase text-center transition-colors shadow-xs"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : cartItems.length === 0 ? (
                    <div className="py-6 text-center space-y-2">
                      <p className="font-serif text-sm text-charcoal">Your bag is empty</p>
                      <Link
                        href="/all-jewellery"
                        onClick={() => setIsCartDropdownOpen(false)}
                        className="text-xs text-burgundy font-medium hover:underline inline-block"
                      >
                        Explore jewellery
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="py-3 max-h-60 overflow-y-auto space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border-soft/40 last:border-0">
                            <div>
                              <p className="font-serif font-medium text-charcoal">{item.name}</p>
                              <span className="text-[11px] text-muted">Qty: {item.quantity}</span>
                            </div>
                            <span className="font-semibold text-burgundy whitespace-nowrap">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-border-soft space-y-2">
                        <Link
                          href="/bag"
                          onClick={() => setIsCartDropdownOpen(false)}
                          className="block w-full py-2 bg-ivory hover:bg-champagne/40 text-charcoal border border-border-soft rounded-lg text-xs font-semibold tracking-wider uppercase text-center transition-colors"
                        >
                          View Shopping Bag
                        </Link>
                        <Link
                          href="/checkout"
                          onClick={() => setIsCartDropdownOpen(false)}
                          className="block w-full py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold tracking-wider uppercase text-center transition-colors"
                        >
                          Proceed to Checkout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

