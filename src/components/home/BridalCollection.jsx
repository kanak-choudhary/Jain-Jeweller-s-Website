import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import bridalData from '@/data/bridalCollection.json';

export default function BridalCollection() {
  const {
    eyebrow,
    title,
    description,
    ctaText,
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
    primaryImage,
    features,
    guarantee,
  } = bridalData;

  return (
    <section
      id="bridal"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-ivory/50 to-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="bridal-heading"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-champagne/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Hero: Indian Bridal Portrait (Image First) */}
          <div className="lg:col-span-7 order-1">
            <div className="group relative rounded-3xl overflow-hidden border border-gold/30 bg-champagne/20 shadow-xl lg:shadow-2xl">
              {/* Outer Decorative Gold Trim */}
              <div className="absolute -inset-0.5 rounded-3xl border border-gold/20 pointer-events-none z-20 group-hover:border-gold/50 transition-colors duration-500" />

              {/* Main Bridal Image */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden bg-ivory">
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                />

                {/* Subtle Luxury Gradient Overlay at the base */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent pointer-events-none" />

                {/* Floating Heritage Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/95 text-charcoal backdrop-blur-md border border-gold/40 shadow-lg">
                    <Sparkles className="w-4 h-4 text-burgundy flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium tracking-wide">
                      {primaryImage.caption}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content Block (Text & CTAs) */}
          <div className="lg:col-span-5 order-2 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-gold" />
              <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase">
                {eyebrow}
              </p>
            </div>

            {/* Main Heading */}
            <h2
              id="bridal-heading"
              className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight leading-tight"
            >
              {title}
            </h2>

            {/* Signature Gold Divider */}
            <div className="w-16 h-0.5 bg-gold my-5" />

            {/* Description */}
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
              {description}
            </p>

            {/* Key Bridal Adornment Features */}
            {features && features.length > 0 && (
              <div className="mt-8 space-y-4 pt-4 border-t border-soft-border/80">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-champagne/60 border border-gold/40 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-burgundy" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-sm sm:text-base font-bold text-charcoal">
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center gap-3 bg-burgundy hover:bg-burgundy-dark text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:border-gold border border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                aria-label={ctaText}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-ivory text-charcoal hover:text-burgundy text-sm font-semibold tracking-wide px-6 py-3.5 rounded-full border border-soft-border hover:border-gold/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label={secondaryCtaText}
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>

            {/* Guarantee / Concierge Note */}
            {guarantee && (
              <div className="mt-8 p-4 rounded-xl bg-champagne/30 border border-gold/25 flex items-center gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gold/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-burgundy" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal tracking-wide uppercase">
                    {guarantee.title}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {guarantee.subtitle}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

