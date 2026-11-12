import { Suspense } from 'react';
import ProductListingLayout from '@/components/shop/ProductListingLayout';

export const metadata = {
  title: 'All Jewellery Collection | Jain Jewellers - Royal Heritage Fine Jewellery',
  description:
    'Discover our complete fine jewellery collection at Jain Jewellers. Handcrafted BIS hallmarked 22KT & 18KT gold, IGI certified solitaire diamonds, polki necklaces, earrings, and imperial bridal adornments.',
  keywords: [
    'jain jewellers',
    'all jewellery',
    'gold jewellery',
    'diamond jewellery',
    'polki',
    'bridal collection',
    'earrings',
    'necklaces',
    'rings',
    'bangles',
  ],
};

function ProductListingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-4 border-b border-champagne/60 bg-ivory/40">
        <div className="container-custom flex items-center gap-2">
          <div className="h-4 w-24 bg-border-soft/60 rounded animate-pulse" />
          <div className="h-4 w-4 bg-border-soft/60 rounded animate-pulse" />
          <div className="h-4 w-32 bg-border-soft/60 rounded animate-pulse" />
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="mb-8 pb-6 border-b border-champagne">
          <div className="h-6 w-36 bg-champagne/40 rounded-full animate-pulse mb-3" />
          <div className="h-10 w-64 bg-border-soft/60 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 max-w-full bg-border-soft/40 rounded animate-pulse" />
        </div>

        <div className="flex gap-8 items-start">
          <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-[136px] self-start">
            <div className="h-96 w-full bg-ivory border border-border-soft/60 rounded-2xl animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-ivory border border-border-soft/60 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllJewelleryPage() {
  return (
    <Suspense fallback={<ProductListingFallback />}>
      <ProductListingLayout />
    </Suspense>
  );
}

