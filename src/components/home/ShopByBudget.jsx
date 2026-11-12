import BudgetCard from './BudgetCard';
import budgetData from '@/data/budgetRanges.json';

export default function ShopByBudget() {
  const { sectionHeader, budgetTiers } = budgetData;
  const [card1, card2, card3] = budgetTiers;

  return (
    <section
      id="budget"
      className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden"
      aria-labelledby="budget-heading"
    >
      {/* Soft Ambient Glows (Blush Pink top-left, Light Peach bottom-left fading into clean white) */}
      <div
        className="absolute -top-24 -left-24 w-96 sm:w-[520px] h-96 sm:h-[520px] bg-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-28 left-4 sm:left-16 w-80 sm:w-[460px] h-80 sm:h-[460px] bg-[#FCE8DC]/50 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Reusable SVG ClipPath for the Soft Organic Hexagonal Silhouette */}
      <svg
        className="absolute w-0 h-0 pointer-events-none -z-50"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="budget-card-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.28 0.02 L 0.72 0.02 Q 0.77 0.02 0.81 0.06 L 0.96 0.26 Q 0.99 0.30 0.99 0.36 L 0.99 0.64 Q 0.99 0.70 0.96 0.74 L 0.81 0.94 Q 0.77 0.98 0.72 0.98 L 0.28 0.98 Q 0.23 0.98 0.19 0.94 L 0.04 0.74 Q 0.01 0.70 0.01 0.64 L 0.01 0.36 Q 0.01 0.30 0.04 0.26 L 0.19 0.06 Q 0.23 0.02 0.28 0.02 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 sm:gap-4 lg:gap-6 min-h-0 sm:min-h-[460px] lg:min-h-[540px] xl:min-h-[580px]">
          {/* Column 1: Heading at top, Smallest Card (Under ₹15,000) at bottom */}
          <div className="w-full sm:w-[28%] flex flex-col justify-between items-center sm:items-start self-stretch">
            <div className="text-center sm:text-left mb-6 sm:mb-8 lg:mb-0">
              <span className="text-sm sm:text-base font-medium tracking-wide text-charcoal/80">
                {sectionHeader.smallLabel || 'Shop by'}
              </span>
              <h2
                id="budget-heading"
                className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-burgundy tracking-tight mt-1"
              >
                {sectionHeader.title || 'budget'}
              </h2>
            </div>

            {card1 && (
              <div className="w-60 sm:w-full max-w-[240px] lg:max-w-[270px] xl:max-w-[290px] aspect-[1/1.08] mx-auto sm:mx-0">
                <BudgetCard tier={card1} priority={true} className="w-full h-full" />
              </div>
            )}
          </div>

          {/* Column 2: Medium Card (Under ₹30,000) in the middle */}
          <div className="w-full sm:w-[32%] flex items-center justify-center pb-0 sm:pb-6 lg:pb-10">
            {card2 && (
              <div className="w-72 sm:w-full max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] aspect-[1/1.1]">
                <BudgetCard tier={card2} className="w-full h-full" />
              </div>
            )}
          </div>

          {/* Column 3: Largest Card (Under ₹60,000) on the right */}
          <div className="w-full sm:w-[40%] flex items-center sm:items-end justify-center sm:justify-end pb-0">
            {card3 && (
              <div className="w-80 sm:w-full max-w-[340px] lg:max-w-[440px] xl:max-w-[500px] aspect-[1/1.12]">
                <BudgetCard tier={card3} className="w-full h-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
