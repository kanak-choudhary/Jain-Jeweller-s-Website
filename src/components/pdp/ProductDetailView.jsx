'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Award,
  ChevronRight,
  Home,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailView({ product }) {
  const router = useRouter();
  const { addToCart, setBuyNowItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Gallery state
  const images = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) {
      return [product.image];
    }
    return ['/images/home/shop-by-category/earrings-category.webp'];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selection states
  const availablePurities = product.availableVariants?.purities || [product.purity || '22Kt'];
  const [selectedPurity, setSelectedPurity] = useState(product.purity || availablePurities[0]);

  const availableColours = product.availableVariants?.colours || [product.colour || 'Yellow Gold'];
  const [selectedColour, setSelectedColour] = useState(product.colour || availableColours[0]);

  const availableWeights = product.availableVariants?.weights || [product.weight || '6.461g'];
  const [selectedWeight, setSelectedWeight] = useState(product.weight || availableWeights[0]);

  // Dynamic price adjustment based on Karat selection
  const { currentPrice, currentMrp } = useMemo(() => {
    let basePrice = Number(product.price) || 0;
    let baseMrp = Number(product.mrp || product.originalPrice) || Math.round(basePrice * 1.08);

    if (selectedPurity === '18Kt' && (product.purity === '22Kt' || product.purity === '24Kt')) {
      basePrice = Math.round(basePrice * 0.82);
      baseMrp = Math.round(baseMrp * 0.82);
    } else if (selectedPurity === '14Kt') {
      basePrice = Math.round(basePrice * 0.65);
      baseMrp = Math.round(baseMrp * 0.65);
    }

    return { currentPrice: basePrice, currentMrp: baseMrp };
  }, [product, selectedPurity]);

  // Wishlist state
  const isWishlisted = isInWishlist(product.id);
  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: `₹ ${currentPrice.toLocaleString('en-IN')}`,
      image: images[0],
    });
  };

  // Stock status
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;
  const stockText = isOutOfStock
    ? 'Out of Stock'
    : product.stockQuantity === 1
    ? 'In Stock - only 1 left'
    : product.stockQuantity <= 3
    ? `In Stock - only ${product.stockQuantity} left`
    : 'In Stock';

  // Add to Bag action
  const handleAddToBag = () => {
    if (isOutOfStock) return;
    addToCart(
      {
        ...product,
        price: currentPrice,
        mrp: currentMrp,
        image: images[activeImageIndex] || images[0],
      },
      {
        purity: selectedPurity,
        colour: selectedColour,
        weight: selectedWeight,
        quantity: 1,
      }
    );
  };

  // Buy Now action (direct to checkout, preserving bag)
  const handleBuyNow = () => {
    if (isOutOfStock) return;
    setBuyNowItem(
      {
        ...product,
        price: currentPrice,
        mrp: currentMrp,
        image: images[activeImageIndex] || images[0],
      },
      {
        purity: selectedPurity,
        colour: selectedColour,
        weight: selectedWeight,
        quantity: 1,
      }
    );
    router.push('/checkout?buyNow=true');
  };

  // Colour dot styling helper
  const getColourDot = (col) => {
    const c = (col || '').toLowerCase();
    if (c.includes('yellow') || c.includes('gold')) return 'bg-[#E5B842]';
    if (c.includes('rose')) return 'bg-[#B76E79]';
    if (c.includes('white')) return 'bg-[#E8E8E8] border border-charcoal/20';
    if (c.includes('silver')) return 'bg-[#C0C0C0]';
    return 'bg-[#D99506]';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-3.5 border-b border-champagne/60 bg-ivory/40">
        <div className="container-custom">
          <ol className="flex items-center space-x-2 text-[11px] sm:text-xs text-muted list-none m-0 p-0 overflow-x-auto uppercase tracking-wider font-sans font-medium">
            <li className="flex items-center">
              <Link href="/" className="flex items-center gap-1 hover:text-burgundy transition-colors">
                <Home className="w-3.5 h-3.5 text-gold" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-border-soft" />
              <Link href="/all-jewellery" className="hover:text-burgundy transition-colors">
                All Jewellery
              </Link>
            </li>
            {product.categoryName && (
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-border-soft" />
                <Link
                  href={`/all-jewellery?category=${product.category}`}
                  className="hover:text-burgundy transition-colors"
                >
                  {product.categoryName}
                </Link>
              </li>
            )}
            {product.metalName && (
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-border-soft" />
                <Link
                  href={`/all-jewellery?metal=${product.metal}`}
                  className="hover:text-burgundy transition-colors"
                >
                  {product.metalName}
                </Link>
              </li>
            )}
            <li className="flex items-center space-x-2 truncate">
              <ChevronRight className="w-3 h-3 text-border-soft shrink-0" />
              <span className="text-charcoal font-semibold truncate" aria-current="page">
                {product.name}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Main Two-Column PDP Section */}
      <div className="container-custom py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT: Product Image Gallery */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Primary Main Image Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-xl mx-auto rounded-2xl overflow-hidden bg-white border border-border-soft/70 shadow-xs flex items-center justify-center group">
              {/* Top-Right Favorite Icon */}
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-border-soft/60 shadow-xs flex items-center justify-center text-charcoal hover:text-burgundy hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted ? 'fill-burgundy text-burgundy' : 'text-charcoal/70'
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Main Image with pure high-res presentation */}
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-4 sm:p-8 transition-transform duration-500 group-hover:scale-103"
              />
            </div>

            {/* Gallery Thumbnails (if multiple images exist) */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5 overflow-x-auto max-w-full pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View product image ${idx + 1}`}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      activeImageIndex === idx
                        ? 'border-burgundy ring-2 ring-burgundy/20 shadow-xs'
                        : 'border-border-soft/70 hover:border-charcoal/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information (Strict Order) */}
          <div className="lg:col-span-5 flex flex-col space-y-5 text-left max-w-lg">
            {/* 1. Product Code */}
            <div>
              <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium">
                PRODUCT CODE: {product.productCode || '539118'}
              </span>
            </div>

            {/* 2. Product Name */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-charcoal tracking-normal leading-tight">
              {product.name}
            </h1>

            {/* 3. Selling Price & 4. MRP with Strikethrough */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-charcoal tracking-tight">
                  ₹ {currentPrice.toLocaleString('en-IN')}
                </span>

                {currentMrp > currentPrice && (
                  <span className="font-sans text-sm sm:text-base text-muted line-through font-light">
                    MRP: ₹ {currentMrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted/80 font-sans">
                (Prices are inclusive of all taxes)
              </p>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-champagne/30 text-charcoal text-xs rounded-md font-sans">
                  <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                  Free shipping across India
                </span>
              </div>
            </div>

            <hr className="border-t border-border-soft/60 my-1" />

            {/* 5. Karat / Purity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block font-sans">
                KARAT
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availablePurities.map((purity) => {
                  const isSelected = selectedPurity === purity;
                  return (
                    <button
                      key={purity}
                      type="button"
                      onClick={() => setSelectedPurity(purity)}
                      className={`py-2 px-4 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isSelected
                          ? 'border-charcoal bg-charcoal text-white shadow-xs'
                          : 'border-border-soft bg-white text-charcoal hover:border-charcoal/60'
                      }`}
                    >
                      {purity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Colour Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block font-sans">
                COLOR
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableColours.map((colour) => {
                  const isSelected = selectedColour === colour;
                  return (
                    <button
                      key={colour}
                      type="button"
                      onClick={() => setSelectedColour(colour)}
                      className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs font-medium tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isSelected
                          ? 'border-charcoal bg-ivory text-charcoal font-semibold ring-1 ring-charcoal/20 shadow-xs'
                          : 'border-border-soft bg-white text-charcoal hover:border-charcoal/60'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full shrink-0 ${getColourDot(colour)}`} />
                      <span>{colour}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-burgundy ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Weight Selector / Display */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block font-sans">
                WEIGHT
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableWeights.map((w) => {
                  const isSelected = selectedWeight === w;
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`py-2 px-4 rounded-lg text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isSelected
                          ? 'border-charcoal bg-ivory text-charcoal font-semibold ring-1 ring-charcoal/20 shadow-xs'
                          : 'border-border-soft bg-white text-charcoal hover:border-charcoal/60'
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8. Stock Availability */}
            <div className="pt-1 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isOutOfStock ? 'bg-red-500' : 'bg-emerald-600 animate-pulse'
                }`}
              />
              <span
                className={`text-xs sm:text-[13px] font-sans font-medium ${
                  isOutOfStock ? 'text-red-600' : 'text-emerald-700'
                }`}
              >
                {stockText}
              </span>
            </div>

            {/* 9. Add to Bag & 10. Buy Now Action Buttons */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={isOutOfStock}
                className={`w-full py-3.5 px-5 rounded-lg border-2 border-burgundy text-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isOutOfStock
                    ? 'opacity-50 cursor-not-allowed border-muted text-muted'
                    : 'hover:bg-burgundy hover:text-white shadow-xs hover:shadow-md'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`w-full py-3.5 px-5 rounded-lg bg-burgundy text-white font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isOutOfStock
                    ? 'opacity-50 cursor-not-allowed bg-muted'
                    : 'hover:bg-burgundy-dark shadow-xs hover:shadow-md'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Subtle Brand Assurances */}
            <div className="pt-6 border-t border-border-soft/60 grid grid-cols-3 gap-3 text-center text-charcoal/80">
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-ivory/50">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-[11px] font-medium leading-tight">100% BIS Hallmarked</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-ivory/50">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[11px] font-medium leading-tight">Certified Genuine</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-ivory/50">
                <Truck className="w-4 h-4 text-gold" />
                <span className="text-[11px] font-medium leading-tight">Insured Transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
