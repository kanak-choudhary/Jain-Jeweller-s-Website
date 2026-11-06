'use client';

import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  // Initialize with sample items so count badge and UI interactions are immediately visible and reactive
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "22KT Royal Nizam Choker Necklace", price: "₹2,45,000" },
    { id: 2, name: "Solitaire Diamond Engagement Ring 1.5ct", price: "₹1,85,000" },
  ]);

  const toggleWishlist = (item) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

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

