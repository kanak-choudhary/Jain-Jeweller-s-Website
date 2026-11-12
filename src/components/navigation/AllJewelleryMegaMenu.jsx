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
  User,
  Users,
  Wine,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { allJewelleryMenuData } from '@/data/allJewelleryMenu';

// Map icon string names to actual Lucide components
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
  User,
  Users,
  Wine,
};

function MenuIcon({ name, className = 'w-4 h-4 text-gold' }) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} strokeWidth={1.6} />;
}

export default function AllJewelleryMegaMenu({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('category');
  const baseId = useId();

  const activeContent = allJewelleryMenuData.content[activeTab] || allJewelleryMenuData.content.category;

  return (
    <div
      role="region"
      aria-label="All Jewellery Mega Menu"
      className={`absolute left-0 top-full pt-2 w-[760px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white border border-border-soft rounded-2xl shadow-2xl shadow-burgundy/10 overflow-hidden flex min-h-[390px]">
        {/* Left Sidebar — Vertical Tabs */}
        <aside
          role="tablist"
          aria-label="Jewellery filter tabs"
          className="w-48 sm:w-52 bg-[#FCFAF7] border-r border-border-soft/70 py-4 flex flex-col shrink-0"
        >
          <div className="px-5 pb-3 mb-1 border-b border-champagne/40">
            <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-muted">
              Explore By
            </span>
          </div>

          <div className="space-y-1 px-2">
            {allJewelleryMenuData.tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
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
            <Link
              href="/all-jewellery"
              onClick={() => onClose?.()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:text-burgundy-dark transition-colors mb-2 group"
            >
              <span>View All Jewellery</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-[10px] text-muted leading-tight">
              Handcrafted Royal Heritage <br />
              <span className="text-gold font-serif italic">BIS 100% Hallmarked</span>
            </p>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main
          id={`${baseId}-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTab}`}
          className="flex-1 p-6 bg-white overflow-y-auto"
        >
          {/* For Category Tab: 2 balanced columns (JEWELLERY & OTHER JEWELLERY) */}
          {activeTab === 'category' ? (
            <div className="grid grid-cols-2 gap-8 h-full">
              {activeContent.columns.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <div className="border-b border-champagne/60 pb-2 flex items-center justify-between">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal">
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
            <div className="space-y-3 h-full">
              {/* For Metal, Gender, Occasion: Clean, rich card list */}
              <div className="border-b border-champagne/60 pb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal">
                  {activeContent.columns[0]?.title || activeTab.toUpperCase()}
                </h3>
                <span className="text-[10px] text-muted font-serif">
                  ({activeContent.columns[0]?.items?.length || 0})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeContent.columns[0]?.items?.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    onClick={() => onClose?.()}
                    className="group flex items-start gap-3 p-3 rounded-xl border border-border-soft/60 hover:border-gold/50 bg-[#FCFAF7]/50 hover:bg-ivory transition-all duration-150"
                  >
                    <span className="p-2 rounded-lg bg-champagne/40 text-gold group-hover:bg-burgundy group-hover:text-white transition-all shrink-0 mt-0.5">
                      <MenuIcon name={item.icon} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-serif font-semibold text-charcoal group-hover:text-burgundy transition-colors">
                          {item.name}
                        </span>
                        <ChevronRight className="w-3 h-3 text-muted/40 group-hover:text-burgundy group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      {item.detail && (
                        <p className="text-[11px] text-muted mt-0.5 leading-snug line-clamp-1">
                          {item.detail}
                        </p>
                      )}
                    </div>
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
