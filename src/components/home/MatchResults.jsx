'use client';

import { Sparkles, RotateCcw, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import matchData from '@/data/matchOptions.json';

export default function MatchResults({ selections, onRestart }) {
  // Helper to find label for selected id
  const getOptionLabel = (stepId, optionId) => {
    const step = matchData.steps.find((s) => s.id === stepId);
    const option = step?.options.find((o) => o.id === optionId);
    return option ? option.label : optionId;
  };

  // Recommendation Resolution Logic
  const getRecommendation = () => {
    const matrix = matchData.recommendationMatrix;

    // 1. Check exact match on occasion & category
    const exactMatch = matrix.find(
      (m) =>
        m.matchCondition.occasion === selections.occasion &&
        m.matchCondition.category === selections.category
    );
    if (exactMatch) return exactMatch;

    // 2. Check match on occasion & style
    const occasionStyleMatch = matrix.find(
      (m) =>
        m.matchCondition.occasion === selections.occasion &&
        m.matchCondition.style === selections.style
    );
    if (occasionStyleMatch) return occasionStyleMatch;

    // 3. Fallback to default recommendation
    return matrix.find((m) => m.id === 'rec-default') || matrix[0];
  };

  const recommendation = getRecommendation();

  const handleExploreClick = (e) => {
    e.preventDefault();
    // Safe anchor placeholder behavior: scroll smoothly to top or anchor
    const element = document.querySelector(recommendation.route);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-border-soft rounded-3xl p-6 sm:p-10 shadow-xl shadow-burgundy/5 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center space-y-3 pb-8 border-b border-champagne">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs uppercase tracking-[0.2em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Your Curated Match
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-burgundy">
          Handcrafted Just For You
        </h3>

        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          Based on your refined preferences, our master craftsmen recommend this signature creation:
        </p>

        {/* Selected Preferences Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {selections.occasion && (
            <span className="text-xs px-3 py-1 rounded-full bg-ivory border border-border-soft text-charcoal font-medium">
              Occasion: <strong className="text-burgundy">{getOptionLabel('occasion', selections.occasion)}</strong>
            </span>
          )}
          {selections.category && (
            <span className="text-xs px-3 py-1 rounded-full bg-ivory border border-border-soft text-charcoal font-medium">
              Type: <strong className="text-burgundy">{getOptionLabel('category', selections.category)}</strong>
            </span>
          )}
          {selections.style && (
            <span className="text-xs px-3 py-1 rounded-full bg-ivory border border-border-soft text-charcoal font-medium">
              Style: <strong className="text-burgundy">{getOptionLabel('style', selections.style)}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Recommended Collection Showcase Card */}
      <div className="py-8 space-y-6">
        <div className="bg-ivory rounded-2xl p-6 sm:p-8 border border-border-soft space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold bg-white px-3 py-1 rounded-full border border-champagne">
              {recommendation.collectionTag}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold" /> Guaranteed Hallmarked
            </span>
          </div>

          <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            {recommendation.collectionName}
          </h4>

          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
            {recommendation.description}
          </p>

          {/* Key Feature Bullets */}
          {recommendation.features && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border-soft/60">
              {recommendation.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-charcoal font-medium">
                  <span className="w-4 h-4 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-champagne">
        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-charcoal hover:text-burgundy hover:bg-ivory border border-border-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start Again
        </button>

        <a
          href={recommendation.route}
          onClick={handleExploreClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg shadow-burgundy/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold group"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

