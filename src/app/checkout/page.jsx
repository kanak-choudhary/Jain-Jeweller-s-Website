'use client';

import { Suspense, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Banknote,
  Home,
  ChevronRight,
  ArrowRight,
  Lock,
  Download,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateInvoicePdf } from '@/utils/generateInvoicePdf';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get('buyNow') === 'true';

  const {
    cartItems,
    cartDiscount,
    clearCart,
    directCheckoutItem,
    clearBuyNowItem,
  } = useCart();

  // Determine items being purchased
  const checkoutItems = useMemo(() => {
    if (isBuyNow && directCheckoutItem) {
      return [directCheckoutItem];
    }
    return cartItems;
  }, [isBuyNow, directCheckoutItem, cartItems]);

  // Totals for current checkout items
  const subtotal = useMemo(() => {
    return checkoutItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [checkoutItems]);

  const discount = useMemo(() => {
    if (isBuyNow && directCheckoutItem) {
      const mrp = Number(directCheckoutItem.mrp) || Number(directCheckoutItem.price);
      return mrp > directCheckoutItem.price
        ? (mrp - directCheckoutItem.price) * (directCheckoutItem.quantity || 1)
        : 0;
    }
    return cartDiscount;
  }, [isBuyNow, directCheckoutItem, cartDiscount]);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    pinCode: '',
    state: '',
    city: '',
    address: '',
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.pinCode.trim() || !/^\d{6}$/.test(formData.pinCode.trim())) {
      errors.pinCode = 'Enter a valid 6-digit PIN code';
    }
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.address.trim()) errors.address = 'House/Street address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Place Order submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (checkoutItems.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `JJ-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const orderData = {
        orderId,
        orderDate,
        items: checkoutItems,
        subtotal,
        discount,
        total: subtotal,
        customer: { ...formData },
        paymentMethod: formData.paymentMethod,
        isBuyNow,
      };

      setConfirmedOrder(orderData);
      setIsSubmitting(false);

      // Clean up state
      if (isBuyNow) {
        clearBuyNowItem();
      } else {
        clearCart();
      }
    }, 700);
  };

  // 1. Order Confirmation View (Success State)
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-[#FAF8F4] border border-champagne/60 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm text-center space-y-8 animate-in fade-in duration-300">
            {/* Success Icon & Header */}
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal">
                Thank You for Your Order!
              </h1>
              <p className="font-sans text-xs sm:text-sm text-charcoal/75 max-w-md mx-auto">
                Your order has been received and is being prepared with imperial craftsmanship.
              </p>
            </div>

            {/* Order Reference Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border-soft/60 grid grid-cols-2 sm:grid-cols-5 gap-4 text-left text-xs font-sans">
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Order ID</span>
                <span className="font-semibold text-burgundy font-mono text-sm">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Order Status</span>
                <span className="font-medium text-emerald-700 flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Confirmed
                </span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Date</span>
                <span className="font-medium text-charcoal">{confirmedOrder.orderDate}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Payment</span>
                <span className="font-medium text-charcoal uppercase">{confirmedOrder.paymentMethod}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Final Amount</span>
                <span className="font-serif font-semibold text-charcoal text-sm">
                  ₹ {confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery Address Summary */}
            <div className="text-left bg-white rounded-2xl p-5 sm:p-6 border border-border-soft/60 space-y-1 text-xs sm:text-sm font-sans">
              <span className="text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                Delivering to:
              </span>
              <p className="font-semibold text-charcoal">{confirmedOrder.customer.fullName}</p>
              <p className="text-charcoal/80">{confirmedOrder.customer.address}</p>
              <p className="text-charcoal/80">
                {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pinCode}
              </p>
              <p className="text-charcoal/80">
                Mobile: {confirmedOrder.customer.mobile} | Email: {confirmedOrder.customer.email}
              </p>
            </div>

            {/* Ordered Items List */}
            <div className="text-left space-y-3">
              <span className="text-xs uppercase tracking-wider text-muted font-semibold font-sans block">
                Ordered Items ({confirmedOrder.items.length})
              </span>
              <div className="divide-y divide-border-soft/60 border-y border-border-soft/60 bg-white rounded-2xl overflow-hidden px-5">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-ivory shrink-0 border border-border-soft/50">
                        <Image
                          src={item.image || '/images/home/shop-by-category/earrings-category.webp'}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-charcoal">{item.name}</p>
                        <p className="text-muted text-[11px]">
                          {item.purity} • {item.colour} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-serif font-medium text-charcoal">
                      ₹ {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Download Invoice & Continue Shopping */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => generateInvoicePdf(confirmedOrder)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>

              <Link
                href="/all-jewellery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty Checkout State
  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 sm:py-24 text-center">
        <div className="container-custom max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-ivory border border-champagne/60 flex items-center justify-center text-burgundy shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-normal text-charcoal">
            No Items Ready for Checkout
          </h1>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70">
            Please add items to your shopping bag or select Buy Now on a product page.
          </p>
          <div className="pt-2">
            <Link
              href="/all-jewellery"
              className="inline-flex items-center gap-2 py-3 px-6 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Explore All Jewellery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Main Checkout Form & Summary
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
              <Link href="/bag" className="hover:text-burgundy transition-colors">
                Bag
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-border-soft" />
              <span className="text-charcoal font-semibold" aria-current="page">
                Checkout
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container-custom py-8 sm:py-12 lg:py-16">
        <div className="mb-8 pb-4 border-b border-border-soft/60">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal">
            Checkout
          </h1>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-1">
            {isBuyNow ? 'Direct Purchase Checkout' : 'Complete your royal jewellery purchase.'}
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* LEFT COLUMN: Delivery & Payment Information (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Delivery Address Section */}
              <div className="bg-[#FAF8F4]/60 border border-border-soft/70 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-border-soft/60">
                  <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-normal text-charcoal">
                    Delivery Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Radhika Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.fullName ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      maxLength={10}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.mobile ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.mobile && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.mobile}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="radhika@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.email ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.email}</p>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="6 digits PIN"
                      maxLength={6}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.pinCode ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.pinCode && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.pinCode}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.city ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Rajasthan"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.state ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.state && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.state}</p>
                    )}
                  </div>

                  {/* House / Street Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 block mb-1 font-sans">
                      House / Flat / Street Address *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Flat 402, Royal Residency, MI Road"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        formErrors.address ? 'border-red-500' : 'border-border-soft'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-red-600 mt-1 font-sans">{formErrors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Section (Mock Selector) */}
              <div className="bg-[#FAF8F4]/60 border border-border-soft/70 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-border-soft/60">
                  <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-normal text-charcoal">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-burgundy bg-white shadow-xs ring-1 ring-burgundy/20'
                        : 'border-border-soft bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="mt-1 text-burgundy focus:ring-gold"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-burgundy" />
                        <span className="text-xs sm:text-sm font-semibold text-charcoal font-sans">
                          Instant UPI (GPay, PhonePe, Paytm, QR)
                        </span>
                      </div>
                      <p className="text-[11px] text-muted font-sans">
                        Zero transaction fees. Instant verified settlement.
                      </p>
                    </div>
                  </label>

                  {/* Credit / Debit Card Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-burgundy bg-white shadow-xs ring-1 ring-burgundy/20'
                        : 'border-border-soft bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mt-1 text-burgundy focus:ring-gold"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-burgundy" />
                        <span className="text-xs sm:text-sm font-semibold text-charcoal font-sans">
                          Credit / Debit Card (Visa, MasterCard, RuPay)
                        </span>
                      </div>
                      <p className="text-[11px] text-muted font-sans">
                        256-Bit SSL encrypted secure payment.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-burgundy bg-white shadow-xs ring-1 ring-burgundy/20'
                        : 'border-border-soft bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 text-burgundy focus:ring-gold"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-burgundy" />
                        <span className="text-xs sm:text-sm font-semibold text-charcoal font-sans">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-[11px] text-muted font-sans">
                        Pay upon doorstep verification and receipt.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order (5 cols) */}
            <div className="lg:col-span-5 sticky top-28 space-y-5">
              <div className="bg-[#FAF8F4] border border-champagne/60 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs text-left">
                <h2 className="font-serif text-lg sm:text-xl font-normal text-charcoal pb-3 border-b border-champagne/60">
                  Order Summary ({checkoutItems.length} {checkoutItems.length === 1 ? 'item' : 'items'})
                </h2>

                {/* Items preview list */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-border-soft/40">
                  {checkoutItems.map((item, idx) => (
                    <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-border-soft/60">
                          <Image
                            src={item.image || '/images/home/shop-by-category/earrings-category.webp'}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-medium text-charcoal line-clamp-1">{item.name}</p>
                          <p className="text-muted text-[11px]">
                            {item.purity} • {item.colour} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-serif font-medium text-charcoal whitespace-nowrap">
                        ₹ {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Calculations */}
                <div className="space-y-2.5 pt-3 border-t border-champagne/60 text-xs sm:text-sm font-sans text-charcoal/80">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal">
                      ₹ {subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Savings</span>
                      <span className="font-medium">- ₹ {discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Insured Delivery</span>
                    <span className="text-emerald-700 font-semibold uppercase text-xs">FREE</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-champagne/60 flex justify-between items-baseline">
                  <span className="font-serif text-base sm:text-lg font-medium text-charcoal">
                    Final Total
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-semibold text-burgundy">
                    ₹ {subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Place Order Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order (₹ {subtotal.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust Assurances */}
                <div className="pt-3 border-t border-champagne/40 space-y-2 text-[11px] text-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Safe & Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Tamper-Proof Insured Transit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function CheckoutLoadingFallback() {
  return (
    <div className="min-h-screen bg-white py-16 text-center">
      <div className="container-custom max-w-md mx-auto space-y-3">
        <div className="w-12 h-12 border-3 border-burgundy border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs uppercase tracking-wider text-muted font-sans font-medium">
          Loading Checkout...
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
