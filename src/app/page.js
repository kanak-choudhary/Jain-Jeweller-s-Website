import HeroSection from '@/components/home/HeroSection';
import ShopByCategory from '@/components/home/ShopByCategory';
import JainPromises from '@/components/home/JainPromises';
import DiamondCollection from '@/components/home/DiamondCollection';
import ShopByGender from '@/components/home/ShopByGender';
import ExploreJewellery from '@/components/home/ExploreJewellery';
import ExploreOurRange from '@/components/home/ExploreOurRange';
import GiftingSection from '@/components/home/GiftingSection';
import BridalCollection from '@/components/home/BridalCollection';
import DiscoverCollection from '@/components/home/DiscoverCollection';
import ShopByBudget from '@/components/home/ShopByBudget';
import Testimonials from '@/components/home/Testimonials';
import JainExperience from '@/components/home/JainExperience';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* SECTION 03 — Hero Campaign Slider */}
      <HeroSection />

      {/* SECTION 05 — Shop by Category */}
      <ShopByCategory />

      {/* SECTION 06 — Jain Promises */}
      <JainPromises />

      {/* SECTION 07 — Diamond Jewellery */}
      <DiamondCollection />

      {/* SECTION 08 — Shop by Gender */}
      <ShopByGender />

      {/* SECTION 09 — Explore Jewellery */}
      <ExploreJewellery />

      {/* SECTION 10 — Explore Our Range */}
      <ExploreOurRange />

      {/* SECTION 11 — Gifting & More */}
      <GiftingSection />

      {/* SECTION 12 — Bridal Collection */}
      <BridalCollection />

      {/* SECTION 13 — Discover Our Collection */}
      <DiscoverCollection />

      {/* SECTION 14 — Shop by Budget */}
      <ShopByBudget />

      {/* SECTION 15 — Customer Testimonials */}
      <Testimonials />

      {/* SECTION 16 — Jain Experience */}
      <JainExperience />
    </main>
  );
}
