'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowRight, ShoppingBag, Trash2, Lock } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import allProductsData from '@/data/products.json';
import { FadeUp, StaggerReveal } from '@/components/ui/Motion';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated, requireAuth } = useAuth();

  // Enrich stored wishlist items with full product data from products.json
  const enrichedItems = useMemo(() => {
    return wishlistItems.map((item) => {
      const full = allProductsData.find((p) => p.id === item.id);
      if (full) {
        const cleanPrice = typeof full.price === 'number' ? full.price : Number(String(item.price || full.price).replace(/[^0-9.]/g, '')) || 0;
        return {
          ...full,
          ...item,
          id: full.id,
          slug: full.slug || item.slug || full.id,
          productCode: full.productCode || item.productCode || `JJ_${full.id.toUpperCase().replace(/-/g, '')}`,
          price: cleanPrice,
          originalPrice: full.originalPrice || full.mrp,
          discount: full.discount || (full.originalPrice && cleanPrice ? Math.round(((full.originalPrice - cleanPrice) / full.originalPrice) * 100) : null),
          inStock: full.inStock !== false && full.stockQuantity !== 0,
          image: item.image || full.image || (full.images && full.images[0]) || '/images/home/shop-by-category/earrings-category.webp',
        };
      }

      // Fallback for custom or legacy wishlist item
      return {
        id: item.id,
        name: item.name || 'Fine Jewellery Piece',
        slug: item.slug || item.id,
        productCode: item.productCode || `JJ_${String(item.id).toUpperCase().replace(/-/g, '')}`,
        price: item.price,
        originalPrice: item.originalPrice,
        discount: item.discount,
        inStock: item.inStock !== false,
        image: item.image || '/images/home/shop-by-category/earrings-category.webp',
      };
    });
  }, [wishlistItems]);

  const formatPrice = (val) => {
    if (!val) return '';
    if (typeof val === 'string' && val.includes('₹')) return val;
    const num = typeof val === 'number' ? val : Number(String(val).replace(/[^0-9]/g, ''));
    if (isNaN(num)) return val;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    requireAuth({
      action: 'cart',
      product,
      options: {
        purity: product.purity || '22Kt',
        colour: product.colour || 'Yellow Gold',
        quantity: 1,
      },
      onAllowed: () => {
        addToCart(product, {
          purity: product.purity || '22Kt',
          colour: product.colour || 'Yellow Gold',
          quantity: 1,
        });
      },
    });
  };

  return (
    <main className="w-full min-h-[calc(100vh-140px)] bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading in Burgundy matching screenshot */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-burgundy tracking-wide uppercase">
            MY WISHLIST
          </h1>
        </div>

        {!isAuthenticated ? (
          /* Guest Sign-In Required State */
          <FadeUp className="py-16 sm:py-20 text-center rounded-2xl border border-dashed border-[#E8E1D8] bg-[#FAF8F4]/60 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Lock className="w-7 h-7 stroke-[1.6]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
              Sign In to View Your Wishlist
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted mt-2.5 max-w-md mx-auto leading-relaxed">
              Save, view, and organize your favourite BIS hallmarked gold and solitaire diamond jewellery designs by signing in to your account.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signin?redirect=/wishlist"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs hover:scale-105 active:scale-95"
              >
                <span>Sign In to Access Wishlist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/all-jewellery"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#E8E1D8] text-charcoal hover:text-burgundy rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          </FadeUp>
        ) : enrichedItems.length === 0 ? (
          /* Empty Wishlist State */
          <FadeUp className="py-20 text-center rounded-2xl border border-dashed border-[#E8E1D8] bg-[#FAF8F4]/50 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-normal text-charcoal">
              Your Wishlist is Empty
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted mt-2 max-w-md mx-auto leading-relaxed">
              Explore our handcrafted collections of BIS hallmarked gold, solitaire diamonds, and heritage jewellery to save your favourite designs.
            </p>
            <div className="mt-7">
              <Link
                href="/all-jewellery"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs hover:scale-105 active:scale-95"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        ) : (
          /* Wishlist Items List */
          <StaggerReveal className="divide-y divide-[#E8E1D8]" stagger={0.06} distance={16}>
            {enrichedItems.map((product) => {
              const productUrl = `/product/${product.slug}`;
              const displayPrice = formatPrice(product.price);
              const displayOriginalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;
              const hasDiscount = product.discount && product.discount > 0;

              return (
                <div
                  key={product.id}
                  className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  {/* Left Column: Fixed 1:1 Square Image */}
                  <div className="flex items-start gap-5 sm:gap-6 min-w-0 flex-1">
                    <Link
                      href={productUrl}
                      className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 aspect-square bg-[#F7F7F7] rounded-lg overflow-hidden shrink-0 border border-border-soft/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 128px, 176px"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Center Column: Product Details & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1">
                      <div>
                        <Link
                          href={productUrl}
                          className="block font-serif text-base sm:text-lg md:text-xl font-normal text-charcoal hover:text-burgundy transition-colors leading-snug line-clamp-2"
                        >
                          {product.name}
                        </Link>

                        {/* SKU */}
                        <p className="font-sans text-xs text-muted uppercase tracking-wider mt-1.5 font-normal">
                          SKU : {product.productCode}
                        </p>
                      </div>

                      {/* Desktop / Tablet Action Buttons */}
                      <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-dark active:bg-burgundy-dark text-white rounded-xs text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                        </button>

                        {/* Remove from Wishlist Button */}
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="px-5 py-2.5 bg-white border border-burgundy hover:bg-burgundy/5 text-burgundy rounded-xs text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove from WishList</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Availability */}
                  <div className="md:text-right shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-champagne/40 flex md:flex-col items-baseline md:items-end justify-between md:justify-center gap-1">
                    <div>
                      <div className="flex items-baseline md:justify-end gap-2">
                        <span className="font-sans font-bold text-lg sm:text-xl text-charcoal">
                          {displayPrice}
                        </span>
                        {displayOriginalPrice && displayOriginalPrice !== displayPrice && (
                          <span className="font-sans text-xs sm:text-sm text-muted line-through font-normal">
                            {displayOriginalPrice}
                          </span>
                        )}
                      </div>

                      {hasDiscount && (
                        <p className="font-sans text-xs font-semibold text-emerald-700 mt-0.5">
                          {product.discount}% Off on Making Value
                        </p>
                      )}
                    </div>

                    {/* Stock Status Indicator */}
                    <div className="mt-1">
                      {product.inStock ? (
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block text-[11px] font-semibold text-red-600 uppercase tracking-wider">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        )}
      </div>
    </main>
  );
}

