'use client';

export default function TestimonialCard({ testimonial, rotation = 0 }) {
  const { customer, date, review } = testimonial;

  return (
    <div
      tabIndex={0}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="group relative flex flex-col justify-between w-[310px] sm:w-[350px] lg:w-[380px] min-h-[250px] sm:min-h-[270px] bg-white hover:bg-burgundy focus-visible:bg-burgundy rounded-[26px] sm:rounded-[30px] border border-soft-border/80 hover:border-burgundy focus-visible:border-burgundy shadow-[0_10px_30px_rgba(41,35,33,0.06)] hover:shadow-[0_20px_40px_rgba(138,2,1,0.22)] focus-visible:shadow-[0_20px_40px_rgba(138,2,1,0.22)] hover:scale-[1.02] transition-all duration-400 ease-out p-6 sm:p-7 lg:p-8 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold flex-shrink-0"
      aria-label={`Testimonial from ${customer}`}
    >
      <div>
        {/* Top Row: Customer info on left, decorative quotation mark on right */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-sans font-semibold text-charcoal group-hover:text-white group-focus-visible:text-white text-base sm:text-lg tracking-tight transition-colors duration-300">
              {customer}
            </h3>
            {date && (
              <p className="font-sans text-xs sm:text-sm text-muted group-hover:text-white/80 group-focus-visible:text-white/80 font-normal mt-0.5 transition-colors duration-300">
                {date}
              </p>
            )}
          </div>

          {/* Decorative Opening Quotation Mark */}
          <span
            className="font-serif text-3xl sm:text-4xl text-burgundy/40 group-hover:text-gold group-focus-visible:text-gold leading-none select-none transition-colors duration-300"
            aria-hidden="true"
          >
            &ldquo;
          </span>
        </div>

        {/* Testimonial Review Text */}
        <p className="mt-5 sm:mt-6 font-sans text-charcoal/90 group-hover:text-white group-focus-visible:text-white text-sm sm:text-base leading-relaxed line-clamp-5 transition-colors duration-300">
          {review}
        </p>
      </div>
    </div>
  );
}
