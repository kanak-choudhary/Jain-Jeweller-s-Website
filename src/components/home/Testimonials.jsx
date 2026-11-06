import TestimonialCard from './TestimonialCard';
import testimonialsData from '@/data/testimonials.json';

export default function Testimonials() {
  const { sectionHeader, testimonials } = testimonialsData;

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-ivory/30 to-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-3">
            {sectionHeader.eyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {sectionHeader.description}
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={
                index === 2
                  ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full'
                  : 'w-full'
              }
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

