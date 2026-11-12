import DiwaliBannerCarousel from '@/components/diwali/DiwaliBannerCarousel';
import DiwaliCategoryGrid from '@/components/diwali/DiwaliCategoryGrid';
import DiwaliPromotions from '@/components/diwali/DiwaliPromotions';

export const metadata = {
  title: 'Diwali Collection 2026 | Jain Jewellers - Royal Festive Jewellery',
  description:
    'Celebrate the auspicious festival of lights with Jain Jewellers handcrafted 22KT gold, certified diamond solitaires, and royal festive jewellery.',
  keywords: [
    'jain jewellers diwali',
    'diwali jewellery',
    'festive gold jewellery',
    'diwali campaign 2026',
    'dhanteras gold',
  ],
};

export default function DiwaliPage() {
  return (
    <main className="min-h-screen bg-white">
      <DiwaliBannerCarousel />
      <DiwaliCategoryGrid />
      <DiwaliPromotions />
    </main>
  );
}
