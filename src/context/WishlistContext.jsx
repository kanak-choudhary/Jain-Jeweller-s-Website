'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'jj_wishlist_items';

const DEFAULT_WISHLIST = [
  { id: 'jj-ear-001', name: 'Heritage Polki & Pearl Chandelier Earrings', price: '₹1,25,000' },
  { id: 'jj-rng-001', name: 'Solitaire Diamond Engagement Ring 1.5ct', price: '₹1,85,000' },
];

export function WishlistProvider({ children }) {
  // Use lazy initializer to read from localStorage without cascading renders
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_WISHLIST;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_WISHLIST;
    } catch {
      return DEFAULT_WISHLIST;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // Ignore
    }
  }, [wishlistItems]);

  const toggleWishlist = useCallback((item) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const isInWishlist = useCallback(
    (id) => {
      return wishlistItems.some((item) => item.id === id);
    },
    [wishlistItems]
  );

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlistItems: [],
      wishlistCount: 0,
      toggleWishlist: () => {},
      isInWishlist: () => false,
    };
  }
  return context;
}
