'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal';
import OtpModal from '@/components/auth/OtpModal';
import PolicyModal from '@/components/auth/PolicyModal';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // Form states
  const [identifier, setIdentifier] = useState('choudharykanak.2005@gmail.com');
  const [password, setPassword] = useState('•••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Modals
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState({ isOpen: false, type: 'terms' });

  // Validation
  const validateForm = () => {
    const nextErrors = {};
    const trimmedId = identifier.trim();

    if (!trimmedId) {
      nextErrors.identifier = 'Please enter your phone number or email address';
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedId);
      const isPhone = /^[0-9+\s-]{8,15}$/.test(trimmedId);
      if (!isEmail && !isPhone) {
        nextErrors.identifier = 'Please enter a valid email address or phone number';
      }
    }

    if (!password) {
      nextErrors.password = 'Please enter your password';
    } else if (password.length < 6 && password !== '•••••••••••••') {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login({
        identifier: identifier.trim(),
        password,
      });
      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    } catch (err) {
      console.error('Sign in failed:', err);
      setErrors({ form: 'Invalid credentials. Please try again or request OTP.' });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-140px)] bg-[#FAF8F4] flex flex-col justify-center items-center py-10 sm:py-16 px-4 sm:px-6">
      {/* Central Sign In Card Matching Screenshot 1 */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-burgundy/5 border border-border-soft p-6 sm:p-8 relative animate-modal">
        {/* Heading in Playfair Display serif */}
        <h1 className="font-serif text-2xl sm:text-[27px] font-normal text-burgundy tracking-tight text-left leading-tight">
          Sign In Already Registered User
        </h1>

        {/* General Form Error Banner */}
        {errors.form && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {/* Field 1: Enter Phone/Email * */}
          <div>
            <label
              htmlFor="signin-identifier"
              className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
            >
              Enter Phone/Email *
            </label>
            <input
              id="signin-identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: '' }));
              }}
              placeholder="Enter phone or email"
              className={`w-full px-3.5 py-3 rounded-md border text-charcoal font-sans text-sm transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                errors.identifier
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-[#D5D0C7] bg-[#F4F7FC]'
              }`}
            />
            {errors.identifier && (
              <p className="font-sans text-xs text-red-600 mt-1">{errors.identifier}</p>
            )}
          </div>

          {/* Field 2: Password */}
          <div>
            <label
              htmlFor="signin-password"
              className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                placeholder="Enter password"
                className={`w-full px-3.5 py-3 pr-11 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                  errors.password ? 'border-red-500 bg-red-50/30' : 'border-[#D5D0C7]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/70 hover:text-charcoal p-1 transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" strokeWidth={1.75} />
                ) : (
                  <EyeOff className="w-5 h-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="font-sans text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Terms & Privacy Note */}
          <p className="font-sans text-xs text-muted leading-relaxed pt-0.5">
            By continuing, you agree to the Jain Jewellers{' '}
            <button
              type="button"
              onClick={() => setPolicyModal({ isOpen: true, type: 'terms' })}
              className="text-burgundy hover:underline font-medium inline"
            >
              Terms &amp; Conditions
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => setPolicyModal({ isOpen: true, type: 'privacy' })}
              className="text-burgundy hover:underline font-medium inline"
            >
              Privacy Policy
            </button>
            .
          </p>

          {/* Action Row: Forgotten your password? & Request OTP! */}
          <div className="flex items-center justify-between pt-1 font-sans text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-burgundy font-medium hover:underline cursor-pointer"
            >
              Forgotten your password?
            </button>
            <button
              type="button"
              onClick={() => setIsOtpOpen(true)}
              className="text-burgundy font-medium hover:underline cursor-pointer"
            >
              Request OTP!
            </button>
          </div>

          {/* Primary Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-burgundy hover:bg-burgundy-dark active:bg-burgundy-dark text-white rounded-md text-sm sm:text-base font-semibold tracking-wide transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Logging In...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>

          {/* Trouble Logging In Link */}
          <p className="text-center font-sans text-xs sm:text-sm text-burgundy font-medium pt-1">
            Trouble logging in?{' '}
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="underline font-semibold hover:text-burgundy-dark cursor-pointer inline"
            >
              Click here to reset password.
            </button>
          </p>

          {/* Not a Member? Sign Up Link */}
          <p className="text-center font-sans text-xs sm:text-sm text-charcoal pt-3">
            Not a Member?{' '}
            <Link
              href="/signup"
              className="text-burgundy font-bold hover:underline ml-0.5 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>

          {/* OR Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E1D8]"></div>
            </div>
            <span className="relative bg-white px-3 font-sans text-xs font-semibold tracking-widest text-burgundy">
              OR
            </span>
          </div>

          {/* Dummy Google Sign-In Button */}
          <div>
            <GoogleAuthButton />
          </div>
        </form>
      </div>

      {/* Interactive Mock Modals */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        defaultIdentifier={identifier}
      />

      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        defaultIdentifier={identifier}
      />

      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ isOpen: false, type: 'terms' })}
        policyType={policyModal.type}
      />
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[calc(100vh-140px)] bg-[#FAF8F4] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
