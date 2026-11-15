'use client';

import { X, ShieldCheck, FileText } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, policyType = 'terms' }) {
  if (!isOpen) return null;

  const isTerms = policyType === 'terms';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border-soft p-6 sm:p-8 relative max-h-[85vh] flex flex-col animate-modal">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-champagne/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center">
              {isTerms ? <FileText className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <h3
                id="policy-modal-title"
                className="font-serif text-lg sm:text-xl font-normal text-charcoal"
              >
                {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
              </h3>
              <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
                Jain Jewellers Trust &amp; Transparency
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-muted hover:text-charcoal hover:bg-ivory rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed pr-2">
          {isTerms ? (
            <>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">1. Authenticity &amp; Hallmarking</h4>
                <p>
                  Every piece of fine gold jewellery at Jain Jewellers is 100% BIS Hallmarked (22KT/18KT), and solitaire diamonds are accompanied by accredited gemological certificates (IGI / GIA).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">2. Orders &amp; Secure Payments</h4>
                <p>
                  All transactions are encrypted and processed through certified banking gateways. Prices are updated transparently in accordance with live bullion market rates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">3. Insured Delivery &amp; Tamper-Proof Packaging</h4>
                <p>
                  Shipments are fully insured until handover with recipient OTP verification for complete peace of mind.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">4. Lifetime Exchange &amp; Buyback</h4>
                <p>
                  Enjoy lifelong exchange and transparent valuation across all authorized Jain Jewellers luxury showrooms nationwide.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">1. Information We Collect</h4>
                <p>
                  We collect your contact information (name, phone, email, and shipping address) strictly to fulfill your orders, provide invoice records, and service warranty certificates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">2. Zero Third-Party Sale Policy</h4>
                <p>
                  Jain Jewellers strictly guarantees that your personal contact details are never rented, sold, or shared with third-party advertisers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">3. Communication Preferences</h4>
                <p>
                  Promotional WhatsApp, SMS, or email announcements regarding seasonal bridal showcases or festive previews can be opted out at any time from your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">4. Data Security</h4>
                <p>
                  We adhere to industry-standard data encryption standards and access controls to safeguard customer confidentiality.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-champagne/60 shrink-0 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-semibold rounded-md transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

