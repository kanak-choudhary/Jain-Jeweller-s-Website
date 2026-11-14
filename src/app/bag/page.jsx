'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Home, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ShoppingBagPage() {
  const router = useRouter();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    cartDiscount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const isBagEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <nav aria-label="Breadcrumb" className="py-3.5 border-b border-champagne/60 bg-ivory/40">
        <div className="container-custom">
          <ol className="flex items-center space-x-2 text-[11px] sm:text-xs text-muted list-none m-0 p-0 uppercase tracking-wider font-sans font-medium">
            <li className="flex items-center">
              <Link href="/" className="flex items-center gap-1 hover:text-burgundy transition-colors">
                <Home className="w-3.5 h-3.5 text-gold" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-border-soft" />
              <span className="text-charcoal font-semibold" aria-current="page">
                Shopping Bag
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Bag Content */}
      <div className="container-custom py-8 sm:py-12 lg:py-16">
        <div className="mb-8 pb-4 border-b border-border-soft/60 flex items-baseline justify-between">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal">
            Shopping Bag
          </h1>
          {!isBagEmpty && (
            <span className="text-xs sm:text-sm text-muted font-sans">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {isBagEmpty ? (
          /* Empty Bag State */
          <div className="py-16 sm:py-24 text-center max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-ivory border border-champagne/60 flex items-center justify-center text-burgundy shadow-inner">
              <ShoppingBag className="w-9 h-9" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                Your Shopping Bag is Empty
              </h2>
              <p className="font-sans text-xs sm:text-sm text-charcoal/70">
                Explore our fine jewellery collections and add your favourite handcrafted pieces.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/all-jewellery"
                className="inline-flex items-center gap-2 py-3 px-6 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Explore All Jewellery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Bag Items & Order Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="divide-y divide-border-soft/60 border-y border-border-soft/60">
                {cartItems.map((item) => {
                  const itemSubtotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
                  const productUrl = `/product/${item.slug || item.productId}`;

                  return (
                    <div
                      key={item.id}
                      className="py-5 sm:py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex gap-4 items-start sm:items-center flex-1">
                        <Link
                          href={productUrl}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-ivory border border-border-soft/60 shrink-0 group"
                        >
                          <Image
                            src={item.image || '/images/home/shop-by-category/earrings-category.webp'}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="space-y-1 text-left">
                          <h3 className="font-serif text-base sm:text-lg font-normal text-charcoal hover:text-burgundy transition-colors line-clamp-1">
                            <Link href={productUrl}>{item.name}</Link>
                          </h3>

                          {/* Selected Variant Attributes */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-sans text-muted">
                            {item.purity && (
                              <span className="px-2 py-0.5 rounded bg-ivory border border-border-soft/50 text-charcoal font-medium">
                                {item.purity}
                              </span>
                            )}
                            {item.colour && (
                              <span className="px-2 py-0.5 rounded bg-ivory border border-border-soft/50 text-charcoal font-medium">
                                {item.colour}
                              </span>
                            )}
                            {item.weight && (
                              <span className="text-muted/80">
                                Weight: {item.weight}
                              </span>
                            )}
                          </div>

                          {/* Unit Price */}
                          <p className="font-serif text-sm text-charcoal pt-0.5">
                            ₹ {Number(item.price).toLocaleString('en-IN')}{' '}
                            <span className="text-xs text-muted font-sans font-normal">/ piece</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-border-soft rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 sm:p-2 text-charcoal hover:bg-ivory hover:text-burgundy transition-colors focus-visible:outline-none"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold text-charcoal min-w-[32px] text-center font-sans">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 sm:p-2 text-charcoal hover:bg-ivory hover:text-burgundy transition-colors focus-visible:outline-none"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item Subtotal & Delete */}
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-base sm:text-lg font-medium text-charcoal">
                            ₹ {itemSubtotal.toLocaleString('en-IN')}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="p-1.5 text-muted hover:text-red-600 transition-colors rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/all-jewellery"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-dark transition-colors"
                >
                  <span>&larr; Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-[#FAF8F4] border border-champagne/60 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <h2 className="font-serif text-lg sm:text-xl font-normal text-charcoal pb-3 border-b border-champagne/60">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm font-sans text-charcoal/80">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium text-charcoal">
                      ₹ {cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Promotional Savings</span>
                      <span className="font-medium">
                        - ₹ {cartDiscount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Insured Delivery</span>
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider text-xs">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Applicable Taxes (GST 3%)</span>
                    <span className="text-muted text-xs">Included</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-champagne/60 flex justify-between items-baseline">
                  <span className="font-serif text-base sm:text-lg font-medium text-charcoal">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-semibold text-burgundy">
                    ₹ {cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Proceed to Checkout CTA */}
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  className="w-full py-3.5 px-6 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-xs hover:shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Security Assurances */}
                <div className="pt-3 border-t border-champagne/40 space-y-2 text-[11px] text-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>100% Genuine BIS Hallmarked Jewellery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Free Insured Doorstep Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
