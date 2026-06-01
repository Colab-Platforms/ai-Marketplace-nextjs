'use client';

const popularTags = [
  'Customer Support',
  'Sales AI',
  'HR Automation',
  'Marketing',
  'Analytics',
  'Content AI',
  'Finance',
  'Productivity',
];

interface MarketplaceSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function MarketplaceSearch({ searchQuery, onSearch }: MarketplaceSearchProps) {
  return (
    <section className="py-10 bg-white border-b border-avatar-light" id="search">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative mb-5">
            <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-avatar-steel text-sm pointer-events-none"></i>
            <input
              type="text"
              placeholder="Search AI tools, agents, categories..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-full border border-avatar-light bg-avatar-ice text-avatar-dark placeholder:text-avatar-steel text-sm focus:outline-none focus:ring-2 focus:ring-avatar-accent/25 focus:border-avatar-accent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-dark transition-colors"
                aria-label="Clear search"
              >
                <i className="fas fa-xmark text-sm"></i>
              </button>
            )}
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-xs text-avatar-steel font-medium">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearch(tag)}
                className="text-xs px-3 py-1.5 rounded-full border border-avatar-light bg-white text-avatar-slate hover:bg-avatar-ice hover:border-avatar-accent/40 hover:text-avatar-accent transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
