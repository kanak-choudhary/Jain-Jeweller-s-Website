import { Gem, Crown, HeartHandshake, Sparkles } from 'lucide-react';

const iconMap = {
  Gem,
  Crown,
  HeartHandshake,
  Sparkles,
};

export default function ExperiencePillarCard({ pillar }) {
  const { number, icon, title, description } = pillar;
  const IconComponent = iconMap[icon] || Sparkles;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-soft-border/80 hover:border-gold/50 shadow-xs hover:shadow-md transition-all duration-300 p-6 sm:p-7">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-champagne/40 border border-gold/30 flex items-center justify-center text-burgundy group-hover:scale-105 transition-transform duration-300 motion-reduce:transform-none">
            <IconComponent className="w-5 h-5 text-burgundy" />
          </div>
          <span className="font-playfair text-xs font-bold tracking-widest text-gold px-2.5 py-1 rounded-full bg-champagne/30 border border-gold/20">
            {number}
          </span>
        </div>

        <h3 className="font-playfair text-lg font-bold text-charcoal group-hover:text-burgundy transition-colors duration-300">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

