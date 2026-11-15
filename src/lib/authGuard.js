'use client';

export const PENDING_ACTION_STORAGE_KEY = 'jj_pending_auth_action';

/**
 * Save a pending shopping action before redirecting to sign in
 */
export function savePendingAction(actionData) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(PENDING_ACTION_STORAGE_KEY, JSON.stringify(actionData));
  } catch (e) {
    console.error('Failed to save pending action:', e);
  }
}

/**
 * Retrieve the pending shopping action
 */
export function getPendingAction() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(PENDING_ACTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to read pending action:', e);
    return null;
  }
}

/**
 * Clear any pending shopping action
 */
export function clearPendingAction() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(PENDING_ACTION_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Executes a pending shopping action once login or registration succeeds.
 * Clears the stored action immediately so it is executed strictly once.
 */
export function executePendingAction({
  addToCart,
  setBuyNowItem,
  toggleWishlist,
  router,
  defaultRedirect = '/',
}) {
  const pending = getPendingAction();
  if (!pending) {
    router.push(defaultRedirect);
    return;
  }

  // Clear immediately to prevent multiple execution
  clearPendingAction();

  try {
    if (pending.action === 'wishlist' && toggleWishlist && pending.product) {
      toggleWishlist(pending.product);
      router.push(pending.returnUrl || defaultRedirect);
    } else if (pending.action === 'cart' && addToCart && pending.product) {
      addToCart(pending.product, pending.options || {});
      router.push(pending.returnUrl || defaultRedirect);
    } else if (pending.action === 'buynow' && setBuyNowItem && pending.product) {
      setBuyNowItem(pending.product, pending.options || {});
      router.push('/checkout?buyNow=true');
    } else {
      router.push(pending.returnUrl || defaultRedirect);
    }
  } catch (err) {
    console.error('Failed to execute pending action:', err);
    router.push(pending.returnUrl || defaultRedirect);
  }
}

