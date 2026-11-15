'use client';

import { useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const emptySubscribe = () => () => {};

/**
 * Hook to safely detect client hydration without cascading renders
 */
export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Luxury Motion Timing & Easing Presets
export const MOTION = {
  ease: {
    // International luxury standard cubic-bezier
    luxury: 'power3.out',
    smooth: 'power2.out',
    cinematic: 'power4.out',
    bounce: 'back.out(1.4)',
    cssLuxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
    cssSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    micro: 0.2,
    hover: 0.3,
    normal: 0.5,
    reveal: 0.8,
    cinematic: 1.1,
  },
  stagger: {
    quick: 0.06,
    normal: 0.1,
    relaxed: 0.15,
  },
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard luxury fade-up animation for a single element or ref
 */
export const animateFadeUp = (target, options = {}) => {
  if (!target || prefersReducedMotion()) return null;

  const {
    delay = 0,
    duration = MOTION.duration.reveal,
    distance = 32,
    ease = MOTION.ease.luxury,
    trigger = target,
    start = 'top 88%',
    once = true,
  } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
          }
        : undefined,
    }
  );
};

/**
 * Staggered fade-up animation for child elements
 */
export const animateStagger = (targets, options = {}) => {
  if (!targets || prefersReducedMotion()) return null;

  const {
    delay = 0,
    duration = MOTION.duration.reveal,
    distance = 28,
    stagger = MOTION.stagger.normal,
    ease = MOTION.ease.luxury,
    trigger,
    start = 'top 85%',
    once = true,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
          }
        : undefined,
    }
  );
};

/**
 * Image scale reveal: expands gently into view
 */
export const animateImageReveal = (target, options = {}) => {
  if (!target || prefersReducedMotion()) return null;

  const {
    delay = 0,
    duration = MOTION.duration.cinematic,
    ease = MOTION.ease.luxury,
    trigger = target,
    start = 'top 88%',
  } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, scale: 1.08 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
};

