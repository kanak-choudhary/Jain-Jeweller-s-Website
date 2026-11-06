import Link from 'next/link';

export default function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-playfair text-base font-bold text-white tracking-wide mb-4 flex items-center gap-2">
        <span>{title}</span>
      </h3>
      <div className="w-8 h-0.5 bg-gold/60 mb-4" />
      <ul className="space-y-2.5" role="list">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-ivory/80 hover:text-gold-light hover:translate-x-0.5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gold rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

