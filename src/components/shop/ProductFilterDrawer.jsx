'use client';

import { useEffect, useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { FILTER_SECTIONS } from './filterData';

export default function ProductFilterDrawer({
  isOpen,
  onClose,
  selectedFilters,
  onFilterToggle,
  onClearSection,
  onClearAll,
  counts = {},
  totalFilteredCount,
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    metal: true,
    price: true,
    purity: false,
    gender: false,
    occasion: false,
    collection: false,
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-champagne bg-ivory/50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-burgundy" />
            <h2 className="font-serif text-lg font-bold text-charcoal">Filter Jewellery</h2>
            {totalActiveFilters > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-burgundy text-white text-xs font-bold">
                {totalActiveFilters}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 text-charcoal hover:text-burgundy rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-champagne/60 custom-scrollbar">
          {FILTER_SECTIONS.map((section, idx) => {
            const isExpanded = !!expandedSections[section.id];
            const currentSelected = selectedFilters[section.id] || [];
            const activeCount = currentSelected.length;

            return (
              <div key={section.id} className={idx > 0 ? 'pt-4' : ''}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left py-1"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      {section.label}
                    </span>
                    {activeCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-burgundy text-white text-[10px] font-bold flex items-center justify-center">
                        {activeCount}
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2">
                    {section.type === 'nested' ? (
                      section.groups.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-1.5 pt-1">
                          <p className="text-[11px] uppercase font-bold tracking-wider text-muted font-serif px-1">
                            {group.title}
                          </p>
                          <div className="space-y-1">
                            {group.items.map((item) => {
                              const isChecked = currentSelected.includes(item.value);
                              const count = counts[`${section.id}:${item.value}`] || 0;

                              return (
                                <label
                                  key={item.value}
                                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-ivory cursor-pointer text-xs text-charcoal"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                                        isChecked
                                          ? 'bg-burgundy border-burgundy text-white'
                                          : 'border-border-soft bg-white'
                                      }`}
                                    >
                                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span className={isChecked ? 'font-semibold text-burgundy' : ''}>
                                      {item.label}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-muted font-serif">({count})</span>
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isChecked}
                                    onChange={() => onFilterToggle(section.id, item.value)}
                                  />
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const isChecked = currentSelected.includes(item.value);
                          const count = counts[`${section.id}:${item.value}`] || 0;

                          return (
                            <label
                              key={item.value}
                              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-ivory cursor-pointer text-xs text-charcoal"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                                    isChecked
                                      ? 'bg-burgundy border-burgundy text-white'
                                      : 'border-border-soft bg-white'
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className={isChecked ? 'font-semibold text-burgundy' : ''}>
                                  {item.label}
                                </span>
                              </div>
                              <span className="text-[11px] text-muted font-serif">({count})</span>
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isChecked}
                                onChange={() => onFilterToggle(section.id, item.value)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {activeCount > 0 && (
                      <button
                        type="button"
                        onClick={() => onClearSection(section.id)}
                        className="text-[11px] text-muted hover:text-burgundy pt-1 px-1 underline underline-offset-2 transition-colors block"
                      >
                        Clear {section.label}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-champagne bg-ivory/60 flex items-center gap-3">
          <button
            type="button"
            onClick={onClearAll}
            className="flex-1 py-3 px-4 rounded-xl border border-border-soft text-xs font-semibold text-charcoal hover:bg-white transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-2 py-3 px-5 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-md shadow-burgundy/20"
          >
            Apply ({totalFilteredCount})
          </button>
        </div>
      </div>
    </div>
  );
}
