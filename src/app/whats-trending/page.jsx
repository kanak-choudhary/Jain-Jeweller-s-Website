import DiwaliBannerCarousel from '@/components/diwali/DiwaliBannerCarousel';
import DiwaliCategoryGrid from '@/components/diwali/DiwaliCategoryGrid';
import DiwaliPromotions from '@/components/diwali/DiwaliPromotions';

export const metadata = {
  title: "What's Trending | Jain Jewellers - Royal Heritage Fine Jewellery",
  description:
    "Explore currently trending handcrafted jewellery pieces and exclusive festive campaign collections at Jain Jewellers.",
};

export default function WhatsTrendingPage() {
  return (
    <main className="min-h-screen bg-white">
      <DiwaliBannerCarousel />
      <DiwaliCategoryGrid />
      <DiwaliPromotions />
    </main>
  );
}
