import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Eye, MousePointer, TrendingUp, MapPin, Star,
  ArrowUpDown, RefreshCw, Share2, ChevronRight, BarChart3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";

const locations = [
  { id: 1, name: "Bella Vista - Manhattan", address: "123 Grand Ave, New York", views: 12847, engagement: 68, rating: 4.8, topCard: "Menu", status: "active" },
  { id: 2, name: "Bella Vista - Brooklyn", address: "456 Atlantic Ave, Brooklyn", views: 8421, engagement: 62, rating: 4.6, topCard: "Reviews", status: "active" },
  { id: 3, name: "Bella Vista - Hoboken", address: "789 Washington St, Hoboken", views: 5234, engagement: 55, rating: 4.7, topCard: "Photo Gallery", status: "active" },
  { id: 4, name: "Bella Vista - Greenwich", address: "321 Greenwich Ave, CT", views: 3891, engagement: 48, rating: 4.5, topCard: "Menu", status: "active" },
  { id: 5, name: "Bella Vista - Hamptons", address: "654 Main St, East Hampton", views: 2156, engagement: 72, rating: 4.9, topCard: "Events", status: "seasonal" },
];

const comparisonData = [
  { name: "Manhattan", views: 12847, engagement: 68 },
  { name: "Brooklyn", views: 8421, engagement: 62 },
  { name: "Hoboken", views: 5234, engagement: 55 },
  { name: "Greenwich", views: 3891, engagement: 48 },
  { name: "Hamptons", views: 2156, engagement: 72 },
];

const metrics = [
  { label: "Total Locations", value: "5", icon: Building2 },
  { label: "Combined Views", value: "32,549", icon: Eye },
  { label: "Avg Engagement", value: "61%", icon: MousePointer },
  { label: "Best Performer", value: "Manhattan", icon: TrendingUp },
];

const bulkActions = [
  { label: "Update Hours", desc: "Sync business hours across all locations" },
  { label: "Push Menu", desc: "Deploy menu changes to selected locations" },
  { label: "Update Branding", desc: "Apply theme and logo updates" },
  { label: "Sync Staff", desc: "Share staff profiles across locations" },
];

const EnterprisePage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"views" | "engagement" | "rating">("views");

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelected(selected.length === locations.length ? [] : locations.map((l) => l.id));
  };

  const sorted = [...locations].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <DashboardLayout title="Enterprise" subtitle="Multi-location management & analytics">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
              <m.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <span className="text-xs text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Location List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-3">
              <button onClick={selectAll} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {selected.length === locations.length ? "Deselect All" : "Select All"}
              </button>
              {selected.length > 0 && (
                <span className="text-xs text-muted-foreground">{selected.length} selected</span>
              )}
            </div>
            <div className="flex gap-1.5">
              {(["views", "engagement", "rating"] as const).map((s) => (
                <button key={s} onClick={() => setSortBy(s)} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize ${sortBy === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {sorted.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selected.includes(loc.id) ? "bg-primary/5 border-primary/30" : "bg-card hover:border-primary/20"
              }`}
              onClick={() => toggleSelect(loc.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  selected.includes(loc.id) ? "bg-primary border-primary" : "border-muted-foreground/30"
                }`}>
                  {selected.includes(loc.id) && <div className="w-2 h-2 rounded-sm bg-primary-foreground" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{loc.name}</span>
                    <span className={`aura-badge text-[10px] ${loc.status === "active" ? "aura-badge-success" : "aura-badge-gold"}`}>
                      {loc.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{loc.address}</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-center">
                  <div>
                    <div className="text-sm font-bold">{loc.views.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{loc.engagement}%</div>
                    <div className="text-[10px] text-muted-foreground">Engage</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-aura-warning text-aura-warning" />
                    <span className="text-sm font-bold">{loc.rating}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bulk Actions & Cross Promotion */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="font-display font-semibold mb-4">Bulk Actions</h3>
            <div className="space-y-2">
              {bulkActions.map((action) => (
                <button
                  key={action.label}
                  disabled={selected.length === 0}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-left hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{action.label}</div>
                    <div className="text-[10px] text-muted-foreground">{action.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {selected.length === 0 && (
              <p className="text-[10px] text-muted-foreground mt-3 text-center">Select locations to enable bulk actions</p>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold">Cross Promotion</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-muted/50">
                <div className="text-sm font-medium mb-1">Event Sharing</div>
                <div className="text-xs text-muted-foreground">Promote events across all locations</div>
                <Progress value={65} className="h-1.5 mt-2" />
                <div className="text-[10px] text-muted-foreground mt-1">3 of 5 locations opted in</div>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <div className="text-sm font-medium mb-1">Loyalty Sync</div>
                <div className="text-xs text-muted-foreground">Shared loyalty across locations</div>
                <Progress value={100} className="h-1.5 mt-2" />
                <div className="text-[10px] text-muted-foreground mt-1">All locations synced</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="p-5 rounded-2xl bg-card border">
        <h3 className="font-display font-semibold mb-4">Location Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
            <YAxis axisLine={false} tickLine={false} className="text-xs" />
            <Tooltip />
            <Bar dataKey="views" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Views" />
            <Bar dataKey="engagement" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} name="Engagement %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
};

export default EnterprisePage;
