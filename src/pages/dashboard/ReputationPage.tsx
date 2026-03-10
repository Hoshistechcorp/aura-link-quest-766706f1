import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Minus,
  Globe, ArrowUp, ArrowDown, Filter, BarChart3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";

const platforms = [
  { name: "Google", reviews: 1248, rating: 4.8, change: 0.1, icon: "G", color: "bg-blue-500/10 text-blue-600" },
  { name: "OpenTable", reviews: 687, rating: 4.7, change: 0.0, icon: "OT", color: "bg-red-500/10 text-red-600" },
  { name: "Yelp", reviews: 423, rating: 4.5, change: -0.1, icon: "Y", color: "bg-rose-500/10 text-rose-600" },
  { name: "TripAdvisor", reviews: 312, rating: 4.6, change: 0.2, icon: "TA", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "Facebook", reviews: 177, rating: 4.7, change: 0.1, icon: "FB", color: "bg-indigo-500/10 text-indigo-600" },
];

const sentimentData = [
  { name: "Positive", value: 72, color: "hsl(var(--aura-success))" },
  { name: "Neutral", value: 18, color: "hsl(var(--aura-warning))" },
  { name: "Negative", value: 10, color: "hsl(var(--destructive))" },
];

const sentimentTrend = [
  { month: "Jan", positive: 68, neutral: 20, negative: 12 },
  { month: "Feb", positive: 70, neutral: 19, negative: 11 },
  { month: "Mar", positive: 65, neutral: 22, negative: 13 },
  { month: "Apr", positive: 72, neutral: 18, negative: 10 },
  { month: "May", positive: 74, neutral: 17, negative: 9 },
  { month: "Jun", positive: 72, neutral: 18, negative: 10 },
];

const topKeywords = [
  { word: "Excellent service", count: 284, sentiment: "positive" },
  { word: "Amazing food", count: 247, sentiment: "positive" },
  { word: "Great atmosphere", count: 198, sentiment: "positive" },
  { word: "Long wait", count: 67, sentiment: "negative" },
  { word: "Pricey", count: 52, sentiment: "neutral" },
  { word: "Worth it", count: 189, sentiment: "positive" },
  { word: "Noisy", count: 34, sentiment: "negative" },
  { word: "Beautiful decor", count: 156, sentiment: "positive" },
];

const recentReviews = [
  { platform: "Google", name: "Sarah M.", rating: 5, text: "Absolutely incredible experience! The wagyu was perfectly cooked.", sentiment: "positive", time: "2h ago" },
  { platform: "Yelp", name: "Tom R.", rating: 3, text: "Good food but the wait was too long. Over 45 minutes past reservation.", sentiment: "negative", time: "5h ago" },
  { platform: "OpenTable", name: "Lisa K.", rating: 5, text: "Best Italian in the city. The truffle arancini is divine!", sentiment: "positive", time: "1d ago" },
  { platform: "TripAdvisor", name: "James P.", rating: 4, text: "Very nice dinner. A bit pricey but the quality justified it.", sentiment: "neutral", time: "2d ago" },
];

const metrics = [
  { label: "Overall Rating", value: "4.7", icon: Star, change: "+0.1" },
  { label: "Total Reviews", value: "2,847", icon: MessageSquare, change: "+124" },
  { label: "Response Rate", value: "89%", icon: TrendingUp, change: "+4%" },
  { label: "Sentiment Score", value: "72%", icon: ThumbsUp, change: "+3%" },
];

const sentimentIcon = (s: string) => {
  if (s === "positive") return <ThumbsUp className="w-3 h-3 text-aura-success" />;
  if (s === "negative") return <ThumbsDown className="w-3 h-3 text-destructive" />;
  return <Minus className="w-3 h-3 text-aura-warning" />;
};

const ReputationPage = () => {
  const [filter, setFilter] = useState("All");

  return (
    <DashboardLayout title="Reputation Management" subtitle="Monitor reviews & sentiment across platforms">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
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

      {/* Platform Ratings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {platforms.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="p-4 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${p.color}`}>{p.icon}</div>
              <span className="text-sm font-medium">{p.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-aura-warning text-aura-warning" />
              <span className="text-lg font-bold">{p.rating}</span>
              <span className={`text-[10px] font-medium flex items-center gap-0.5 ${p.change > 0 ? "text-aura-success" : p.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                {p.change > 0 ? <ArrowUp className="w-2.5 h-2.5" /> : p.change < 0 ? <ArrowDown className="w-2.5 h-2.5" /> : null}
                {p.change !== 0 ? Math.abs(p.change) : "—"}
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">{p.reviews.toLocaleString()} reviews</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Sentiment Pie */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {sentimentData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Trend */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sentimentTrend}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `${v}%`} />
              <Tooltip />
              <Bar dataKey="positive" stackId="a" fill="hsl(var(--aura-success))" radius={[0, 0, 0, 0]} name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill="hsl(var(--aura-warning))" name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Keywords */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Top Mentioned Keywords</h3>
          <div className="space-y-2.5">
            {topKeywords.map((kw) => (
              <div key={kw.word} className="flex items-center gap-3">
                {sentimentIcon(kw.sentiment)}
                <span className="text-sm flex-1">{kw.word}</span>
                <div className="w-24">
                  <Progress value={(kw.count / 300) * 100} className="h-1.5" />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{kw.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="p-5 rounded-2xl bg-card border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Recent Reviews</h3>
            <div className="flex gap-1.5">
              {["All", "Positive", "Negative"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {recentReviews
              .filter((r) => filter === "All" || r.sentiment === filter.toLowerCase())
              .map((review, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{review.name}</span>
                      <span className="text-[10px] text-muted-foreground">via {review.platform}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {sentimentIcon(review.sentiment)}
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-2.5 h-2.5 ${s <= review.rating ? "fill-aura-warning text-aura-warning" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{review.text}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{review.time}</span>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReputationPage;
