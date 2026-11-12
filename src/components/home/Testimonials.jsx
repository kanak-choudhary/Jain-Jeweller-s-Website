import TestimonialCard from './TestimonialCard';
import testimonialsData from '@/data/testimonials.json';

const tilts = [-2.5, 2, -1.5, 2.5, -2, 1.5];

export default function Testimonials() {
  const { sectionHeader, testimonials } = testimonialsData;

  // Quadruple the list so Part A (50%) and Part B (50%) both have 6 items each
  // This guarantees a wide, unbroken track that loops seamlessly across 4K, 1440px, 1024px, and mobile displays
  const trackItems = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="testimonials-heading"
    >
      {/* Soft Ambient Background Glows */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-1/4 w-[500px] h-64 bg-[#FCE8DC]/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          <p className="text-sm font-sans font-medium tracking-[0.25em] text-charcoal/70 uppercase mb-2">
            {sectionHeader.smallHeading || 'Our'}
          </p>
          <h2
            id="testimonials-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight"
          >
            {sectionHeader.title || 'Testimonials'}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
        </div>
      </div>

      {/* Horizontally moving, continuous infinite loop marquee */}
      <div
        className="relative w-full overflow-hidden py-8"
        aria-label="Customer Testimonials Carousel"
      >
        {/* Edge Fade Masks for smooth entrance and exit */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Marquee Track: Moving Left to Right */}
        <div className="animate-marquee-ltr flex items-center gap-6 sm:gap-8 px-4">
          {trackItems.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-track-${idx}`}
              testimonial={testimonial}
              rotation={tilts[idx % tilts.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
