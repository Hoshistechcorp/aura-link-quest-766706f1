import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import wagyuImg from "@/assets/dish-wagyu.jpg";
import burrataImg from "@/assets/dish-burrata.jpg";
import ossoBucoImg from "@/assets/dish-ossobuco.jpg";
import aranciniImg from "@/assets/dish-arancini.jpg";
import tiramisuImg from "@/assets/dish-tiramisu.jpg";
import tunaImg from "@/assets/dish-tuna.jpg";

const experiences = [
  { name: "Atlanta BeltLine Walking Tour", bookings: 1842, rating: 4.9, price: 45, tag: "Most Popular", image: wagyuImg },
  { name: "Georgia Aquarium VIP Access", bookings: 1567, rating: 4.8, price: 89, tag: "Fan Favorite", image: burrataImg },
  { name: "MLK Historic District Tour", bookings: 1234, rating: 4.9, price: 35, tag: "Award Winner", image: ossoBucoImg },
  { name: "Stone Mountain Adventure", bookings: 1198, rating: 4.7, price: 55, tag: "Trending", image: aranciniImg },
  { name: "Ponce City Market Food Walk", bookings: 1087, rating: 4.8, price: 65, tag: "Top Rated", image: tiramisuImg },
  { name: "Civil Rights History Tour", bookings: 956, rating: 4.9, price: 40, tag: "Essential", image: tunaImg },
  { name: "Chattahoochee River Kayaking", bookings: 891, rating: 4.6, price: 75, tag: "Adventure" },
  { name: "Atlanta Street Art Walk", bookings: 845, rating: 4.5, price: 30, tag: "Creative" },
  { name: "Sunset Skyline Photography Tour", bookings: 812, rating: 4.8, price: 50, tag: "Unique" },
  { name: "Little Five Points Culture Walk", bookings: 756, rating: 4.6, price: 25, tag: "Local Gem" },
  { name: "Botanical Garden Private Tour", bookings: 723, rating: 4.7, price: 60, tag: "Seasonal" },
  { name: "Fox Theatre Backstage Tour", bookings: 698, rating: 4.5, price: 45, tag: "Exclusive" },
];

const PopularDishesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Top Experiences</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {experiences.map((exp, i) => (
          <motion.div key={exp.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border">
            {"image" in exp && exp.image ? (
              <img src={exp.image} alt={exp.name} className="w-14 h-14 rounded-xl object-cover shrink-0" loading="lazy" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                {i + 1}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{exp.name}</span>
                <span className="aura-badge aura-badge-gold text-[10px] flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" />{exp.tag}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                <span><ThumbsUp className="w-3 h-3 inline mr-0.5" />{exp.bookings.toLocaleString()} bookings</span>
                <span>⭐ {exp.rating}</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-primary">${exp.price}</span>
          </motion.div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default PopularDishesPage;
