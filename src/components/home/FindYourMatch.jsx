'use client';

import { useState } from 'react';
import MatchOptionCard from './MatchOptionCard';
import MatchResults from './MatchResults';
import matchData from '@/data/matchOptions.json';
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';

export default function FindYourMatch() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState({
    occasion: null,
    category: null,
    style: null,
  });
  const [isComplete, setIsComplete] = useState(false);

  const steps = matchData.steps;
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  const currentSelection = currentStep ? selections[currentStep.id] : null;
  const isContinueDisabled = !currentSelection;

  const handleSelectOption = (optionId) => {
    setSelections((prev) => ({
      ...prev,
      [currentStep.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (isContinueDisabled) return;

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelections({
      occasion: null,
      category: null,
      style: null,
    });
    setCurrentStepIndex(0);
    setIsComplete(false);
  };

  return (
    <section
      id="find-your-match"
      aria-labelledby="match-heading"
      className="py-16 sm:py-24 bg-ivory/60 border-b border-champagne relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs uppercase tracking-[0.2em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Discovery
          </div>

          <h2
            id="match-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight"
          >
            Find Your Perfect Match
          </h2>

          <div className="flex items-center justify-center gap-3 py-1">
            <span className="h-px w-10 bg-border-soft" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-10 bg-border-soft" />
          </div>

          <p className="font-sans text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
            Every occasion deserves something special. Discover jewellery that reflects your style.
          </p>
        </div>

        {/* Discovery Stepper / Question Flow */}
        {!isComplete ? (
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
            {/* Progress Bar & Step Labels */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-charcoal">
                <span className="text-burgundy">
                  Step {currentStepIndex + 1} of {totalSteps}: {currentStep.id}
                </span>
                <span className="text-muted">
                  {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 bg-champagne/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300 ease-out"
                  style={{
                    width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                  }}
                />
              </div>

              {/* Step Title & Subtitle */}
              <div className="pt-3 text-center sm:text-left space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  {currentStep.question}
                </h3>
                <p className="text-xs sm:text-sm text-muted">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            {/* Options Cards Grid */}
            <div
              role="radiogroup"
              aria-label={currentStep.question}
              className={`grid gap-3.5 sm:gap-4 ${
                currentStep.options.length <= 5
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
              }`}
            >
              {currentStep.options.map((option) => (
                <div key={option.id} className="h-full">
                  <MatchOptionCard
                    option={option}
                    isSelected={currentSelection === option.id}
                    onSelect={handleSelectOption}
                  />
                </div>
              ))}
            </div>

            {/* Stepper Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-border-soft">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  currentStepIndex === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'text-charcoal hover:text-burgundy hover:bg-white border border-border-soft'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isContinueDisabled}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isContinueDisabled
                    ? 'bg-border-soft text-muted cursor-not-allowed'
                    : 'bg-burgundy hover:bg-burgundy-dark text-white shadow-lg shadow-burgundy/20 hover:shadow-xl'
                }`}
              >
                <span>
                  {currentStepIndex === totalSteps - 1
                    ? 'Reveal My Match'
                    : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
        ) : (
          /* Recommendation Results Screen */
          <MatchResults
            selections={selections}
            onRestart={handleRestart}
          />
        )}
      </div>
    </section>
  );
}

