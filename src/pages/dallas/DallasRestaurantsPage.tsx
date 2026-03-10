import { useState, useMemo } from "react";
import { restaurants, categories, neighborhoods, priceLevels } from "@/data/dallasData";
import ListingCard from "@/components/tourism/ListingCard";
import FilterBar from "@/components/tourism/FilterBar";
import bbqImg from "@/assets/dallas-bbq.jpg";

const imageMap: Record<string, string> = {
  "pecan-lodge": bbqImg,
};

const DallasRestaurantsPage = () => {
  const [category, setCategory] = useState("All");
  const [neighborhood, setNeighborhood] = useState("All");
  const [price, setPrice] = useState(-1);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (category !== "All" && r.cuisine !== category) return false;
      if (neighborhood !== "All" && r.neighborhood !== neighborhood) return false;
      if (price >= 0 && r.priceLevel !== price) return false;
      return true;
    });
  }, [category, neighborhood, price]);

  const priceLabel = (level: number) => level === 0 ? "Free" : "$".repeat(level);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-display font-bold">Eat & Drink in Dallas</h1>
        <p className="text-muted-foreground mt-1">From legendary BBQ to innovative fine dining</p>
      </div>

      <FilterBar
        categories={categories.restaurants}
        activeCategory={category}
        onCategoryChange={setCategory}
        neighborhoods={neighborhoods}
        activeNeighborhood={neighborhood}
        onNeighborhoodChange={setNeighborhood}
        priceLevels={priceLevels.filter(p => p.value !== 0)}
        activePrice={price}
        onPriceChange={setPrice}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((r, i) => (
          <ListingCard
            key={r.id}
            id={r.id}
            name={r.name}
            image={imageMap[r.id] || r.image}
            category={r.cuisine}
            neighborhood={r.neighborhood}
            rating={r.rating}
            reviewCount={r.reviewCount}
            priceLabel={priceLabel(r.priceLevel)}
            description={r.description}
            tags={r.tags}
            linkPrefix="/dallas/restaurants"
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-display font-semibold">No restaurants match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default DallasRestaurantsPage;
