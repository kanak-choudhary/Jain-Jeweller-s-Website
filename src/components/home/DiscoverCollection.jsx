import CollectionDiscoverCard from './CollectionDiscoverCard';
import discoverData from '@/data/discoverCollections.json';

export default function DiscoverCollection() {
  const { sectionHeader, collections } = discoverData;

  return (
    <section
      id="discover-collection"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-ivory/30 to-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="discover-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-3">
            {sectionHeader.eyebrow}
          </p>
          <h2
            id="discover-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
        </div>

        {/* 4-Card Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collections.map((collection) => (
            <CollectionDiscoverCard
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

