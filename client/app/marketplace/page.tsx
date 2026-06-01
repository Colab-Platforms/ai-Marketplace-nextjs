'use client';

import { useState } from 'react';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import MarketplaceSearch from '@/components/marketplace/MarketplaceSearch';
import MarketplaceFilter from '@/components/marketplace/MarketplaceFilter';
import MarketplaceToolsGallery from '@/components/marketplace/MarketplaceToolsGallery';
import MarketplaceCTA from '@/components/marketplace/MarketplaceCTA';
import { categories } from '@/data/marketplace';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <MarketplaceHero />
      <MarketplaceSearch searchQuery={searchQuery} onSearch={setSearchQuery} />

      {/* Browse section — sidebar + grid */}
      <section className="py-12 lg:py-16 bg-white" id="browse">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Mobile category tabs */}
          <div className="lg:hidden mb-6 -mx-1">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-avatar-accent text-white'
                      : 'bg-avatar-ice border border-avatar-light text-avatar-slate hover:border-avatar-accent/40 hover:text-avatar-accent'
                  }`}
                >
                  <i className={`fas ${cat.icon} text-xs`}></i>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* Sidebar filter — desktop only */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <MarketplaceFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </aside>

            {/* Tools grid */}
            <div className="flex-1 min-w-0">
              <MarketplaceToolsGallery
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </section>

      <MarketplaceCTA />
    </>
  );
}
