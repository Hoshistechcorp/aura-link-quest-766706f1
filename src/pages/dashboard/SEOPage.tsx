import { motion } from "framer-motion";
import {
  Search, TrendingUp, Globe, MapPin, Star, Navigation, Car, Train,
  ExternalLink, ArrowUp, ArrowDown, Minus, CheckCircle2, AlertCircle, Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";

const seoScore = 78;

const metrics = [
  { label: "Local SEO Score", value: `${seoScore}/100`, icon: Target, change: "+5 pts" },
  { label: "Google Ranking", value: "#3", icon: TrendingUp, change: "for 'Italian NYC'" },
  { label: "Citations", value: "47", icon: Globe, change: "+8 this month" },
  { label: "Map Views", value: "8,420", icon: MapPin, change: "+22%" },
];

const keywords = [
  { keyword: "Italian restaurant NYC", position: 3, change: 2, volume: "12,400", difficulty: 72 },
  { keyword: "fine dining Manhattan", position: 7, change: -1, volume: "8,200", difficulty: 65 },
  { keyword: "best pasta New York", position: 5, change: 3, volume: "9,800", difficulty: 58 },
  { keyword: "Italian fine dining near me", position: 2, change: 0, volume: "6,100", difficulty: 44 },
  { keyword: "romantic restaurant NYC", position: 11, change: 4, volume: "14,600", difficulty: 78 },
  { keyword: "wagyu steak Manhattan", position: 4, change: 1, volume: "3,200", difficulty: 52 },
  { keyword: "private dining NYC", position: 8, change: -2, volume: "5,400", difficulty: 61 },
];

const rankingHistory = [
  { month: "Jan", rank: 12 },
  { month: "Feb", rank: 10 },
  { month: "Mar", rank: 8 },
  { month: "Apr", rank: 6 },
  { month: "May", rank: 4 },
  { month: "Jun", rank: 3 },
];

const citations = [
  { platform: "Google Business", status: "verified", accuracy: 100 },
  { platform: "Yelp", status: "verified", accuracy: 100 },
  { platform: "TripAdvisor", status: "verified", accuracy: 95 },
  { platform: "OpenTable", status: "verified", accuracy: 100 },
  { platform: "Facebook", status: "pending", accuracy: 85 },
  { platform: "Apple Maps", status: "verified", accuracy: 90 },
  { platform: "Bing Places", status: "missing", accuracy: 0 },
];

const seoChecklist = [
  { item: "Google Business claimed & verified", done: true },
  { item: "NAP consistency across directories", done: true },
  { item: "Business categories optimized", done: true },
  { item: "Photos uploaded (20+ recommended)", done: true },
  { item: "Review response rate > 80%", done: false },
  { item: "Schema markup on website", done: false },
  { item: "Local backlinks (10+ recommended)", done: false },
];

const changeIcon = (change: number) => {
  if (change > 0) return <ArrowUp className="w-3 h-3 text-aura-success" />;
  if (change < 0) return <ArrowDown className="w-3 h-3 text-destructive" />;
  return <Minus className="w-3 h-3 text-muted-foreground" />;
};

const statusBadge = (status: string) => {
  switch (status) {
    case "verified": return <span className="aura-badge aura-badge-success text-[10px]">Verified</span>;
    case "pending": return <span className="aura-badge aura-badge-gold text-[10px]">Pending</span>;
    case "missing": return <span className="aura-badge bg-destructive/10 text-destructive text-[10px]">Missing</span>;
    default: return null;
  }
};

const SEOPage = () => {
  return (
    <DashboardLayout title="SEO & Google Maps" subtitle="Local search optimization & visibility">
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
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className="aura-badge aura-badge-success text-[10px]">{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Ranking Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Ranking Trend (Primary Keyword)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={rankingHistory}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis reversed axisLine={false} tickLine={false} className="text-xs" domain={[1, 15]} tickFormatter={(v) => `#${v}`} />
              <Tooltip formatter={(v: number) => [`#${v}`, "Position"]} />
              <Line type="monotone" dataKey="rank" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SEO Score & Checklist */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">SEO Health</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeDasharray={`${seoScore * 2.64} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{seoScore}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {seoChecklist.map((check) => (
              <div key={check.item} className="flex items-center gap-2 text-xs">
                {check.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-aura-success shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-aura-warning shrink-0" />
                )}
                <span className={check.done ? "text-muted-foreground" : ""}>{check.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="p-5 rounded-2xl bg-card border mb-8">
        <h3 className="font-display font-semibold mb-4">Keyword Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Keyword</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Position</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Change</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Volume</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw, i) => (
                <motion.tr
                  key={kw.keyword}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{kw.keyword}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                      {kw.position}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {changeIcon(kw.change)}
                      <span className={`text-xs font-medium ${kw.change > 0 ? "text-aura-success" : kw.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                        {Math.abs(kw.change) || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-muted-foreground">{kw.volume}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-center">
                      <Progress value={kw.difficulty} className="h-1.5 w-16" />
                      <span className="text-xs text-muted-foreground">{kw.difficulty}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Citations */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Citation Tracking</h3>
          <div className="space-y-3">
            {citations.map((cit) => (
              <div key={cit.platform} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">{cit.platform}</span>
                </div>
                <div className="flex items-center gap-3">
                  {cit.accuracy > 0 && (
                    <span className="text-xs text-muted-foreground">{cit.accuracy}% accurate</span>
                  )}
                  {statusBadge(cit.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Card */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Google Maps Preview</h3>
          <div className="rounded-xl bg-muted aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-aura-info/20 to-aura-success/10" />
            <div className="relative text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Bella Vista</p>
              <p className="text-xs text-muted-foreground">123 Grand Ave, New York</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Navigation className="w-4 h-4 text-aura-info" />
              <div>
                <div className="text-xs font-medium">Directions</div>
                <div className="text-[10px] text-muted-foreground">3,240 clicks</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Car className="w-4 h-4 text-aura-warning" />
              <div>
                <div className="text-xs font-medium">Parking</div>
                <div className="text-[10px] text-muted-foreground">Valet available</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Train className="w-4 h-4 text-aura-success" />
              <div>
                <div className="text-xs font-medium">Transit</div>
                <div className="text-[10px] text-muted-foreground">2 min walk</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Star className="w-4 h-4 text-aura-warning" />
              <div>
                <div className="text-xs font-medium">Reviews</div>
                <div className="text-[10px] text-muted-foreground">4.8 (2,847)</div>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SEOPage;
