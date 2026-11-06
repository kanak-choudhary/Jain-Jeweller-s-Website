import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function GiftingCard({ card }) {
  const { tag, title, description, image, ctaText, href } = card;

  return (
    <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-ivory border border-soft-border hover:border-gold/60 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-champagne/30">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-charcoal/10 group-hover:via-charcoal/55 transition-colors duration-500" />

        {/* Floating Occasion Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 text-burgundy backdrop-blur-sm border border-gold/30 shadow-xs">
            {tag}
          </span>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white z-10">
          <h3 className="font-playfair text-2xl font-bold tracking-tight text-white group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>

          <p className="mt-2 text-sm text-ivory/90 font-light leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white group-hover:text-gold-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold rounded"
              aria-label={`${ctaText} - ${title}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

