import ExperienceServiceCard from './ExperienceServiceCard';
import experienceData from '@/data/jainExperience.json';

export default function JainExperience() {
  const { sectionHeader, services } = experienceData;

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-soft-border/60"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h2
            id="experience-heading"
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight"
          >
            {sectionHeader.title || 'Jain Experience'}
          </h2>
          {sectionHeader.subtitle && (
            <p className="font-serif italic text-base sm:text-lg text-muted font-normal mt-2.5 sm:mt-3">
              {sectionHeader.subtitle}
            </p>
          )}
        </div>

        {/* Clean 3-Column × 2-Row Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="w-full transition-all duration-700 ease-out motion-reduce:transform-none"
            >
              <ExperienceServiceCard service={service} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
