'use client';

import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION, prefersReducedMotion } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// SSR-safe layout effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Reusable Scroll Reveal Wrapper
 * Applies smooth fade/slide on viewport entry using GSAP ScrollTrigger
 */
export function Reveal({
  children,
  className = '',
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'
  distance = 32,
  duration = MOTION.duration.reveal,
  delay = 0,
  ease = MOTION.ease.luxury,
  threshold = 'top 88%',
  once = true,
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    let x = 0;
    let y = 0;
    let scale = 1;

    switch (direction) {
      case 'up':
        y = distance;
        break;
      case 'down':
        y = -distance;
        break;
      case 'left':
        x = distance;
        break;
      case 'right':
        x = -distance;
        break;
      case 'scale':
        scale = 0.94;
        break;
      default:
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
          scale,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, ease, threshold, once]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}

export function FadeIn({ children, className = '', delay = 0, duration = MOTION.duration.normal, ...props }) {
  return (
    <Reveal direction="none" delay={delay} duration={duration} className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function FadeUp({ children, className = '', delay = 0, distance = 30, ...props }) {
  return (
    <Reveal direction="up" distance={distance} delay={delay} className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function FadeDown({ children, className = '', delay = 0, distance = 30, ...props }) {
  return (
    <Reveal direction="down" distance={distance} delay={delay} className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function FadeLeft({ children, className = '', delay = 0, distance = 30, ...props }) {
  return (
    <Reveal direction="left" distance={distance} delay={delay} className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function FadeRight({ children, className = '', delay = 0, distance = 30, ...props }) {
  return (
    <Reveal direction="right" distance={distance} delay={delay} className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function ScaleIn({ children, className = '', delay = 0, ...props }) {
  return (
    <Reveal direction="scale" delay={delay} className={className} {...props}>
      {children}
    </Reveal>
  );
}

/**
 * Stagger Reveal Container: animates direct children sequentially
 */
export function StaggerReveal({
  children,
  className = '',
  itemSelector = '> *',
  stagger = MOTION.stagger.normal,
  distance = 28,
  duration = MOTION.duration.reveal,
  delay = 0,
  ease = MOTION.ease.luxury,
  threshold = 'top 85%',
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      let items = [];
      try {
        if (!itemSelector || itemSelector === '> *' || itemSelector === ':scope > *') {
          items = Array.from(el.children);
        } else {
          items = el.querySelectorAll(itemSelector);
        }
      } catch {
        items = Array.from(el.children);
      }

      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: distance,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [itemSelector, stagger, distance, duration, delay, ease, threshold]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}

/**
 * Image Reveal: Luxury smooth zoom and fade for jewellery images
 */
export function ImageReveal({
  children,
  className = '',
  scaleFrom = 1.08,
  duration = MOTION.duration.cinematic,
  delay = 0,
  ...props
}) {
  const containerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const img = el.querySelector('img') || el;
      gsap.fromTo(
        img,
        {
          opacity: 0,
          scale: scaleFrom,
        },
        {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: MOTION.ease.luxury,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scaleFrom, duration, delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Text Reveal: Splitted words/lines reveal for premium editorial titles
 */
export function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  duration = MOTION.duration.reveal,
  ...props
}) {
  const textRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = textRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: MOTION.ease.luxury,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration]);

  return (
    <Tag ref={textRef} className={className} {...props}>
      {children}
    </Tag>
  );
}
