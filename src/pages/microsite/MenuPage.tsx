import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Leaf, Award, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const getBadgeForCategory = (cat: string) => {
  switch (cat) {
    case "Southern Classics": return "Must-Try";
    case "BBQ": return "Local Favorite";
    case "International": return "Trending";
    case "Desserts": return "Sweet Treat";
    default: return cat;
  }
};

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "Must-Try": case "Popular": return <Flame className="w-3 h-3" />;
    case "Sweet Treat": case "Hidden Gem": return <Leaf className="w-3 h-3" />;
    case "Local Favorite": case "Trending": return <Award className="w-3 h-3" />;
    default: return null;
  }
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const cuisineItems = getItems("cuisine");

  // Group by category
  const categories = [...new Set(cuisineItems.map((c) => c.category))];
  const totalDishes = cuisineItems.length;

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Local Cuisine Guide</h1>
      </div>

      <div className="mx-4 mt-4 p-3 rounded-2xl bg-primary/5 border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">🍽️ Foodie Explorer</span>
          <span className="text-xs text-muted-foreground">{totalDishes} dishes to discover</span>
        </div>
        <Progress value={Math.min(100, (totalDishes / 15) * 100)} className="h-2" />
      </div>

      {categories.map((category, si) => {
        const items = cuisineItems.filter((c) => c.category === category);
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="px-4 mt-6"
          >
            <h2 className="aura-section-title mb-3">{category}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-2xl bg-card shadow-sm border">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.popular && <span className="text-xs text-aura-success">⭐ Must-Try</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                    {item.restaurant && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{item.restaurant}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="aura-badge aura-badge-gold flex items-center gap-1">
                        {getBadgeIcon(getBadgeForCategory(item.category))}
                        {getBadgeForCategory(item.category)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary">${item.price}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
      <div className="h-8" />
    </div>
  );
};

export default MenuPage;
