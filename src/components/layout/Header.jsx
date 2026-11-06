'use client';

import { useState, useEffect } from 'react';
import MainNavbar from './MainNavbar';
import CategoryNavbar from './CategoryNavbar';
import MobileNavigation from './MobileNavigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
        isScrolled
          ? 'shadow-md shadow-charcoal/5 border-b border-champagne'
          : 'border-b border-transparent'
      }`}
    >
      {/* Top Main Navbar */}
      <MainNavbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Category Navbar */}
      <CategoryNavbar />

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

