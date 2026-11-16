'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  if (ScrollTrigger.clearScrollMemory) {
    ScrollTrigger.clearScrollMemory('manual');
  }
}

const TOTAL_FRAMES = 300;
const FRAME_PATH = (idx) => `/images/bridal-frames/frame-${String(idx + 1).padStart(3, '0')}.jpg`;

// 5 Storytelling Stages defined for the bridal campaign
const STAGES = [
  {
    range: [0.0, 0.22],
    eyebrow: 'THE ART OF BRIDAL ELEGANCE',
    heading: 'A Story in Gold',
    supporting: 'Crafted for your forever.',
    stageNumber: '01',
  },
  {
    range: [0.22, 0.45],
    eyebrow: 'METICULOUS CRAFTSMANSHIP',
    heading: 'Every Detail Matters',
    supporting: 'An expression of timeless beauty.',
    stageNumber: '02',
  },
  {
    range: [0.45, 0.68],
    eyebrow: 'HEIRLOOM ARCHITECTURE',
    heading: 'The Art of Craftsmanship',
    supporting: 'Every element finds its sacred place.',
    stageNumber: '03',
  },
  {
    range: [0.68, 0.86],
    eyebrow: 'HARMONIOUS SYMPHONY',
    heading: 'A Complete Expression',
    supporting: 'Made for your most unforgettable vows.',
    stageNumber: '04',
  },
  {
    range: [0.86, 1.0],
    eyebrow: 'ETERNAL RADIANCE',
    heading: 'Your Forever Begins Here',
    supporting: 'Exquisite bridal suites handcrafted for generations.',
    stageNumber: '05',
  },
];

