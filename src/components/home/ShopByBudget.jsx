import BudgetCard from './BudgetCard';
import budgetData from '@/data/budgetRanges.json';

export default function ShopByBudget() {
  const { sectionHeader, budgetTiers } = budgetData;
  const [card1, card2, card3] = budgetTiers;

  return (
    <section
      id="budget"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-rose-50/25 via-white to-rose-50/15 relative overflow-hidden"
      aria-labelledby="budget-heading"
    >
      {/* Soft Ambient Blush Glows matching the reference design */}
      <div
        className="absolute -top-24 -left-20 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-72 sm:w-[420px] h-72 sm:h-[420px] bg-pink-100/35 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 -right-16 w-80 sm:w-[460px] h-80 sm:h-[460px] bg-rose-200/35 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* SVG Definitions: Octagonal Silhouette ClipPath */}
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
        {/* Layout matching attached screenshot: 3 columns with Small-to-Big sequence */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-10 sm:gap-4 lg:gap-8 min-h-0 sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px]">
          
          {/* COLUMN 1: Heading at Top, Smallest Card (Under ₹15,000) at Bottom */}
          <div className="w-full sm:w-[28%] flex flex-col justify-between items-center sm:items-start self-stretch">
            <div className="relative text-center sm:text-left pt-1">
              <span className="block text-sm sm:text-base font-medium tracking-normal text-burgundy/90 mb-0.5">
                {sectionHeader.smallLabel || 'Shop by'}
              </span>
              <h2
                id="budget-heading"
                className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-burgundy tracking-tight lowercase leading-none"
              >
                {sectionHeader.title || 'budget'}
              </h2>
            </div>

            {/* Smallest Card: Under ₹15,000 */}
            {card1 && (
              <div className="w-56 sm:w-full max-w-[220px] lg:max-w-[250px] xl:max-w-[270px] aspect-[1/1.08] mx-auto sm:mx-0 mt-6 sm:mt-0">
                <BudgetCard
                  tier={card1}
                  priority={true}
                  sizeVariant="sm"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* COLUMN 2: Medium Card (Under ₹30,000) - Moved to Bottom */}
          <div className="w-full sm:w-[32%] flex items-end justify-center pb-0">
            {card2 && (
              <div className="w-68 sm:w-full max-w-[270px] lg:max-w-[320px] xl:max-w-[350px] aspect-[1/1.1]">
                <BudgetCard
                  tier={card2}
                  sizeVariant="md"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* COLUMN 3: Largest Card (Under ₹60,000) - Dominant & Tall on the Right */}
          <div className="w-full sm:w-[40%] flex flex-col items-center sm:items-end justify-center sm:justify-end relative pb-0">
            {/* Largest Card: Under ₹60,000 */}
            {card3 && (
              <div className="w-80 sm:w-full max-w-[340px] lg:max-w-[440px] xl:max-w-[500px] aspect-[1/1.12]">
                <BudgetCard
                  tier={card3}
                  sizeVariant="lg"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
