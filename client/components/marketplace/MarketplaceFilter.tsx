'use client';

const priceRanges = ['Under ₹2,000/mo', '₹2,000 – ₹5,000/mo', '₹5,000+/mo', 'Free Trial Available'];
const ratingFilters = ['4.5★ & above', '4.0★ & above', '3.5★ & above'];

interface MarketplaceFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: any[];
}

export default function MarketplaceFilter({ selectedCategory, onCategoryChange, categories }: MarketplaceFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-avatar-light/60 p-5 sticky top-24">
      {/* Categories */}
      <h3 className="font-display font-bold text-xs text-avatar-dark uppercase tracking-widest mb-3">
        Categories
      </h3>
      <ul className="space-y-0.5 mb-5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <li key={cat.id || cat.name}>
              <button
                onClick={() => onCategoryChange(cat.name)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-avatar-accent text-white font-semibold'
                    : 'text-avatar-slate hover:bg-avatar-ice hover:text-avatar-dark'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <i
                    className={`fas ${cat.icon || 'fa-robot'} text-xs w-4 text-center ${
                      isActive ? 'text-white' : 'text-avatar-steel'
                    }`}
                  ></i>
                  {cat.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Price Range */}
      <div className="border-t border-avatar-light pt-5 mb-5">
        <h3 className="font-display font-bold text-xs text-avatar-dark uppercase tracking-widest mb-3">
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <label
              key={price}
              className="flex items-center gap-2.5 cursor-pointer text-sm text-avatar-slate hover:text-avatar-dark transition-colors"
            >
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-avatar-light accent-avatar-accent cursor-pointer"
              />
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-avatar-light pt-5">
        <h3 className="font-display font-bold text-xs text-avatar-dark uppercase tracking-widest mb-3">
          Rating
        </h3>
        <div className="space-y-2">
          {ratingFilters.map((r) => (
            <label
              key={r}
              className="flex items-center gap-2.5 cursor-pointer text-sm text-avatar-slate hover:text-avatar-dark transition-colors"
            >
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-avatar-light accent-avatar-accent cursor-pointer"
              />
              {r}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
