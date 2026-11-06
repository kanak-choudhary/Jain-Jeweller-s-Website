'use client';

import CampaignSlider from './CampaignSlider';
import { ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export default function HeroSection() {
  const brandPillars = [
    {
      icon: ShieldCheck,
      title: "100% BIS Hallmarked",
      description: "Certified 22KT & 18KT Purity",
    },
    {
      icon: Award,
      title: "IGI & GIA Certified",
      description: "Natural Conflict-Free Diamonds",
    },
    {
      icon: RefreshCw,
      title: "Lifetime Exchange",
      description: "Transparent Buyback Value",
    },
    {
      icon: Truck,
      title: "Insured Transit",
      description: "Complimentary Pan-India Delivery",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Editorial Campaign Slider */}
      <CampaignSlider />

      {/* Royal Heritage Trust Ribbon (Anchoring Hero to Homepage) */}
      <div className="bg-ivory border-b border-champagne py-4 sm:py-5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border-soft/60">
            {brandPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 ${
                    idx === 0 ? 'sm:pl-0' : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-champagne flex items-center justify-center shrink-0 text-burgundy shadow-xs">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-charcoal tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-muted font-sans font-medium line-clamp-1">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

