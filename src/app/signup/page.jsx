'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Calendar, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import PolicyModal from '@/components/auth/PolicyModal';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'choudharykanak.2005@gmail.com',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: '',
    consent: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Policy modal
  const [policyModal, setPolicyModal] = useState({ isOpen: false, type: 'terms' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Mobile number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim().replace(/\s/g, ''))) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.gender || formData.gender === 'select') {
      nextErrors.gender = 'Please select your gender';
    }

    if (!formData.dob) {
      nextErrors.dob = 'Please select your date of birth';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.consent) {
      nextErrors.consent = 'You must agree to the Terms & Privacy Policy to proceed';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        dob: formData.dob,
        password: formData.password,
      });

      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    } catch (err) {
      console.error('Registration failed:', err);
      setErrors({ form: 'Registration could not be completed. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-140px)] bg-[#FAF8F4] flex flex-col justify-center items-center py-10 sm:py-16 px-4 sm:px-6">
      {/* Central Registration Card Matching Screenshot 2 */}
      <div className="w-full max-w-[620px] bg-white rounded-2xl shadow-xl shadow-burgundy/5 border border-border-soft p-6 sm:p-8 md:p-10 relative animate-modal">
        {/* Heading in Playfair Display serif */}
        <h1 className="font-serif text-2xl sm:text-[28px] font-normal text-burgundy tracking-tight text-left leading-tight">
          New User? Register Here!
        </h1>

        {/* Form Error Banner */}
        {errors.form && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {/* 2-Column Grid for Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5">
            {/* Row 1 Left: First Name */}
            <div>
              <label
                htmlFor="signup-firstName"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                First Name
              </label>
              <input
                id="signup-firstName"
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`w-full px-3.5 py-2.5 sm:py-3 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                  errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                }`}
              />
              {errors.firstName && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Row 1 Right: Last Name */}
            <div>
              <label
                htmlFor="signup-lastName"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Last Name
              </label>
              <input
                id="signup-lastName"
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`w-full px-3.5 py-2.5 sm:py-3 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                  errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                }`}
              />
              {errors.lastName && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Row 2 Left: Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="choudharykanak.2005@gmail.com"
                className={`w-full px-3.5 py-2.5 sm:py-3 rounded-md border text-charcoal font-sans text-sm transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                  errors.email
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-[#D5D0C7] bg-[#F4F7FC]'
                }`}
              />
              {errors.email && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Row 2 Right: Mobile.No */}
            <div>
              <label
                htmlFor="signup-phone"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Mobile.No
              </label>
              <input
                id="signup-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile no"
                className={`w-full px-3.5 py-2.5 sm:py-3 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                  errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                }`}
              />
              {errors.phone && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Row 3 Left: Gender Dropdown */}
            <div>
              <label
                htmlFor="signup-gender"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  id="signup-gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full appearance-none px-3.5 py-2.5 sm:py-3 pr-10 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                    errors.gender ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                  } ${!formData.gender ? 'text-muted' : 'text-charcoal'}`}
                >
                  <option value="">select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {errors.gender && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Row 3 Right: Date of Birth Picker */}
            <div>
              <label
                htmlFor="signup-dob"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Date of Birth
              </label>
              <div className="relative">
                <input
                  id="signup-dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 sm:py-3 pr-10 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                    errors.dob ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                  } ${!formData.dob ? 'text-muted' : 'text-charcoal'}`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              {errors.dob && (
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Row 4 Left: Enter Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Enter Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className={`w-full px-3.5 py-2.5 sm:py-3 pr-11 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                    errors.password ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
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
                <p className="font-sans text-[11px] text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Row 4 Right: Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirmPassword"
                className="block font-sans text-xs sm:text-sm font-medium text-charcoal mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="signup-confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full px-3.5 py-2.5 sm:py-3 pr-11 rounded-md border text-charcoal font-sans text-sm bg-white transition-all focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50/20' : 'border-[#D5D0C7]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/70 hover:text-charcoal p-1 transition-colors"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5" strokeWidth={1.75} />
                  ) : (
                    <EyeOff className="w-5 h-5" strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="font-sans text-[11px] text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Consent Checkbox Section Matching Screenshot 2 */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-xs border transition-colors flex items-center justify-center ${
                    formData.consent
                      ? 'bg-burgundy border-burgundy text-white'
                      : errors.consent
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-[#A3383B] bg-white group-hover:border-burgundy'
                  }`}
                >
                  {formData.consent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
              <span className="font-sans text-xs text-charcoal leading-relaxed select-none">
                I agree to receive communications from Jain Jewellers via phone, SMS, WhatsApp and email. I have read and agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPolicyModal({ isOpen: true, type: 'terms' });
                  }}
                  className="text-burgundy hover:underline font-medium inline"
                >
                  Terms &amp; Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPolicyModal({ isOpen: true, type: 'privacy' });
                  }}
                  className="text-burgundy hover:underline font-medium inline"
                >
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.consent && (
              <p className="font-sans text-[11px] text-red-600 mt-1.5 ml-8">{errors.consent}</p>
            )}
          </div>

          {/* Primary Sign Up Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-burgundy hover:bg-burgundy-dark active:bg-burgundy-dark text-white rounded-md text-sm sm:text-base font-semibold tracking-wide transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>

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

          {/* Already a Member? Sign In */}
          <p className="text-center font-sans text-xs sm:text-sm text-charcoal pt-3">
            Already a Member?{' '}
            <Link
              href="/signin"
              className="text-burgundy font-bold hover:underline ml-0.5 cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ isOpen: false, type: 'terms' })}
        policyType={policyModal.type}
      />
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[calc(100vh-140px)] bg-[#FAF8F4] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
