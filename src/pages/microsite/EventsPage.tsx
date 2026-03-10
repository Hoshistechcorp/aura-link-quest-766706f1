import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const EventsPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const tours = getItems("upcomingTours");

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Upcoming Tours</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {tours.map((tour, i) => (
          <motion.div key={tour.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl bg-card border space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm">{tour.name}</h3>
              {tour.spotsLeft && (
                <span className="aura-badge aura-badge-warning text-[10px] shrink-0">{tour.spotsLeft} spots left</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{tour.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {tour.date && <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{new Date(tour.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
              {tour.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.time}</span>}
              {tour.meetingPoint && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{tour.meetingPoint}</span>}
            </div>
            <div className="flex items-center justify-between mt-1">
              {tour.price && <span className="text-sm font-bold text-primary">${tour.price}</span>}
              <button className="py-2 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                Book Tour
              </button>
            </div>
          </motion.div>
        ))}
        {tours.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No upcoming tours scheduled yet.</div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default EventsPage;
