import { useState, useMemo } from "react";
import { attractions, categories, neighborhoods, priceLevels } from "@/data/dallasData";
import ListingCard from "@/components/tourism/ListingCard";
import FilterBar from "@/components/tourism/FilterBar";
import artsImg from "@/assets/dallas-arts.jpg";
import dealeyImg from "@/assets/dallas-dealey.jpg";

const imageMap: Record<string, string> = {
  "dallas-arts": artsImg,
  "sixth-floor": dealeyImg,
};

const DallasAttractionsPage = () => {
  const [category, setCategory] = useState("All");
  const [neighborhood, setNeighborhood] = useState("All");
  const [price, setPrice] = useState(-1);

  const filtered = useMemo(() => {
    return attractions.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (neighborhood !== "All" && a.neighborhood !== neighborhood) return false;
      if (price >= 0 && a.priceLevel !== price) return false;
      return true;
    });
  }, [category, neighborhood, price]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-display font-bold">Things to Do in Dallas</h1>
        <p className="text-muted-foreground mt-1">Discover {attractions.length} amazing attractions, landmarks, and experiences</p>
      </div>

      <FilterBar
        categories={categories.attractions}
        activeCategory={category}
        onCategoryChange={setCategory}
        neighborhoods={neighborhoods}
        activeNeighborhood={neighborhood}
        onNeighborhoodChange={setNeighborhood}
        priceLevels={priceLevels}
        activePrice={price}
        onPriceChange={setPrice}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {filtered.map((attr, i) => (
          <ListingCard
            key={attr.id}
            id={attr.id}
            name={attr.name}
            image={imageMap[attr.id] || attr.image}
            category={attr.category}
            neighborhood={attr.neighborhood}
            rating={attr.rating}
            reviewCount={attr.reviewCount}
            priceLabel={attr.price}
            description={attr.description}
            tags={attr.tags}
            linkPrefix="/dallas/attractions"
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-display font-semibold">No attractions match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default DallasAttractionsPage;
