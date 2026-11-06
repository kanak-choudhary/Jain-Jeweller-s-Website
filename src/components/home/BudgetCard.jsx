import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BudgetCard({ tier }) {
  const { range, subtitle, ctaText, image, href } = tier;

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-soft-border/80 hover:border-gold/60 shadow-xs hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-champagne/20">
        <Image
          src={image}
          alt={`Jewellery range ${range}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />

        {/* Ambient Dark Vignette at base */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal group-hover:text-burgundy transition-colors duration-300 tracking-tight">
            {range}
          </h3>
          <p className="mt-2 text-sm text-muted font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-soft-border/60">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-burgundy group-hover:text-burgundy-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold rounded"
            aria-label={`${ctaText} for ${range}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transform-none" />
          </Link>
        </div>
      </div>
    </div>
  );
}

