'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FILTER_SECTIONS } from './filterData';

export default function ProductFilterSidebar({
  selectedFilters,
  onFilterToggle,
  onClearSection,
  onClearAll,
  counts = {},
}) {
  // Manage expanded state for accordion sections (all expanded by default for smooth browsing)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    metal: true,
    price: true,
    purity: true,
    gender: true,
    occasion: false,
    collection: false,
  });

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const hasAnyFilter = Object.values(selectedFilters).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );

  return (
    <aside className="w-full bg-white border border-border-soft rounded-2xl p-5 shadow-xs max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-champagne mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-burgundy" />
          <h2 className="font-serif text-base font-bold text-charcoal">Filters</h2>
        </div>

        {hasAnyFilter && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 text-[11px] font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Accordion Filter Sections */}
      <div className="space-y-4 divide-y divide-champagne/60">
        {FILTER_SECTIONS.map((section, idx) => {
          const isExpanded = !!expandedSections[section.id];
          const currentSelected = selectedFilters[section.id] || [];
          const activeCount = currentSelected.length;

          return (
            <div key={section.id} className={idx > 0 ? 'pt-4' : ''}>
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-left group py-1"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-semibold text-charcoal group-hover:text-burgundy transition-colors">
                    {section.label}
                  </span>
                  {activeCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-burgundy text-white text-[10px] font-bold flex items-center justify-center">
                      {activeCount}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted group-hover:text-burgundy transition-colors" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted group-hover:text-burgundy transition-colors" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {section.type === 'nested' ? (
                    // Grouped Nested Items (like Category: Core vs Other)
                    section.groups.map((group, groupIdx) => (
                      <div key={groupIdx} className="space-y-1.5 pt-1">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-muted font-serif px-1">
                          {group.title}
                        </p>
                        <div className="space-y-1 pl-1">
                          {group.items.map((item) => {
                            const isChecked = currentSelected.includes(item.value);
                            const count = counts[`${section.id}:${item.value}`] || 0;

                            return (
                              <label
                                key={item.value}
                                className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-ivory cursor-pointer text-xs text-charcoal group transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                      isChecked
                                        ? 'bg-burgundy border-burgundy text-white'
                                        : 'border-border-soft group-hover:border-gold bg-white'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span
                                    className={`${
                                      isChecked
                                        ? 'font-semibold text-burgundy'
                                        : 'text-charcoal/85 group-hover:text-charcoal'
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                                <span className="text-[11px] text-muted font-serif">
                                  ({count})
                                </span>
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
                    // Flat Items (Metal, Price, Purity, etc.)
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isChecked = currentSelected.includes(item.value);
                        const count = counts[`${section.id}:${item.value}`] || 0;

                        return (
                          <label
                            key={item.value}
                            className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-ivory cursor-pointer text-xs text-charcoal group transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'bg-burgundy border-burgundy text-white'
                                    : 'border-border-soft group-hover:border-gold bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span
                                className={`${
                                  isChecked
                                    ? 'font-semibold text-burgundy'
                                    : 'text-charcoal/85 group-hover:text-charcoal'
                                }`}
                              >
                                {item.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-muted font-serif">
                              ({count})
                            </span>
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
                      className="text-[11px] text-muted hover:text-burgundy pt-1 px-1 underline underline-offset-2 transition-colors"
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
    </aside>
  );
}

