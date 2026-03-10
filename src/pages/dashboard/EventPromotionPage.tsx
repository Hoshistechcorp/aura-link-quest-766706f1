import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, Eye, TrendingUp, ArrowUpRight, DollarSign,
  Megaphone, Star, Image, Search,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const kpis = [
  { label: "Featured Events", value: "8", change: "+2", icon: CalendarDays },
  { label: "Total Reach", value: "1.4M", change: "+32%", icon: Eye },
  { label: "RSVPs from Promos", value: "12.8K", change: "+41%", icon: TrendingUp },
  { label: "Promo Revenue", value: "$18,200", change: "+19%", icon: DollarSign },
];

interface PromoEvent {
  id: string;
  name: string;
  date: string;
  attendees: string;
  featured: boolean;
  highlightBanner: boolean;
  priority: boolean;
  status: "live" | "upcoming" | "ended";
}

const initialEvents: PromoEvent[] = [
  { id: "1", name: "Atlanta Jazz Festival", date: "May 24–26", attendees: "250K+", featured: true, highlightBanner: true, priority: true, status: "upcoming" },
  { id: "2", name: "Dragon Con", date: "Sep 4–7", attendees: "85K+", featured: true, highlightBanner: false, priority: true, status: "upcoming" },
  { id: "3", name: "Music Midtown", date: "Sep 19–20", attendees: "100K+", featured: false, highlightBanner: false, priority: false, status: "upcoming" },
  { id: "4", name: "ATL Food & Wine Festival", date: "Jun 5–8", attendees: "20K+", featured: true, highlightBanner: true, priority: false, status: "upcoming" },
  { id: "5", name: "Peachtree Road Race", date: "Jul 4", attendees: "60K", featured: true, highlightBanner: false, priority: true, status: "upcoming" },
  { id: "6", name: "Dogwood Festival", date: "Apr 11–13", attendees: "35K+", featured: false, highlightBanner: false, priority: false, status: "upcoming" },
  { id: "7", name: "Holiday Lights at Botanical Garden", date: "Nov 15–Jan 4", attendees: "120K+", featured: true, highlightBanner: true, priority: true, status: "upcoming" },
];

const statusStyles: Record<string, string> = {
  live: "bg-aura-success/15 text-aura-success",
  upcoming: "bg-aura-info/15 text-aura-info",
  ended: "bg-muted text-muted-foreground",
};

const EventPromotionPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");

  const toggleField = (id: string, field: "featured" | "highlightBanner" | "priority") => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, [field]: !e[field] } : e));
    const event = events.find((e) => e.id === id);
    const labels = { featured: "Feature Event", highlightBanner: "Highlight Banner", priority: "Priority Listing" };
    toast({ title: `${labels[field]} toggled`, description: event?.name });
  };

  const filtered = events.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Event Promotion" subtitle="Monetization · Feature events and manage promotion campaigns">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-aura-info/10 flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-aura-info" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-aura-success">
                <ArrowUpRight className="w-3 h-3" />{kpi.change}
              </span>
            </div>
            <div className="text-2xl font-display font-bold">{kpi.value}</div>
            <div className="text-xs text-muted-foreground">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-9 pr-3 py-2 rounded-xl border bg-background text-sm"
        />
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filtered.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-5 rounded-2xl bg-card border shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aura-info/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-aura-info" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm">{e.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>📅 {e.date}</span>
                    <span>👥 {e.attendees}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${statusStyles[e.status]}`}>
                {e.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <div className="text-xs font-medium">Feature Event</div>
                  <div className="text-[10px] text-muted-foreground">Top placement</div>
                </div>
                <Switch checked={e.featured} onCheckedChange={() => toggleField(e.id, "featured")} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <div className="text-xs font-medium">Banner</div>
                  <div className="text-[10px] text-muted-foreground">Highlight strip</div>
                </div>
                <Switch checked={e.highlightBanner} onCheckedChange={() => toggleField(e.id, "highlightBanner")} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <div className="text-xs font-medium">Priority</div>
                  <div className="text-[10px] text-muted-foreground">Top of list</div>
                </div>
                <Switch checked={e.priority} onCheckedChange={() => toggleField(e.id, "priority")} />
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">No events match your search.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventPromotionPage;
