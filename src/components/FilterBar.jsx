import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function FilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalResults,
  onResetFilters,
  isFiltered
}) {
  return (
    <div className="filter-bar-container">
      {/* Category Pills */}
      <div className="category-scroll-container">
        <div className="category-pills">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`category-pill-btn ${isActive ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort & Count Controls */}
      <div className="filter-meta-controls">
        <div className="filter-result-count">
          <span>{totalResults}</span> {totalResults === 1 ? 'product' : 'curated products'}
          {isFiltered && (
            <button onClick={onResetFilters} className="filter-reset-link">
              (Clear filters)
            </button>
          )}
        </div>

        <div className="sort-dropdown-wrapper">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <label htmlFor="sort-select" className="sr-only">Sort products</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
