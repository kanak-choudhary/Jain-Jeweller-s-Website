'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Smartphone, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function OtpModal({ isOpen, onClose, defaultIdentifier = '' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithOtp } = useAuth();

  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      await loginWithOtp({
        identifier: defaultIdentifier || '+91 98765 43210',
        otp: otp.join(''),
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        const redirectUrl = searchParams.get('redirect') || '/';
        router.push(redirectUrl);
      }, 700);
    } catch (err) {
      console.error('OTP login failed:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="otp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border-soft p-6 sm:p-7 relative overflow-hidden animate-modal">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-muted hover:text-charcoal hover:bg-ivory rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="w-11 h-11 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>

            <h3
              id="otp-modal-title"
              className="font-serif text-xl sm:text-2xl font-normal text-burgundy tracking-tight"
            >
              Sign In with OTP
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              We sent a 6-digit one-time password to{' '}
              <strong className="text-charcoal font-medium">
                {defaultIdentifier || 'your registered phone/email'}
              </strong>
            </p>

            <form onSubmit={handleVerify} className="mt-6 space-y-5">
              {/* 6 Digit Inputs */}
              <div className="flex items-center justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-lg font-bold font-mono text-charcoal border border-[#D5D0C7] rounded-lg bg-[#FAF8F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy transition-all"
                  />
                ))}
              </div>

              {/* Resend Action */}
              <div className="flex items-center justify-between text-xs text-muted pt-1">
                <span>Didn&apos;t receive OTP?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`font-semibold ${
                    timer > 0
                      ? 'text-muted cursor-not-allowed'
                      : 'text-burgundy hover:underline cursor-pointer'
                  }`}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying || otp.join('').length < 6}
                  className="w-full py-3 bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
              OTP Verified!
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted mt-1">
              Signing you in to Jain Jewellers...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
