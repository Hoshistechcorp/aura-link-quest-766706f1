interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  neighborhoods?: string[];
  activeNeighborhood?: string;
  onNeighborhoodChange?: (n: string) => void;
  priceLevels?: { label: string; value: number }[];
  activePrice?: number;
  onPriceChange?: (p: number) => void;
}

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  neighborhoods,
  activeNeighborhood,
  onNeighborhoodChange,
  priceLevels,
  activePrice,
  onPriceChange,
}: FilterBarProps) => {
  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card border text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div className="flex flex-wrap gap-2">
        {neighborhoods && onNeighborhoodChange && (
          <select
            value={activeNeighborhood || "All"}
            onChange={(e) => onNeighborhoodChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-card border text-sm text-foreground"
          >
            {neighborhoods.map((n) => (
              <option key={n} value={n}>{n === "All" ? "All Neighborhoods" : n}</option>
            ))}
          </select>
        )}
        {priceLevels && onPriceChange && (
          <div className="flex gap-1">
            {priceLevels.map((pl) => (
              <button
                key={pl.value}
                onClick={() => onPriceChange(pl.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activePrice === pl.value
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-card border text-foreground hover:bg-muted"
                }`}
              >
                {pl.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
