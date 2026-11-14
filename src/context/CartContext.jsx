'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'jj_cart_items';
const BUY_NOW_STORAGE_KEY = 'jj_buy_now_item';

const DEFAULT_ITEMS = [
  {
    id: 'jj-ear-001-22Kt-Yellow Gold',
    productId: 'jj-ear-001',
    slug: 'heritage-polki-pearl-chandelier-earrings',
    productCode: '539118',
    name: 'Heritage Polki & Pearl Chandelier Earrings',
    price: 125000,
    mrp: 138000,
    quantity: 1,
    image: '/images/home/shop-by-category/earrings-category.webp',
    purity: '22Kt',
    colour: 'Yellow Gold',
    weight: '6.461g',
  },
];

export function CartProvider({ children }) {
  // Use lazy initializer to read from localStorage without cascading renders
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ITEMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });

  const [directCheckoutItem, setDirectCheckoutItemState] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem(BUY_NOW_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState({ message: '', visible: false });

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  // Toast notification helper
  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3200);
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', visible: false });
  }, []);

  // Add to Bag
  const addToCart = useCallback((product, options = {}) => {
    const purity = options.purity || product.purity || '22Kt';
    const colour = options.colour || product.colour || 'Yellow Gold';
    const weight = options.weight || product.weight || '6.46g';
    const quantityToAdd = Number(options.quantity) || 1;
    const itemKey = `${product.id}-${purity}-${colour}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
        };
        return updated;
      }

      const newItem = {
        id: itemKey,
        productId: product.id,
        slug: product.slug,
        productCode: product.productCode || '539118',
        name: product.name,
        price: Number(product.price) || 0,
        mrp: Number(product.mrp || product.originalPrice) || Number(product.price) || 0,
        quantity: quantityToAdd,
        image: product.image || (product.images && product.images[0]) || '/images/home/shop-by-category/earrings-category.webp',
        purity,
        colour,
        weight,
        stockStatus: product.stockStatus || 'In Stock',
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.name}" to your Shopping Bag`);
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
    const quantity = Number(options.quantity) || 1;
    const itemKey = `buynow-${product.id}-${purity}-${colour}`;

    const buyNowItem = {
      id: itemKey,
      productId: product.id,
      slug: product.slug,
      productCode: product.productCode || '539118',
      name: product.name,
      price: Number(product.price) || 0,
      mrp: Number(product.mrp || product.originalPrice) || Number(product.price) || 0,
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

  // Totals
  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const cartMrpTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.mrp || item.price) || 0) * (Number(item.quantity) || 1),
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
