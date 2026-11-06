'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import FooterColumn from './FooterColumn';
import footerData from '@/data/footerLinks.json';

export default function Footer() {
  const { brand, columns, newsletter, legal, copyright } = footerData;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus({
        type: 'error',
        message: 'Please enter your email address.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address (e.g. name@example.com).',
      });
      return;
    }

    // Success (frontend demo)
    setStatus({
      type: 'success',
      message:
        'Thank you for subscribing! Note: This is a frontend demo; no email is stored or transmitted.',
    });
    setEmail('');
  };

  return (
    <footer
      className="bg-burgundy-dark text-white border-t-2 border-gold/40 relative overflow-hidden"
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* Subtle Ambient Gold Vignette */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Area (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="group inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm py-1"
                aria-label="Jain Jewellers Home"
              >
                <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-[0.16em] text-white transition-colors duration-200 group-hover:text-gold-light">
                  {brand.name}
                </span>
                <span className="text-[9px] tracking-[0.32em] uppercase text-gold-light font-medium -mt-0.5">
                  {brand.tagline}
                </span>
              </Link>

              <p className="mt-4 text-sm text-ivory/80 font-light leading-relaxed max-w-sm">
                {brand.description}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-ivory/60 font-light">
                Crafted with royal heritage, hallmarked authenticity and modern elegance.
              </p>
            </div>
          </div>

          {/* Navigation Columns (5 cols on desktop: 3 columns) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col, idx) => (
              <FooterColumn key={idx} title={col.title} links={col.links} />
            ))}
          </div>

          {/* Newsletter Area (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-playfair text-base font-bold text-white tracking-wide mb-4">
              {newsletter.heading}
            </h3>
            <div className="w-8 h-0.5 bg-gold/60 mb-4" />
            <p className="text-sm text-ivory/80 font-light leading-relaxed mb-4">
              {newsletter.description}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status.type) setStatus({ type: null, message: '' });
                  }}
                  placeholder={newsletter.placeholder}
                  aria-label="Email address for newsletter"
                  className="w-full h-11 px-4 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-ivory/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold focus:bg-white/15 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold text-sm tracking-wide rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-burgundy-dark shadow-sm"
              >
                <span>{newsletter.buttonText}</span>
                <ArrowRight className="w-4 h-4 text-charcoal" />
              </button>

              {/* Validation & Demo Notification Messages */}
              {status.type === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'success' && (
                <div
                  role="status"
                  className="flex items-start gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/10 bg-black/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/70">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            {legal.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-gold-light transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gold rounded"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

