'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'jj_cart_items';
const BUY_NOW_STORAGE_KEY = 'jj_buy_now_item';

// Helper to safely parse numeric prices (handles numbers and currency strings like "₹ 1,25,000")
const parseNumericPrice = (val) => {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  return Number(cleaned) || 0;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, idx) => ({
            ...item,
            id: item.id || `item-${item.productId || idx}-${Date.now()}`,
            price: parseNumericPrice(item.price),
            mrp: parseNumericPrice(item.mrp || item.originalPrice) || parseNumericPrice(item.price),
            quantity: Math.max(1, Number(item.quantity) || 1),
          }));
        }
      }
    } catch (e) {
      console.error('Failed to load shopping bag from storage:', e);
    }
    return [];
  });

  const [directCheckoutItem, setDirectCheckoutItemState] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const storedBuyNow = sessionStorage.getItem(BUY_NOW_STORAGE_KEY);
      return storedBuyNow ? JSON.parse(storedBuyNow) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState({ message: '', visible: false });
  const isLoaded = true;

  // 1. Persist to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save shopping bag to storage:', e);
    }
  }, [cartItems]);

  // 2. Sync with external tab changes
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setCartItems(parsed);
          }
        } catch {
          // Ignore parse errors
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Toast notification helper
  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    const timer = setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', visible: false });
  }, []);

  // Add to Bag: Guarantees every product added is preserved one by one
  const addToCart = useCallback((product, options = {}) => {
    const purity = options.purity || product.purity || '22Kt';
    const colour = options.colour || product.colour || 'Yellow Gold';
    const weight = options.weight || product.weight || '6.46g';
    const quantityToAdd = Math.max(1, Number(options.quantity) || 1);

    const cleanPrice = parseNumericPrice(product.price);
    const cleanMrp = parseNumericPrice(product.mrp || product.originalPrice) || cleanPrice;
    const productId = product.id || product.slug || `prod-${Date.now()}`;
    const itemKey = `${productId}-${purity}-${colour}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        // If identical product variant already exists, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (Number(updated[existingIndex].quantity) || 1) + quantityToAdd,
          price: cleanPrice || updated[existingIndex].price,
          mrp: cleanMrp || updated[existingIndex].mrp,
        };
        return updated;
      }

      // Otherwise, add as a new distinct row
      const newItem = {
        id: itemKey,
        productId,
        slug: product.slug || String(productId),
        productCode: product.productCode || `JJ_${String(productId).toUpperCase().replace(/-/g, '')}`,
        name: product.name || 'Fine Jewellery Piece',
        price: cleanPrice,
        mrp: cleanMrp,
        quantity: quantityToAdd,
        image: product.image || (product.images && product.images[0]) || '/images/home/shop-by-category/earrings-category.webp',
        purity,
        colour,
        weight,
        stockStatus: product.stockStatus || 'In Stock',
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.name || 'Jewellery'}" to your Shopping Bag`);
  }, [showToast]);

  // Remove from Bag
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Update quantity
  const updateQuantity = useCallback((id, quantity) => {
    const qty = Number(quantity);
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }, [removeFromCart]);

  // Clear Bag
  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Direct Checkout (Buy Now)
  const setBuyNowItem = useCallback((product, options = {}) => {
    const purity = options.purity || product.purity || '22Kt';
    const colour = options.colour || product.colour || 'Yellow Gold';
    const weight = options.weight || product.weight || '6.46g';
    const quantity = Math.max(1, Number(options.quantity) || 1);

    const cleanPrice = parseNumericPrice(product.price);
    const cleanMrp = parseNumericPrice(product.mrp || product.originalPrice) || cleanPrice;
    const productId = product.id || product.slug || `prod-${Date.now()}`;
    const itemKey = `buynow-${productId}-${purity}-${colour}`;

    const buyNowItem = {
      id: itemKey,
      productId,
      slug: product.slug || String(productId),
      productCode: product.productCode || `JJ_${String(productId).toUpperCase().replace(/-/g, '')}`,
      name: product.name || 'Fine Jewellery Piece',
      price: cleanPrice,
      mrp: cleanMrp,
      quantity,
      image: product.image || (product.images && product.images[0]) || '/images/home/shop-by-category/earrings-category.webp',
      purity,
      colour,
      weight,
      stockStatus: product.stockStatus || 'In Stock',
    };

    setDirectCheckoutItemState(buyNowItem);
    try {
      sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(buyNowItem));
    } catch {
      // Ignore
    }
    return buyNowItem;
  }, []);

  const clearBuyNowItem = useCallback(() => {
    setDirectCheckoutItemState(null);
    try {
      sessionStorage.removeItem(BUY_NOW_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Totals calculated dynamically from all items
  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (parseNumericPrice(item.price)) * (Number(item.quantity) || 1),
    0
  );
  const cartMrpTotal = cartItems.reduce(
    (acc, item) => acc + (parseNumericPrice(item.mrp || item.price)) * (Number(item.quantity) || 1),
    0
  );
  const cartDiscount = cartMrpTotal > cartSubtotal ? cartMrpTotal - cartSubtotal : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartDiscount,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        directCheckoutItem,
        setBuyNowItem,
        clearBuyNowItem,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}

      {/* Global Shopping Bag Toast Confirmation */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
          <div className="bg-charcoal text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-champagne/20 text-xs sm:text-sm font-sans font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      cartCount: 0,
      cartSubtotal: 0,
      cartMrpTotal: 0,
      cartDiscount: 0,
      isLoaded: true,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      directCheckoutItem: null,
      setBuyNowItem: () => {},
      clearBuyNowItem: () => {},
      toast: { message: '', visible: false },
      showToast: () => {},
      hideToast: () => {},
    };
  }
  return context;
}
