import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Star, DollarSign, ExternalLink, MapPin } from "lucide-react";

import imgStaplehouse from "@/assets/restaurant-staplehouse.jpg";
import imgBBQ from "@/assets/restaurant-bbq.jpg";

const restaurants = [
  { name: "Staplehouse", cuisine: "New American", rating: 4.9, price: "$$$$", desc: "James Beard-winning restaurant with seasonal tasting menus.", img: imgStaplehouse, area: "Old Fourth Ward", auralink: true },
  { name: "Fox Bros. Bar-B-Q", cuisine: "BBQ", rating: 4.7, price: "$$", desc: "Atlanta's beloved spot for Texas-style barbecue.", img: imgBBQ, area: "Candler Park", auralink: false },
  { name: "Busy Bee Cafe", cuisine: "Soul Food", rating: 4.6, price: "$$", desc: "Iconic soul food restaurant since 1947.", img: imgStaplehouse, area: "Vine City", auralink: false },
  { name: "Gunshow", cuisine: "Asian Fusion", rating: 4.8, price: "$$$", desc: "Unique dim sum-style service with rotating dishes.", img: imgBBQ, area: "Glenwood Park", auralink: true },
  { name: "Ponce City Market Food Hall", cuisine: "Various", rating: 4.5, price: "$$", desc: "Curated food hall with 20+ vendors in a historic building.", img: imgStaplehouse, area: "Old Fourth Ward", auralink: false },
  { name: "Buford Highway Corridor", cuisine: "International", rating: 4.7, price: "$", desc: "Miles of authentic global cuisine from 40+ countries.", img: imgBBQ, area: "Buford Highway", auralink: false },
];

const priceColor = (price: string) => {
  const len = price.length;
  if (len >= 4) return "text-aura-warning";
  if (len >= 3) return "text-primary";
  return "text-muted-foreground";
};

const FoodDiningPage = () => (
  <DestinationSubPage title="Food & Dining">
    <p className="text-sm text-muted-foreground mb-2">Discover Atlanta's world-class dining scene.</p>
    <p className="text-xs text-primary mb-5">🔗 Restaurants using AuraLink are highlighted</p>
    <div className="space-y-4">
      {restaurants.map((r) => (
        <div key={r.name} className={`rounded-2xl border shadow-sm overflow-hidden ${r.auralink ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
          <div className="relative h-36 overflow-hidden">
            <img src={r.img} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">{r.cuisine}</span>
              <span className={`text-sm font-bold ${priceColor(r.price)}`}>{r.price}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold flex items-center gap-1.5">
                  {r.name}
                  {r.auralink && <ExternalLink className="w-3 h-3 text-primary" />}
                </h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {r.area}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-3.5 h-3.5 fill-aura-warning text-aura-warning" />
                <span className="font-medium">{r.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </DestinationSubPage>
);

export default FoodDiningPage;
