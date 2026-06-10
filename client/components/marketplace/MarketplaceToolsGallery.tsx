'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { toolService } from '@/services/tool.service';
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
  categories: any[];
}

export default function MarketplaceToolsGallery({ selectedCategory, searchQuery, categories }: MarketplaceToolsGalleryProps) {
  const { ref, isInView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  // Find category ID
  const selectedCat = categories.find(cat => cat.name === selectedCategory);
  const categoryId = selectedCat && selectedCat.id !== 'all' ? selectedCat.id : undefined;

  // Fetch tools from API
  const { data: toolsData, isLoading } = useQuery({
    queryKey: ['marketplace-tools', categoryId, searchQuery, currentPage],
    queryFn: () => toolService.getAllTools({
      category_id: categoryId,
      search: searchQuery || undefined,
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
    }),
  });

  const tools = toolsData?.data?.data || toolsData?.data?.records || [];
  const pagination = toolsData?.data;

  // Reset to page 1 whenever filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avatar-accent"></div>
      </div>
    );
  }

  return (
    <section ref={ref}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm text-avatar-slate">
          Showing{' '}
          <span className="font-semibold text-avatar-dark">{pagination?.totalRecords || 0}</span> tool
          {pagination?.totalRecords !== 1 ? 's' : ''}
          {selectedCategory !== 'All Tools' && (
            <>
              {' '}in{' '}
              <span className="font-semibold text-avatar-accent">{selectedCategory}</span>
            </>
          )}
        </p>
        <select className="text-sm border border-avatar-light rounded-lg px-3 py-1.5 text-avatar-slate bg-white focus:outline-none focus:ring-2 focus:ring-avatar-accent/20 focus:border-avatar-accent transition-all">
          <option>Sort by: Newest</option>
          <option>Sort by: Popular</option>
          <option>Sort by: Rating</option>
        </select>
      </div>

      {/* Cards grid */}
      {tools.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {tools.map((tool: any, index: number) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border border-avatar-light/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(44,62,90,0.12)] transition-all duration-350 flex flex-col overflow-hidden ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Card image */}
              <div className="relative h-44 w-full overflow-hidden bg-avatar-ice">
                {tool.logo_url || (tool.images && tool.images[0]) ? (
                  <img
                    src={tool.images?.[0]?.image_url || tool.logo_url}
                    alt={tool.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-avatar-ice to-avatar-light">
                    <i className="fas fa-robot text-4xl text-avatar-accent opacity-50"></i>
                  </div>
                )}
                {/* Badge for new tools */}
                {tool.total_views === 0 && (
                  <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm bg-emerald-100 text-emerald-700">
                    New
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-avatar-ice rounded-xl flex items-center justify-center flex-shrink-0">
                    {tool.logo_url ? (
                      <img src={tool.logo_url} alt="" className="w-6 h-6 object-contain" />
                    ) : (
                      <i className="fas fa-robot text-avatar-accent"></i>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-avatar-dark text-base leading-tight">
                      {tool.name}
                    </h3>
                    <span className="text-xs font-medium text-avatar-accent bg-avatar-ice px-2 py-0.5 rounded-full mt-1 inline-block">
                      {tool.category?.name || 'AI Tool'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-avatar-slate leading-relaxed mb-4 flex-1 line-clamp-3">
                  {tool.short_description || tool.full_description || 'No description available'}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={tool.average_rating || 0} />
                  <span className="text-xs font-semibold text-avatar-dark">
                    {tool.average_rating?.toFixed(1) || '0.0'}
                  </span>
                  <span className="text-xs text-avatar-steel">
                    ({tool.total_reviews || 0} reviews)
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-avatar-light/60">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-avatar-dark text-base">
                      {tool.pricing_model === 'FREE' ? 'Free' : 
                       tool.pricing_plans?.[0] ? `$${tool.pricing_plans[0].price}/${tool.pricing_plans[0].billing_cycle.toLowerCase()}` : 
                       'View Pricing'}
                    </span>
                    {tool.pricing_model && tool.pricing_model !== 'FREE' && (
                      <span className="text-xs text-avatar-steel">{tool.pricing_model}</span>
                    )}
                  </div>
                  <Link
                    href={`/marketplace/${tool.slug || tool.id}`}
                    className="inline-flex items-center gap-1.5 bg-avatar-accent text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-avatar-deep transition-colors"
                  >
                    View Details <i className="fas fa-arrow-right text-xs"></i>
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
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={!pagination.hasPreviousPage}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-avatar-light text-avatar-slate hover:border-avatar-accent hover:text-avatar-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-avatar-light disabled:hover:text-avatar-slate"
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>

          {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
            let pageNum;
            if (pagination.totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  currentPage === pageNum
                    ? 'bg-avatar-accent text-white shadow-sm'
                    : 'border border-avatar-light text-avatar-slate hover:border-avatar-accent hover:text-avatar-accent'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={!pagination.hasNextPage}
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
          href="/contact"
          className="inline-flex items-center gap-2 bg-avatar-dark text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-avatar-deep transition-colors"
        >
          Request a Custom AI Tool <i className="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </section>
  );
}
