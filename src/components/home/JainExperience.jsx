import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ExperiencePillarCard from './ExperiencePillarCard';
import experienceData from '@/data/jainExperience.json';

export default function JainExperience() {
  const { sectionHeader, featuredImage, pillars } = experienceData;

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-champagne/15 to-ivory/50 relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="experience-heading"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-champagne/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-3">
            {sectionHeader.eyebrow}
          </p>
          <h2
            id="experience-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {sectionHeader.description}
          </p>
        </div>

        {/* Split Editorial Layout: Visual Showcase + 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Craftsmanship Visual Hero (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-3xl overflow-hidden border border-gold/30 bg-champagne/20 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />

                {/* Ambient Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent pointer-events-none" />

                {/* Floating Heritage Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-charcoal backdrop-blur-md border border-gold/40 shadow-lg">
                    <Sparkles className="w-4 h-4 text-burgundy flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium tracking-wide">
                      {featuredImage.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Pillars & Story Action (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {pillars.map((pillar) => (
                <ExperiencePillarCard key={pillar.number} pillar={pillar} />
              ))}
            </div>

            {/* Discover Our Story CTA */}
            <div className="mt-8 pt-6 border-t border-soft-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted font-light leading-relaxed max-w-md">
                Experience bespoke consultations, hallmark authenticity and personalized guidance at every step.
              </p>
              <Link
                href={sectionHeader.ctaHref}
                className="group inline-flex items-center gap-3 bg-burgundy hover:bg-burgundy-dark text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:border-gold border border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 flex-shrink-0"
                aria-label={sectionHeader.ctaText}
              >
                <span>{sectionHeader.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

