import BridalScrollAnimation from '@/components/bridal/BridalScrollAnimation';
import BridalCategories from '@/components/bridal/BridalCategories';
import BridalProducts from '@/components/bridal/BridalProducts';
import BridalEdit from '@/components/bridal/BridalEdit';
import CompleteBridalLook from '@/components/bridal/CompleteBridalLook';
import BridalConsultation from '@/components/bridal/BridalConsultation';

export const metadata = {
  title: 'The Bridal Collection | Royal Indian Luxury | Jain Jewellers',
  description:
    'Experience the art of bridal elegance with an exclusive cinematic scroll-driven journey into Jain Jewellers handcrafted gold, polki and heritage gemstone jewellery.',
};

export default function BridalCollectionPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAF8F4] overflow-x-hidden">
      {/* Opening Scroll-Driven Canvas Animation Experience (Preserved completely) */}
      <BridalScrollAnimation />

      {/* Section 1: Shop by Bridal Categories */}
      <BridalCategories />

      {/* Section 2: Featured Bridal Pieces */}
      <BridalProducts />

      {/* Section 3: The Bridal Edit (Editorial Storytelling) */}
      <BridalEdit />

      {/* Section 4: Complete Your Bridal Look */}
      <CompleteBridalLook />

      {/* Section 5: Bridal Consultation */}
      <BridalConsultation />
    </main>
  );
}
