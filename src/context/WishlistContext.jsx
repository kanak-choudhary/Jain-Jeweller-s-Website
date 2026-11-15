'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

const getUserWishlistKey = (user) => {
  if (!user) return null;
  const identifier = user.email || user.phone || user.id || 'default_user';
  return `jj_wishlist_${encodeURIComponent(identifier.toLowerCase().trim())}`;
};

export function WishlistProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const storageKey = useMemo(() => getUserWishlistKey(user), [user]);

  // Initial state is always empty for guests
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window === 'undefined' || !storageKey) return [];
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Adjust state during render when user storageKey changes (React pattern: adjusting state when prop/context changes)
  const [prevKey, setPrevKey] = useState(storageKey);
  if (prevKey !== storageKey) {
    setPrevKey(storageKey);
    if (!isAuthenticated || !storageKey) {
      setWishlistItems([]);
    } else if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        setWishlistItems(stored ? JSON.parse(stored) : []);
      } catch {
        setWishlistItems([]);
      }
    }
  }

  // Sync to user-scoped localStorage whenever wishlistItems changes
  useEffect(() => {
    if (!isAuthenticated || !storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save user wishlist:', e);
    }
  }, [wishlistItems, isAuthenticated, storageKey]);

  // Add / Toggle item in wishlist (authenticated only)
  const toggleWishlist = useCallback((item) => {
    if (!item || !item.id) return;
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  // Remove from wishlist
  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // Clear wishlist
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // Ignore
      }
    }
  }, [storageKey]);

  const isInWishlist = useCallback(
    (id) => {
      if (!isAuthenticated) return false;
      return wishlistItems.some((item) => item.id === id);
    },
    [wishlistItems, isAuthenticated]
  );

  const wishlistCount = isAuthenticated ? wishlistItems.length : 0;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: isAuthenticated ? wishlistItems : [],
        wishlistCount,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
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
      removeFromWishlist: () => {},
      clearWishlist: () => {},
      isInWishlist: () => false,
    };
  }
  return context;
}
