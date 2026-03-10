import { useState, useMemo } from "react";
import { events, categories } from "@/data/dallasData";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, List, LayoutGrid } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

const DallasEventsPage = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [category, setCategory] = useState("All");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026

  const filtered = useMemo(() => {
    if (category === "All") return events;
    return events.filter((e) => e.category === category);
  }, [category]);

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsInMonth = useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.date);
      return isSameMonth(d, currentMonth);
    });
  }, [currentMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">Events & Festivals</h1>
          <p className="text-muted-foreground mt-1">What's happening in Dallas</p>
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "list" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "calendar" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Calendar
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.events.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat ? "bg-primary text-primary-foreground" : "bg-card border text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {filtered.map((evt, i) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="listing-card p-4 flex gap-4"
            >
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-primary uppercase">
                  {format(new Date(evt.date), "MMM")}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary leading-none">
                  {format(new Date(evt.date), "d")}
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-base">{evt.name}</h3>
                  <span className="text-sm font-semibold text-secondary shrink-0">{evt.price}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{evt.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.venue}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium">{evt.category}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{evt.description}</p>
                <div className="flex gap-1.5">
                  {evt.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-card rounded-xl border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-3 py-1 rounded-lg hover:bg-muted text-sm">← Prev</button>
            <h3 className="font-display font-semibold text-lg">{format(currentMonth, "MMMM yyyy")}</h3>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-3 py-1 rounded-lg hover:bg-muted text-sm">Next →</button>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {/* Padding for first day */}
            {Array.from({ length: monthDays[0].getDay() }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {monthDays.map((day) => {
              const dayEvents = eventsInMonth.filter((e) => isSameDay(new Date(e.date), day));
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[60px] sm:min-h-[80px] p-1 rounded-lg border border-transparent ${
                    dayEvents.length > 0 ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <span className="text-xs font-medium">{format(day, "d")}</span>
                  {dayEvents.map((evt) => (
                    <div key={evt.id} className="mt-0.5 px-1 py-0.5 rounded bg-primary/15 text-primary text-[9px] sm:text-[10px] font-medium truncate">
                      {evt.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DallasEventsPage;
