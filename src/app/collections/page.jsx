import allProductsData from '@/data/products.json';
import { collectionsCampaigns } from '@/data/collectionsData';
import CollectionCampaignSection from '@/components/collections/CollectionCampaignSection';

export const metadata = {
  title: 'Curated Fine Jewellery Collections | Jain Jewellers',
  description:
    'Discover signature editorial collections from Jain Jewellers. Explore Station Mangalsutra, Floral Bloom, and The Italian Connection handcrafted with BIS hallmarked gold and certified diamonds.',
  keywords: [
    'jain jewellers',
    'collections',
    'station mangalsutra',
    'floral bloom',
    'the italian connection',
    'gold jewellery',
    'diamond jewellery',
  ],
};

export default function CollectionsPage() {
  // Create quick lookup map for products by ID
  const productsMap = new Map(allProductsData.map((p) => [p.id, p]));

  return (
    <div className="min-h-screen bg-white pb-16 sm:pb-20 lg:pb-24">
      {/* 3 Vertically Stacked Campaign Sections (Full-Width Edge-to-Edge Banners) */}
      <main id="collections-main">
        {collectionsCampaigns.map((campaign) => {
          const sectionProducts = campaign.productIds
            .map((id) => productsMap.get(id))
            .filter(Boolean);

          return (
            <CollectionCampaignSection
              key={campaign.id}
              campaign={campaign}
              products={sectionProducts}
            />
          );
        })}
      </main>
    </div>
  );
}

