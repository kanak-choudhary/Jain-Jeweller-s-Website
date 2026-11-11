import { Gift, Scroll, ShieldCheck, Sparkles } from 'lucide-react';
import GiftingCard from './GiftingCard';
import giftingData from '@/data/giftingOptions.json';

const iconMap = {
  Gift,
  Scroll,
  ShieldCheck,
  Sparkles,
};

const cardLayoutClasses = {
  'birthday-gifting': 'aspect-[1.9/1] sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-1',
  'festive-gifting': 'aspect-[1.9/1] sm:col-start-1 sm:row-start-2 lg:col-start-1 lg:row-start-2',
  'anniversary-gifting': 'aspect-[1.9/1] sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1',
  'new-born-gifting': 'aspect-[1.9/1] sm:col-start-2 sm:row-start-2 lg:col-start-2 lg:row-start-2',
  'gift-card': 'aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto lg:h-full sm:col-start-1 sm:row-start-3 lg:col-start-3 lg:row-start-1 lg:row-span-2',
  'corporate-gifting': 'aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto lg:h-full sm:col-start-2 sm:row-start-3 lg:col-start-4 lg:row-start-1 lg:row-span-2',
};

export default function GiftingSection() {
  const { sectionHeader, giftCards, giftingPerks } = giftingData;

  return (
    <section
      id="gifting"
      className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden"
      aria-labelledby="gifting-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
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

        {/* Asymmetrical 4-Column Gifting Grid (Reference Match) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {giftCards.map((card, index) => (
            <GiftingCard
              key={card.id}
              card={card}
              priority={index < 2}
              className={cardLayoutClasses[card.id] || 'aspect-[1.9/1]'}
            />
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

