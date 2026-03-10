import { useState, useMemo } from "react";
import { hotels, categories, neighborhoods, priceLevels } from "@/data/dallasData";
import ListingCard from "@/components/tourism/ListingCard";
import FilterBar from "@/components/tourism/FilterBar";
import hotelImg from "@/assets/dallas-hotel.jpg";

const imageMap: Record<string, string> = {
  "joule": hotelImg,
};

const DallasHotelsPage = () => {
  const [category, setCategory] = useState("All");
  const [neighborhood, setNeighborhood] = useState("All");
  const [price, setPrice] = useState(-1);

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (category !== "All" && h.category !== category) return false;
      if (neighborhood !== "All" && h.neighborhood !== neighborhood) return false;
      if (price >= 0 && h.priceLevel !== price) return false;
      return true;
    });
  }, [category, neighborhood, price]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-display font-bold">Where to Stay in Dallas</h1>
        <p className="text-muted-foreground mt-1">Find your perfect accommodation, from luxury to value</p>
      </div>

      <FilterBar
        categories={categories.hotels}
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
        {filtered.map((h, i) => (
          <ListingCard
            key={h.id}
            id={h.id}
            name={h.name}
            image={imageMap[h.id] || h.image}
            category={h.category}
            neighborhood={h.neighborhood}
            rating={h.rating}
            reviewCount={h.reviewCount}
            priceLabel={`From $${h.pricePerNight}/night`}
            description={h.description}
            tags={h.amenities.slice(0, 3)}
            linkPrefix="/dallas/hotels"
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-display font-semibold">No hotels match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default DallasHotelsPage;
