'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BridalScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration for this page
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      if (typeof window === 'undefined') return;

      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;
      // Temporarily override smooth scrolling to jump instantly without delay
      html.style.scrollBehavior = 'auto';

      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        html.scrollTop = 0;
        document.body.scrollTop = 0;
        html.style.scrollBehavior = originalScrollBehavior;
      });
    };

    // Immediate execution on mount/navigation
    resetToTop();

    // Catch late browser restorations, hydration shifts or layout changes
    const t1 = setTimeout(resetToTop, 20);
    const t2 = setTimeout(resetToTop, 80);
    const t3 = setTimeout(resetToTop, 200);

    // Prevent browser from storing a scrolled/footer position on page unload or reload
    const handleUnload = () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [pathname]);

  return null;
}
