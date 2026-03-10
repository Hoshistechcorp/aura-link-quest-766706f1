import { useState } from "react";
import { motion } from "framer-motion";
import {
  Store, Eye, TrendingUp, ArrowUpRight, DollarSign,
  Star, MapPin, Search, ExternalLink,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const kpis = [
  { label: "Listed Businesses", value: "184", change: "+14", icon: Store },
  { label: "Promoted Listings", value: "32", change: "+6", icon: TrendingUp },
  { label: "Listing Impressions", value: "520K", change: "+27%", icon: Eye },
  { label: "Promo Revenue", value: "$12,800", change: "+15%", icon: DollarSign },
];

interface Business {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  featured: boolean;
  sponsored: boolean;
  impressions: string;
  status: "active" | "pending" | "expired";
}

const initialBusinesses: Business[] = [
  { id: "1", name: "Ponce City Market", category: "Food Hall", area: "Old Fourth Ward", rating: 4.7, featured: true, sponsored: true, impressions: "42K", status: "active" },
  { id: "2", name: "Krog Street Market", category: "Market", area: "Inman Park", rating: 4.6, featured: true, sponsored: false, impressions: "38K", status: "active" },
  { id: "3", name: "Sweet Auburn Market", category: "Market", area: "Sweet Auburn", rating: 4.5, featured: false, sponsored: false, impressions: "22K", status: "pending" },
  { id: "4", name: "The Clermont Lounge", category: "Nightlife", area: "Poncey-Highland", rating: 4.3, featured: false, sponsored: true, impressions: "18K", status: "active" },
  { id: "5", name: "Atlanta Beltline Bikes", category: "Recreation", area: "Midtown", rating: 4.8, featured: true, sponsored: true, impressions: "56K", status: "active" },
  { id: "6", name: "Piedmont Park Farmers Market", category: "Market", area: "Midtown", rating: 4.6, featured: false, sponsored: false, impressions: "15K", status: "expired" },
  { id: "7", name: "Little Five Points Shops", category: "Retail", area: "Little Five Points", rating: 4.4, featured: true, sponsored: false, impressions: "31K", status: "active" },
  { id: "8", name: "Buford Highway Food Corridor", category: "Dining", area: "Buford Highway", rating: 4.7, featured: false, sponsored: true, impressions: "48K", status: "active" },
];

const statusStyles: Record<string, string> = {
  active: "bg-aura-success/15 text-aura-success",
  pending: "bg-aura-warning/15 text-aura-warning",
  expired: "bg-muted text-muted-foreground",
};

const BusinessPromotionPage = () => {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const categories = ["all", ...new Set(initialBusinesses.map((b) => b.category))];

  const toggleField = (id: string, field: "featured" | "sponsored") => {
    setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, [field]: !b[field] } : b));
    const biz = businesses.find((b) => b.id === id);
    toast({
      title: `${field === "featured" ? "Featured Listing" : "Sponsored Placement"} toggled`,
      description: biz?.name,
    });
  };

  const filtered = businesses
    .filter((b) => filterCat === "all" || b.category === filterCat)
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Business Promotion" subtitle="Monetization · Promote local businesses with featured & sponsored placements">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-aura-warning/10 flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-aura-warning" />
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
            placeholder="Search businesses..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border bg-background text-sm"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                filterCat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Business Cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-5 rounded-2xl bg-card border shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aura-warning/10 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5 text-aura-warning" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm">{b.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{b.category}</span>
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{b.area}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${statusStyles[b.status]}`}>
                {b.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-aura-warning text-aura-warning" /> {b.rating}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {b.impressions}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                <span className="text-xs font-medium">Featured</span>
                <Switch checked={b.featured} onCheckedChange={() => toggleField(b.id, "featured")} />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                <span className="text-xs font-medium">Sponsored</span>
                <Switch checked={b.sponsored} onCheckedChange={() => toggleField(b.id, "sponsored")} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">No businesses match your filter.</div>
      )}
    </DashboardLayout>
  );
};

export default BusinessPromotionPage;
