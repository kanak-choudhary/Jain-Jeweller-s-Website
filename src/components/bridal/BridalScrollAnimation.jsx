'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowDown, Gem } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 300;
const FRAME_PATH = (idx) => `/images/bridal-frames/frame-${String(idx + 1).padStart(3, '0')}.jpg`;

// 5 Storytelling Stages defined by user specification
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
    supporting: 'Every element finds its place.',
    stageNumber: '03',
  },
  {
    range: [0.68, 0.86],
    eyebrow: 'HARMONIOUS SYMPHONY',
    heading: 'A Complete Expression',
    supporting: 'Made for your most special moments.',
    stageNumber: '04',
  },
  {
    range: [0.86, 1.0],
    eyebrow: 'ETERNAL RADIANCE',
    heading: 'Your Forever Begins Here',
    supporting: 'Exquisite bridal suites handcrafted for life’s most sacred vows.',
    stageNumber: '05',
    hasCta: true,
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

  // Reference for requestAnimationFrame rendering
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  // Draw frame on canvas with high DPI and object-fit: contain scaling
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

    // Clear canvas with luxury ivory background
    ctx.fillStyle = '#FAF8F4';
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect ratio containment (1920 / 1080 native 16:9)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawHeight = height;
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Window resize handler for canvas sizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Image preloading effect
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Priority 1: Load first frame immediately for instant first-paint
    const firstImg = new window.Image();
    firstImg.src = FRAME_PATH(0);
    imagesRef.current[0] = firstImg;

    firstImg.onload = () => {
      if (isCancelled) return;
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      updateCanvasSize();
      renderFrame(0);
    };

    // Priority 2: Progressively load remaining frames
    // Batch load frames with concurrency
    const loadBatch = async () => {
      const BATCH_SIZE = 8;
      for (let i = 1; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (isCancelled) break;
        const promises = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          const img = new window.Image();
          img.src = FRAME_PATH(j);
          imagesRef.current[j] = img;

          const p = new Promise((resolve) => {
            img.onload = () => {
              loadedCount++;
              if (!isCancelled) {
                setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              }
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              resolve();
            };
          });
          promises.push(p);
        }
        await Promise.all(promises);

        // Mark as ready once first 30 frames are ready
        if (i >= 30 && !isLoaded) {
          setIsLoaded(true);
        }
      }

      if (!isCancelled) {
        setIsLoaded(true);
      }
    };

    loadBatch();

    return () => {
      isCancelled = true;
    };
  }, [updateCanvasSize, renderFrame, isLoaded]);

  // Resize listener
  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (!containerRef.current || !pinSectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinSectionRef.current,
        anticipatePin: 1,
        scrub: 0.15, // Smooth responsive scrubbing
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Map scroll progress to 0..TOTAL_FRAMES-1
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
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
    }, containerRef);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [renderFrame]);

  // Animate text changes smoothly using GSAP
  useEffect(() => {
    if (!textContainerRef.current) return;

    gsap.fromTo(
      textContainerRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentStageIdx]);

  const activeStage = STAGES[currentStageIdx] || STAGES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF8F4]"
      style={{ height: '450vh' }} // 450vh allows luxurious, smooth scrolling for 300 frames
    >
      {/* Pinned Screen Viewport */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Full-Screen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Ambient Top & Bottom Luxury Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#FAF8F4]/80 via-transparent to-[#FAF8F4]/90" />

        {/* Top Minimal Header & Progress Bar */}
        <header className="relative z-20 w-full pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          {/* Left: Brand Logo Link */}
          <div className="pointer-events-auto">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
              aria-label="Jain Jewellers Home"
            >
              <div className="relative w-11 h-11 sm:w-14 sm:h-14">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Jain Jewellers Logo"
                  fill
                  sizes="56px"
                  className="object-contain drop-shadow-xs"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Stage Number Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-serif text-gold tracking-widest uppercase">
              Part {activeStage.stageNumber} of 05
            </span>
          </div>

          {/* Right: Scroll Percentage */}
          <div className="flex items-center gap-2.5">
            <Gem className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-mono font-medium text-charcoal/70 tracking-wider">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </header>

        {/* Minimal Thin Scroll Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-champagne/40 z-30">
          <div
            className="h-full bg-gradient-to-r from-burgundy via-gold to-burgundy transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Dynamic Storytelling Text Overlay (Centered, Minimal, No Blur) */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center pb-12 sm:pb-16 flex flex-col items-center">
          <div
            ref={textContainerRef}
            className="space-y-2.5 sm:space-y-3 pointer-events-none"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-4 sm:w-6 h-px bg-gold/70" />
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-burgundy uppercase">
                {activeStage.eyebrow}
              </p>
              <span className="w-4 sm:w-6 h-px bg-gold/70" />
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-charcoal tracking-tight leading-tight">
              {activeStage.heading}
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-sm sm:text-base text-charcoal/75 max-w-lg mx-auto leading-relaxed font-light">
              {activeStage.supporting}
            </p>


          </div>

          {/* Minimal Scroll Indicator (Hidden near end) */}
          {scrollProgress < 0.9 && (
            <div className="mt-8 flex flex-col items-center gap-1.5 opacity-60 pointer-events-none transition-opacity duration-300">
              <span className="text-[10px] uppercase tracking-[0.25em] text-charcoal/70 font-semibold">
                Scroll to Assemble
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-gold animate-bounce" />
            </div>
          )}
        </div>

        {/* Subtle Preloader Badge during initial load */}
        {!isLoaded && loadingProgress < 100 && (
          <div className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-border-soft shadow-xs flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gold animate-spin" />
            <span className="text-[10px] font-mono font-medium text-charcoal">
              Loading frames {loadingProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

