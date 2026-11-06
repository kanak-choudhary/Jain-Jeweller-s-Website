import { Gift, Scroll, ShieldCheck, Sparkles } from 'lucide-react';
import GiftingCard from './GiftingCard';
import giftingData from '@/data/giftingOptions.json';

const iconMap = {
  Gift,
  Scroll,
  ShieldCheck,
  Sparkles,
};

export default function GiftingSection() {
  const { sectionHeader, giftCards, giftingPerks } = giftingData;

  return (
    <section
      id="gifting"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-ivory/40 to-white relative overflow-hidden"
      aria-labelledby="gifting-heading"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-gold/5 via-burgundy/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-3">
            {sectionHeader.eyebrow}
          </p>
          <h2
            id="gifting-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {sectionHeader.description}
          </p>
        </div>

        {/* 4 Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {giftCards.map((card) => (
            <GiftingCard key={card.id} card={card} />
          ))}
        </div>

        {/* Complimentary Gifting Perks Strip */}
        {giftingPerks && giftingPerks.length > 0 && (
          <div className="mt-14 lg:mt-16 bg-champagne/30 rounded-2xl p-6 sm:p-8 border border-soft-border/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-soft-border/80">
              {giftingPerks.map((perk, index) => {
                const IconComponent = iconMap[perk.icon] || Gift;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${
                      index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border border-gold/40 flex items-center justify-center text-burgundy shadow-xs">
                      <IconComponent className="w-5 h-5 text-burgundy" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-base font-bold text-charcoal">
                        {perk.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted mt-1 leading-snug">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

