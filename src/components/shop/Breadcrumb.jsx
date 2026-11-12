'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({
  categoryTitle,
  totalCount,
  basePath = '/all-jewellery',
  baseLabel = 'All Jewellery',
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 border-b border-champagne/60 bg-ivory/40">
      <div className="container-custom flex items-center justify-between text-xs">
        <ol className="flex items-center space-x-2 text-muted list-none m-0 p-0 overflow-x-auto">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-burgundy transition-colors text-muted hover:underline underline-offset-4"
            >
              <Home className="w-3.5 h-3.5 text-gold" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-border-soft" />
            {categoryTitle ? (
              <Link
                href={basePath}
                className="hover:text-burgundy transition-colors text-muted hover:underline underline-offset-4"
              >
                {baseLabel}
              </Link>
            ) : (
              <span className="text-charcoal font-semibold" aria-current="page">
                {baseLabel}
              </span>
            )}
          </li>
          {categoryTitle && (
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-border-soft" />
              <span className="text-burgundy font-semibold capitalize" aria-current="page">
                {categoryTitle}
              </span>
            </li>
          )}
        </ol>

        {typeof totalCount === 'number' && (
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-muted font-medium">
            Showing <strong className="text-charcoal font-semibold">{totalCount}</strong> pieces
          </span>
        )}
      </div>
    </nav>
  );
}
