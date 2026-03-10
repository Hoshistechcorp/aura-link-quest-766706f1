import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const reviews = getItems("reviews");

  const getRatingNum = (r: string) => {
    const match = r.match(/^(\d)/);
    return match ? parseInt(match[1]) : 5;
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + getRatingNum(r.rating), 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Traveler Reviews</h1>
      </div>

      {/* Summary */}
      <div className="px-4 mt-4 flex gap-6">
        <div className="text-center">
          <div className="text-4xl font-display font-bold">{avgRating}</div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(Number(avgRating)) ? "fill-aura-warning text-aura-warning" : "text-muted"}`} />
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mt-4 space-y-3">
        {reviews.map((review, i) => {
          const ratingNum = getRatingNum(review.rating);
          const initials = review.reviewer?.split(" ").map((n: string) => n[0]).join("") || "?";
          return (
            <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-card border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">{initials}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{review.reviewer}</div>
                  <div className="text-xs text-muted-foreground">{review.tour || review.date}</div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3 h-3 ${s <= ratingNum ? "fill-aura-warning text-aura-warning" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{review.review}</p>
              {review.verified && <span className="text-[10px] text-aura-success mt-1 block">✓ Verified Review</span>}
            </motion.div>
          );
        })}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default ReviewsPage;
