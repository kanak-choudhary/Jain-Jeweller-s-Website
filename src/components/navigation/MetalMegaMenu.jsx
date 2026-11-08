'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CircleDot,
  Gem,
  Crown,
  Circle,
  Link2,
  Heart,
  Star,
  Layers,
  Sun,
  Coins,
  Award,
  Sparkle,
  Gift,
  ChevronRight,
} from 'lucide-react';

const iconMap = {
  Sparkles,
  CircleDot,
  Gem,
  Crown,
  Circle,
  Link2,
  Heart,
  Star,
  Layers,
  Sun,
  Coins,
  Award,
  Sparkle,
  Gift,
};

function MenuIcon({ name, className = 'w-4 h-4 text-gold' }) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} strokeWidth={1.6} />;
}

export default function MetalMegaMenu({ data, isOpen, onClose, align = 'center' }) {
  const [activeTab, setActiveTab] = useState('category');
  const baseId = useId();

  if (!data) return null;

  const currentTab = data.tabs.find((t) => t.id === activeTab) ? activeTab : 'category';
  const tabContent = data.content[currentTab];

  const positionClass =
    align === 'left'
      ? '-left-20 lg:-left-32 xl:left-1/2 xl:-translate-x-1/2'
      : align === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      role="region"
      aria-label={`${data.title} Mega Menu`}
      className={`absolute ${positionClass} top-full pt-2 w-[760px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white border border-border-soft rounded-2xl shadow-2xl shadow-burgundy/10 overflow-hidden flex min-h-[390px]">
        {/* Left Sidebar — Vertical Tabs */}
        <aside
          role="tablist"
          aria-label={`${data.title} navigation tabs`}
          className="w-48 sm:w-52 bg-[#FCFAF7] border-r border-border-soft/70 py-4 flex flex-col shrink-0"
        >
          <div className="px-5 pb-3 mb-1 border-b border-champagne/40">
            <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-muted">
              {data.title} Details
            </span>
          </div>

          <div className="space-y-1 px-2">
            {data.tabs.map((tab) => {
              const isSelected = currentTab === tab.id;
              const tabId = `${baseId}-tab-${tab.id}`;
              const panelId = `${baseId}-panel-${tab.id}`;

              return (
                <button
                  key={tab.id}
                  id={tabId}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onMouseEnter={() => setActiveTab(tab.id)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 text-left relative group ${
                    isSelected
                      ? 'bg-champagne/40 text-burgundy font-semibold shadow-xs border-l-[3px] border-burgundy'
                      : 'text-charcoal/80 hover:text-burgundy hover:bg-ivory/80 border-l-[3px] border-transparent'
                  }`}
                >
                  <span className="capitalize">{tab.label}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isSelected
                        ? 'text-burgundy translate-x-0.5 opacity-100'
                        : 'text-muted/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Quick subtle brand touch in sidebar footer */}
          <div className="mt-auto px-5 pt-4 border-t border-champagne/40">
            <p className="text-[10px] text-muted leading-tight">
              Certified Luxury <br />
              <span className="text-gold font-serif italic">100% Guaranteed Purity</span>
            </p>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main
          id={`${baseId}-panel-${currentTab}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${currentTab}`}
          className="flex-1 p-6 bg-white overflow-y-auto"
        >
          {/* Category Tab: 2-column layout */}
          {currentTab === 'category' ? (
            <div className="grid grid-cols-2 gap-8 h-full">
              {tabContent?.columns?.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <div className="border-b border-champagne/60 pb-2 flex items-center justify-between">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
                      {col.title}
                    </h3>
                    <span className="text-[10px] text-muted font-serif">
                      ({col.items.length})
                    </span>
                  </div>

                  <ul className="space-y-1 list-none m-0 p-0">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          onClick={() => onClose?.()}
                          className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-ivory text-charcoal hover:text-burgundy transition-all duration-150"
                        >
                          <span className="p-1 rounded-md bg-champagne/30 text-gold group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors shrink-0">
                            <MenuIcon name={item.icon} className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-serif font-medium text-charcoal group-hover:text-burgundy transition-colors tracking-wide">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            /* Other Tabs (Coins, Gender, Price, Purity, Collections) */
            <div className="space-y-3 h-full">
              <div className="border-b border-champagne/60 pb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
                  {tabContent?.title || currentTab.toUpperCase()}
                </h3>
                <span className="text-[10px] text-muted font-serif">
                  ({tabContent?.items?.length || 0})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {tabContent?.items?.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    onClick={() => onClose?.()}
                    className={`group flex items-center justify-between py-2 px-3 rounded-lg border border-border-soft/60 hover:border-gold/50 bg-[#FCFAF7]/50 hover:bg-ivory text-xs transition-all duration-150 ${
                      item.isHighlight ? 'font-semibold text-burgundy bg-champagne/20' : 'text-charcoal hover:text-burgundy'
                    }`}
                  >
                    <span className="font-serif tracking-wide">{item.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted/40 group-hover:text-burgundy group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