export default function BridalScrollAnimation() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const textContainerRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(120);

  // Reference for requestAnimationFrame rendering
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  // Measure dynamic sticky header height
  const getHeaderHeight = useCallback(() => {
    if (typeof window === 'undefined') return 120;
    const header = document.querySelector('header');
    if (header) {
      const height = header.offsetHeight;
      if (height > 0) return height;
    }
    return window.innerWidth >= 1024 ? 120 : 70;
  }, []);

  // Draw frame on canvas with high DPI and edge-to-edge focal preservation
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested image or fallback to nearest loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame backward
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      // If none backward, find nearest forward
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const canvasAspect = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect >= 1.0) {
      // Landscape (Desktop, Laptop, Tablet Landscape)
      // Cover full available viewport width edge-to-edge without side margins
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      drawWidth = img.naturalWidth * scale;
      drawHeight = img.naturalHeight * scale;
      offsetX = (width - drawWidth) / 2;
      // Head jewellery, maang tikka, and face are centered around 35-45% of height
      offsetY = Math.min(0, (height - drawHeight) * 0.35);
    } else {
      // Portrait (Mobile, Tablet Portrait)
      // Focus on the central bridal suite (face, maang tikka, necklace) while covering full height
      const scale = Math.max(width / 1200, height / img.naturalHeight);
      drawWidth = img.naturalWidth * scale;
      drawHeight = img.naturalHeight * scale;
      offsetX = (width - drawWidth) / 2;
      offsetY = Math.min(0, (height - drawHeight) * 0.25);
    }

    // High quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Update canvas intrinsic resolution to match physical display dimensions & DPR
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (rect.width > 0 && rect.height > 0) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // Reference to track frames that have been requested
  const requestedFramesRef = useRef(new Set());

  // Function to ensure a specific frame is requested exactly once
  const ensureFrameLoaded = useCallback((idx) => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return;
    if (requestedFramesRef.current.has(idx)) return;
    requestedFramesRef.current.add(idx);

    if (typeof window === 'undefined') return;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = FRAME_PATH(idx);
    imagesRef.current[idx] = img;

    img.onload = () => {
      if (Math.abs(currentFrameRef.current - idx) <= 1) {
        renderFrame(currentFrameRef.current);
      }
    };
  }, [renderFrame]);

  // Load a lookahead window around a target frame
  const loadFrameBuffer = useCallback((centerIdx, bufferAhead = 35) => {
    const start = Math.max(0, centerIdx - 8);
    const end = Math.min(TOTAL_FRAMES - 1, centerIdx + bufferAhead);
    for (let i = start; i <= end; i++) {
      ensureFrameLoaded(i);
    }
  }, [ensureFrameLoaded]);

  // Progressive image preloading: load initial 20 frames immediately, then buffer on-demand and during idle
  useEffect(() => {
    let isCancelled = false;
    let idleTimer = null;

    // 1. Preload first 20 frames immediately
    for (let i = 0; i <= 20; i++) {
      ensureFrameLoaded(i);
    }

    const firstImg = imagesRef.current[0];
    if (firstImg) {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        setIsLoaded(true);
        setLoadingProgress(100);
        updateCanvasSize();
        renderFrame(0);
      } else {
        firstImg.onload = () => {
          if (isCancelled) return;
          setIsLoaded(true);
          setLoadingProgress(100);
          updateCanvasSize();
          renderFrame(0);
        };
      }
    }

    // 2. Progressively fetch upcoming frames in background during idle periods
    const scheduleIdleBatch = (startIndex = 21) => {
      if (isCancelled || startIndex >= TOTAL_FRAMES) return;

      const runBatch = () => {
        if (isCancelled) return;
        const BATCH = 6;
        for (let i = startIndex; i < Math.min(startIndex + BATCH, TOTAL_FRAMES); i++) {
          ensureFrameLoaded(i);
        }
        idleTimer = setTimeout(() => scheduleIdleBatch(startIndex + BATCH), 100);
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(runBatch);
      } else {
        idleTimer = setTimeout(runBatch, 100);
      }
    };

    // Begin background trickle after initial render
    idleTimer = setTimeout(() => scheduleIdleBatch(21), 600);

    return () => {
      isCancelled = true;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [ensureFrameLoaded, updateCanvasSize, renderFrame]);

  // Dynamic header measurement & resize listener
  useEffect(() => {
    const handleResize = () => {
      const hHeight = getHeaderHeight();
      setHeaderHeight(hHeight);
      updateCanvasSize();
      ScrollTrigger.refresh();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getHeaderHeight, updateCanvasSize]);

  // GSAP ScrollTrigger Setup: pinned full-viewport section below sticky header
  useEffect(() => {
    if (!containerRef.current || !pinSectionRef.current) return;

    const currentHeaderHeight = getHeaderHeight();
    setHeaderHeight(currentHeaderHeight);

    // Enforce top position before initializing ScrollTrigger
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (ScrollTrigger.clearScrollMemory) {
        ScrollTrigger.clearScrollMemory('manual');
      }
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prevBehavior;
      });
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `top top+=${getHeaderHeight()}`,
        end: 'bottom bottom',
        pin: pinSectionRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.15,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Map scroll progress cleanly to 0..TOTAL_FRAMES-1
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            // Preload buffer ahead of scroll position
            loadFrameBuffer(targetFrame, 35);

            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(() => {
              renderFrame(targetFrame);
            });
          }

          // Determine current active story stage
          const activeIdx = STAGES.findIndex(
            (stage) => progress >= stage.range[0] && progress <= stage.range[1]
          );
          if (activeIdx !== -1) {
            setCurrentStageIdx(activeIdx);
          }
        },
      });

      // Render frame 0 on start
      currentFrameRef.current = 0;
      setScrollProgress(0);
      setCurrentStageIdx(0);
      renderFrame(0);
    }, containerRef);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [renderFrame, getHeaderHeight, loadFrameBuffer]);

  // Animate storytelling subtitles smoothly on stage change
  useEffect(() => {
    if (!textContainerRef.current) return;

    gsap.fromTo(
      textContainerRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [currentStageIdx]);

  const activeStage = STAGES[currentStageIdx] || STAGES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF8F4]"
      style={{ height: '420vh' }}
    >
      {/* Pinned Full-Viewport Screen: Exactly 100vw and fills viewport directly below sticky header */}
      <div
        ref={pinSectionRef}
        className="relative w-full overflow-hidden"
        style={{
          width: '100vw',
          height: `calc(100vh - ${headerHeight}px)`,
          maxHeight: `calc(100svh - ${headerHeight}px)`,
        }}
      >
        {/* Full-Screen Edge-to-Edge Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none z-0"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Minimal Thin Top Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-champagne/40 z-20">
          <div
            className="h-full bg-gradient-to-r from-burgundy via-gold to-burgundy transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Subtle, Non-Intrusive Campaign Editorial Subtitle (Positioned elegantly at bottom) */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 px-6 text-center pointer-events-none flex flex-col items-center">
          <div
            ref={textContainerRef}
            className="space-y-1.5 max-w-xl mx-auto"
          >
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gold uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              {activeStage.eyebrow}
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-tight font-medium drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
              {activeStage.heading}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              {activeStage.supporting}
            </p>
          </div>

          {/* Minimal Subtle Scroll Prompt */}
          {scrollProgress < 0.12 && (
            <div className="mt-4 inline-flex items-center gap-1.5 opacity-70 transition-opacity duration-300">
              <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/70 font-medium">
                Scroll to explore
              </span>
              <ArrowDown className="w-3 h-3 text-gold animate-bounce" />
            </div>
          )}
        </div>

        {/* Discreet Preloader Badge during initial frame buffering */}
        {!isLoaded && loadingProgress < 100 && (
          <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-border-soft shadow-xs flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gold animate-spin" />
            <span className="text-[10px] font-mono font-medium text-charcoal">
              {loadingProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

