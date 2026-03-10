import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const StaffPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const guides = getItems("guides");

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Our Tour Guides</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {guides.map((guide, i) => {
          const initials = guide.name?.split(" ").map((n: string) => n[0]).join("") || "?";
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 p-4 rounded-2xl bg-card border"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-display font-bold text-primary">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{guide.name}</div>
                <div className="text-xs text-secondary font-medium">{guide.specialty} Guide</div>
                <p className="text-xs text-muted-foreground mt-1">{guide.bio}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-aura-warning text-aura-warning" />
                    <span className="text-xs font-medium">{guide.rating}</span>
                  </div>
                  {guide.pricePerHour && (
                    <span className="text-xs text-muted-foreground">${guide.pricePerHour}/hr</span>
                  )}
                  <button className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Heart className="w-3 h-3" />
                    Book Guide
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {guides.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No guides added yet.</div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default StaffPage;
