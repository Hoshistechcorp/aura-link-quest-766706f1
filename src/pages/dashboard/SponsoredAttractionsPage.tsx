import { useState } from "react";
import { motion } from "framer-motion";
import {
  Landmark, Eye, TrendingUp, ArrowUpRight, Star,
  DollarSign, Calendar, Search, Filter, MoreHorizontal,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const kpis = [
  { label: "Active Promotions", value: "12", change: "+3", icon: Landmark },
  { label: "Total Impressions", value: "842K", change: "+18%", icon: Eye },
  { label: "Click-Through Rate", value: "4.2%", change: "+0.6%", icon: TrendingUp },
  { label: "Revenue Generated", value: "$24,500", change: "+22%", icon: DollarSign },
];

interface Attraction {
  id: string;
  name: string;
  rating: number;
  views: string;
  featured: boolean;
  campaignDays: number;
  spend: string;
  status: "active" | "paused" | "scheduled";
}

const initialAttractions: Attraction[] = [
  { id: "1", name: "Georgia Aquarium", rating: 4.8, views: "245K", featured: true, campaignDays: 30, spend: "$4,200", status: "active" },
  { id: "2", name: "World of Coca-Cola", rating: 4.5, views: "176K", featured: true, campaignDays: 14, spend: "$2,800", status: "active" },
  { id: "3", name: "Atlanta Botanical Garden", rating: 4.7, views: "142K", featured: false, campaignDays: 0, spend: "$0", status: "paused" },
  { id: "4", name: "High Museum of Art", rating: 4.7, views: "115K", featured: true, campaignDays: 21, spend: "$3,100", status: "active" },
  { id: "5", name: "Stone Mountain Park", rating: 4.6, views: "98K", featured: false, campaignDays: 7, spend: "$1,200", status: "scheduled" },
  { id: "6", name: "Fox Theatre", rating: 4.8, views: "87K", featured: false, campaignDays: 0, spend: "$0", status: "paused" },
  { id: "7", name: "Centennial Olympic Park", rating: 4.6, views: "128K", featured: true, campaignDays: 30, spend: "$3,600", status: "active" },
  { id: "8", name: "MLK National Historic Park", rating: 4.9, views: "198K", featured: false, campaignDays: 0, spend: "$0", status: "paused" },
];

const statusStyles: Record<string, string> = {
  active: "bg-aura-success/15 text-aura-success",
  paused: "bg-muted text-muted-foreground",
  scheduled: "bg-aura-info/15 text-aura-info",
};

const SponsoredAttractionsPage = () => {
  const [attractions, setAttractions] = useState(initialAttractions);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused" | "scheduled">("all");

  const toggleFeatured = (id: string) => {
    setAttractions((prev) =>
      prev.map((a) => a.id === id ? { ...a, featured: !a.featured, status: !a.featured ? "active" : "paused" } : a)
    );
    const attraction = attractions.find((a) => a.id === id);
    toast({
      title: attraction?.featured ? "Promotion paused" : "Promotion activated ✨",
      description: attraction?.name,
    });
  };

  const filtered = attractions
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Sponsored Attractions" subtitle="Monetization · Promote attractions with featured placements">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-primary" />
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search attractions..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border bg-background text-sm"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "active", "paused", "scheduled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Attractions List */}
      <div className="p-5 rounded-2xl bg-card border shadow-sm">
        <div className="hidden lg:grid lg:grid-cols-7 gap-3 px-3 pb-3 text-xs font-medium text-muted-foreground border-b">
          <span className="col-span-2">Attraction</span>
          <span className="text-center">Views</span>
          <span className="text-center">Featured</span>
          <span className="text-center">Campaign</span>
          <span className="text-center">Spend</span>
          <span className="text-center">Status</span>
        </div>

        <div className="space-y-1 mt-2">
          {filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors lg:grid lg:grid-cols-7"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 lg:col-span-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-aura-warning text-aura-warning" /> {a.rating}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block text-sm text-center text-muted-foreground">{a.views}</div>

              <div className="hidden lg:flex justify-center">
                <Switch checked={a.featured} onCheckedChange={() => toggleFeatured(a.id)} />
              </div>

              <div className="hidden lg:block text-sm text-center text-muted-foreground">
                {a.campaignDays > 0 ? `${a.campaignDays} days` : "—"}
              </div>

              <div className="hidden lg:block text-sm text-center font-medium">{a.spend}</div>

              <div className="flex items-center gap-2 lg:justify-center">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[a.status]}`}>
                  {a.status}
                </span>
                {/* Mobile toggle */}
                <div className="lg:hidden">
                  <Switch checked={a.featured} onCheckedChange={() => toggleFeatured(a.id)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">No attractions match your filter.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SponsoredAttractionsPage;
