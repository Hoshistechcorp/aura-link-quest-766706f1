import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Instagram, Youtube, Twitter, MapPin, Star, TrendingUp,
  Users, DollarSign, Calendar, X, Send, Filter,
} from "lucide-react";
import DashboardLayout from "@/components/aura/DashboardLayout";

const influencers = [
  { id: 1, name: "Sophia Martinez", handle: "@sophiaeats", platform: "Instagram", followers: "124K", engagement: "4.8%", location: "New York", rating: 4.9, niche: "Food & Dining", avatar: "SM", campaigns: 12, price: "$800" },
  { id: 2, name: "Jake Thompson", handle: "@jakefoodtour", platform: "YouTube", followers: "89K", engagement: "6.2%", location: "Los Angeles", rating: 4.7, niche: "Food Reviews", avatar: "JT", campaigns: 8, price: "$1,200" },
  { id: 3, name: "Emily Chen", handle: "@emilydines", platform: "Instagram", followers: "210K", engagement: "3.9%", location: "San Francisco", rating: 4.8, niche: "Fine Dining", avatar: "EC", campaigns: 22, price: "$1,500" },
  { id: 4, name: "Marcus Williams", handle: "@marcusbites", platform: "TikTok", followers: "340K", engagement: "7.1%", location: "Chicago", rating: 4.6, niche: "Casual Dining", avatar: "MW", campaigns: 15, price: "$950" },
  { id: 5, name: "Aria Patel", handle: "@ariafoodie", platform: "Instagram", followers: "67K", engagement: "5.5%", location: "Miami", rating: 4.9, niche: "Luxury Dining", avatar: "AP", campaigns: 6, price: "$600" },
  { id: 6, name: "David Kim", handle: "@chefkim", platform: "YouTube", followers: "156K", engagement: "4.3%", location: "Seattle", rating: 4.8, niche: "Chef Collabs", avatar: "DK", campaigns: 18, price: "$1,100" },
];

const platformIcon = (p: string) => {
  switch (p) {
    case "Instagram": return <Instagram className="w-3.5 h-3.5" />;
    case "YouTube": return <Youtube className="w-3.5 h-3.5" />;
    case "TikTok": return <Twitter className="w-3.5 h-3.5" />;
    default: return null;
  }
};

const platformColor = (p: string) => {
  switch (p) {
    case "Instagram": return "bg-pink-500/10 text-pink-600";
    case "YouTube": return "bg-red-500/10 text-red-600";
    case "TikTok": return "bg-sky-500/10 text-sky-600";
    default: return "bg-muted text-muted-foreground";
  }
};

const metrics = [
  { label: "Active Creators", value: "48", icon: Users },
  { label: "Campaigns", value: "12", icon: Calendar },
  { label: "Avg Engagement", value: "5.3%", icon: TrendingUp },
  { label: "Total Spend", value: "$14,200", icon: DollarSign },
];

const InfluencerPage = () => {
  const [search, setSearch] = useState("");
  const [showCampaign, setShowCampaign] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<typeof influencers[0] | null>(null);
  const [filterPlatform, setFilterPlatform] = useState("All");

  const filtered = influencers.filter((inf) => {
    const matchSearch = inf.name.toLowerCase().includes(search.toLowerCase()) || inf.niche.toLowerCase().includes(search.toLowerCase());
    const matchPlatform = filterPlatform === "All" || inf.platform === filterPlatform;
    return matchSearch && matchPlatform;
  });

  const openCampaign = (inf: typeof influencers[0]) => {
    setSelectedInfluencer(inf);
    setShowCampaign(true);
  };

  return (
    <DashboardLayout title="Influencer Partnerships" subtitle="Discover creators & launch campaigns">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl bg-card border"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
              <m.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <span className="text-xs text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creators by name or niche..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border text-sm outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Instagram", "YouTube", "TikTok"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filterPlatform === p ? "bg-primary text-primary-foreground" : "bg-card border hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inf, i) => (
          <motion.div
            key={inf.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-card border hover:border-primary/20 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-sm font-display font-bold text-primary">
                {inf.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{inf.name}</div>
                <div className="text-xs text-muted-foreground">{inf.handle}</div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${platformColor(inf.platform)}`}>
                {platformIcon(inf.platform)}
                {inf.platform}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-xl bg-muted/50">
                <div className="text-sm font-bold">{inf.followers}</div>
                <div className="text-[10px] text-muted-foreground">Followers</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-muted/50">
                <div className="text-sm font-bold">{inf.engagement}</div>
                <div className="text-[10px] text-muted-foreground">Engage</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-muted/50">
                <div className="text-sm font-bold">{inf.campaigns}</div>
                <div className="text-[10px] text-muted-foreground">Campaigns</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{inf.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-aura-warning text-aura-warning" />
                <span className="text-xs font-medium">{inf.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary">{inf.price}</span>
              <span className="text-[10px] text-muted-foreground">/ campaign</span>
              <button
                onClick={() => openCampaign(inf)}
                className="ml-auto px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Create Campaign
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign Modal */}
      <AnimatePresence>
        {showCampaign && selectedInfluencer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4"
            onClick={() => setShowCampaign(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-2xl bg-card border shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-bold">Create Campaign</h3>
                <button onClick={() => setShowCampaign(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {selectedInfluencer.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{selectedInfluencer.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedInfluencer.handle} · {selectedInfluencer.followers} followers</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Campaign Name</label>
                  <input placeholder="e.g., Summer Menu Launch" className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Budget</label>
                    <input placeholder="$1,000" className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Deadline</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Deliverables</label>
                  <textarea placeholder="e.g., 2 Instagram posts, 1 Reel, 3 Stories" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-muted-foreground" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowCampaign(false)} className="flex-1 py-2.5 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />
                  Send Proposal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default InfluencerPage;
