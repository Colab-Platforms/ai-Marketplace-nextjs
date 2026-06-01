'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { tools } from '@/data/marketplace';
import { useInView } from '@/hooks/useInView';

const ITEMS_PER_PAGE = 9;

const badgeColors: Record<string, string> = {
  Popular: 'bg-amber-100 text-amber-700',
  New: 'bg-emerald-100 text-emerald-700',
  'Top Rated': 'bg-purple-100 text-purple-700',
  Enterprise: 'bg-blue-100 text-blue-700',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star text-xs ${
            star <= Math.floor(rating)
              ? 'text-amber-400'
              : star - 0.5 <= rating
              ? 'text-amber-300'
              : 'text-avatar-light'
          }`}
        ></i>
      ))}
    </div>
  );
}

interface MarketplaceToolsGalleryProps {
  selectedCategory: string;
  searchQuery: string;
}

export default function MarketplaceToolsGallery({ selectedCategory, searchQuery }: MarketplaceToolsGalleryProps) {
  const { ref, isInView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'All Tools' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 whenever filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <section ref={ref}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm text-avatar-slate">
          Showing{' '}
          <span className="font-semibold text-avatar-dark">{filtered.length}</span> tool
          {filtered.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All Tools' && (
            <>
              {' '}in{' '}
              <span className="font-semibold text-avatar-accent">{selectedCategory}</span>
            </>
          )}
        </p>
        <select className="text-sm border border-avatar-light rounded-lg px-3 py-1.5 text-avatar-slate bg-white focus:outline-none focus:ring-2 focus:ring-avatar-accent/20 focus:border-avatar-accent transition-all">
          <option>Sort by: Popular</option>
          <option>Sort by: Rating</option>
          <option>Sort by: Price — Low to High</option>
          <option>Sort by: Price — High to Low</option>
          <option>Sort by: Newest</option>
        </select>
      </div>

      {/* Cards grid */}
      {paginated.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginated.map((tool, index) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border border-avatar-light/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(44,62,90,0.12)] transition-all duration-350 flex flex-col overflow-hidden ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Card image */}
              <div className="relative h-44 w-full overflow-hidden bg-avatar-ice">
                <img
                  src={tool.image}
                  alt={tool.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge overlaid on image */}
                {tool.badge && (
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                      badgeColors[tool.badge] ?? 'bg-avatar-ice text-avatar-slate'
                    }`}
                  >
                    {tool.badge}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-avatar-ice rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${tool.icon} text-avatar-accent`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-avatar-dark text-base leading-tight">
                      {tool.name}
                    </h3>
                    <span className="text-xs font-medium text-avatar-accent bg-avatar-ice px-2 py-0.5 rounded-full mt-1 inline-block">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-avatar-slate leading-relaxed mb-4 flex-1">
                  {tool.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={tool.rating} />
                  <span className="text-xs font-semibold text-avatar-dark">{tool.rating}</span>
                  <span className="text-xs text-avatar-steel">({tool.reviews} reviews)</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-avatar-light/60">
                  <span className="font-display font-bold text-avatar-dark text-base">
                    {tool.price}
                  </span>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-avatar-accent text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-avatar-navy transition-colors"
                  >
                    Get Started <i className="fas fa-arrow-right text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-avatar-ice rounded-2xl">
          <i className="fas fa-magnifying-glass text-4xl text-avatar-light mb-4 block"></i>
          <h3 className="font-display font-bold text-avatar-dark text-xl mb-2">No tools found</h3>
          <p className="text-avatar-slate text-sm">
            Try adjusting your search or selecting a different category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-avatar-light text-avatar-slate hover:border-avatar-accent hover:text-avatar-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-avatar-light disabled:hover:text-avatar-slate"
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                currentPage === page
                  ? 'bg-avatar-accent text-white shadow-sm'
                  : 'border border-avatar-light text-avatar-slate hover:border-avatar-accent hover:text-avatar-accent'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-avatar-light text-avatar-slate hover:border-avatar-accent hover:text-avatar-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-avatar-light disabled:hover:text-avatar-slate"
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      )}

      {/* Inline CTA */}
      <div className="mt-10 rounded-2xl bg-avatar-ice border border-avatar-light/60 p-8 text-center">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <i className="fas fa-wand-magic-sparkles text-avatar-accent"></i>
        </div>
        <h4 className="font-display font-bold text-avatar-dark text-lg mb-2">
          Don't see the tool you need?
        </h4>
        <p className="text-avatar-slate text-sm mb-5 max-w-sm mx-auto">
          Tell us what you need and our team will build a custom AI agent tailored to your business.
        </p>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 bg-avatar-dark text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-avatar-deep transition-colors"
        >
          Request a Custom AI Tool <i className="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </section>
  );
}
