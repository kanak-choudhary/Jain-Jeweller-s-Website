'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    // Subtly animate page entrance: gentle opacity & slight 8px drift
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0.85,
          y: 6,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}

