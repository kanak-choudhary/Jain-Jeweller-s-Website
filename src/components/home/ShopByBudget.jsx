import BudgetCard from './BudgetCard';
import budgetData from '@/data/budgetRanges.json';

export default function ShopByBudget() {
  const { sectionHeader, budgetTiers } = budgetData;

  return (
    <section
      id="budget"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-ivory/40 to-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="budget-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-3">
            {sectionHeader.eyebrow}
          </p>
          <h2
            id="budget-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {sectionHeader.description}
          </p>
        </div>

        {/* 4 Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {budgetTiers.map((tier) => (
            <BudgetCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

