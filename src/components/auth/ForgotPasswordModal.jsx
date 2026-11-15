'use client';

import { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose, defaultIdentifier = '' }) {
  const [identifier, setIdentifier] = useState(defaultIdentifier);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your registered email or phone number');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Mock network delay
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border-soft p-6 sm:p-7 relative overflow-hidden animate-modal">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-muted hover:text-charcoal hover:bg-ivory rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          <div>
            <div className="w-11 h-11 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>

            <h3
              id="forgot-password-title"
              className="font-serif text-xl sm:text-2xl font-normal text-burgundy tracking-tight"
            >
              Reset Your Password
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              Enter your registered phone number or email address, and we will send you a secure link to reset your account credentials.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                  Phone or Email Address
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter phone or email"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#D5D0C7] text-charcoal font-sans text-sm focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy"
                />
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-medium text-muted hover:text-charcoal transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs flex items-center gap-2 transition-colors disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
              Reset Link Sent!
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted mt-2 max-w-sm mx-auto leading-relaxed">
              We have dispatched a secure password reset link to <strong className="text-charcoal font-medium">{identifier}</strong>. Please check your inbox or SMS.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-md text-xs sm:text-sm font-semibold transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

