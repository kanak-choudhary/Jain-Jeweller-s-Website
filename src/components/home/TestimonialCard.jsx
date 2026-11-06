import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const { customer, review, context } = testimonial;

  return (
    <div className="group relative flex flex-col justify-between h-full bg-white rounded-2xl border border-soft-border/80 hover:border-gold/60 shadow-xs hover:shadow-lg transition-all duration-300 p-8 sm:p-10">
      <div>
        {/* Decorative Quote Icon */}
        <div className="w-10 h-10 rounded-full bg-champagne/40 border border-gold/30 flex items-center justify-center text-gold mb-6 group-hover:scale-105 transition-transform duration-300 motion-reduce:transform-none">
          <Quote className="w-5 h-5 text-gold rotate-180" />
        </div>

        {/* Review Quote Text */}
        <blockquote className="text-charcoal/90 font-light text-base sm:text-lg leading-relaxed italic">
          &ldquo;{review}&rdquo;
        </blockquote>
      </div>

      {/* Attribution Block */}
      <div className="mt-8 pt-6 border-t border-soft-border/60">
        <h3 className="font-playfair text-lg font-bold text-charcoal group-hover:text-burgundy transition-colors duration-300">
          {customer}
        </h3>
        <p className="text-xs uppercase tracking-wider text-muted font-medium mt-1">
          {context}
        </p>
      </div>
    </div>
  );
}

