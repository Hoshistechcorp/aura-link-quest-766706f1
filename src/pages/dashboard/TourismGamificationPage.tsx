import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Target, Camera, Star, Compass, Utensils, TreePine, Map,
  CalendarDays, MessageSquare, Users, Crown, Medal, Flame, Award,
  ArrowUpRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/aura/DashboardLayout";

/* ── KPIs ───────────────────────────────────────── */
const kpis = [
  { label: "Active Explorers", value: "24,800", icon: Users, trend: "+18%" },
  { label: "Badges Earned", value: "68,400", icon: Award, trend: "+22%" },
  { label: "Photos Shared", value: "12,470", icon: Camera, trend: "+31%" },
  { label: "Avg. Points/User", value: "485", icon: Target, trend: "+12%" },
];

/* ── Badges ─────────────────────────────────────── */
interface Badge {
  id: string;
  emoji: string;
  name: string;
  rule: string;
  reward: string;
  earned: number;
  total: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const badges: Badge[] = [
  { id: "1", emoji: "🏙️", name: "City Explorer", rule: "Visit 5 attractions", reward: "Unlock City Insider map", earned: 12400, total: 24800, rarity: "common" },
  { id: "2", emoji: "🎭", name: "Culture Lover", rule: "Attend 3 cultural events", reward: "Free museum pass", earned: 8200, total: 24800, rarity: "common" },
  { id: "3", emoji: "📸", name: "Local Storyteller", rule: "Share 10 photos via PicPop", reward: "Featured on homepage", earned: 5600, total: 24800, rarity: "rare" },
  { id: "4", emoji: "🍕", name: "Foodie Explorer", rule: "Dine at 5 AuraLink restaurants", reward: "10% off next meal", earned: 9800, total: 24800, rarity: "common" },
  { id: "5", emoji: "🌳", name: "Nature Seeker", rule: "Visit 3 parks or nature spots", reward: "Eco-badge + trail map", earned: 7100, total: 24800, rarity: "rare" },
  { id: "6", emoji: "🗺️", name: "Neighborhood Pro", rule: "Explore 4 distinct districts", reward: "Local guide status", earned: 4300, total: 24800, rarity: "rare" },
  { id: "7", emoji: "🎪", name: "Festival Goer", rule: "RSVP to 5 events", reward: "Priority event access", earned: 3100, total: 24800, rarity: "epic" },
  { id: "8", emoji: "✍️", name: "Review Champion", rule: "Write 10 detailed reviews", reward: "Verified reviewer badge", earned: 2200, total: 24800, rarity: "epic" },
  { id: "9", emoji: "👑", name: "Atlanta Ambassador", rule: "Earn all 8 other badges", reward: "Lifetime VIP status", earned: 340, total: 24800, rarity: "legendary" },
];

const rarityColors: Record<string, string> = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-aura-info/15 text-aura-info",
  epic: "bg-primary/15 text-primary",
  legendary: "bg-aura-warning/15 text-aura-warning",
};

/* ── Leaderboards ───────────────────────────────── */
const leaderboardCategories = [
  { id: "explorers", label: "Top Explorers", icon: Compass },
  { id: "photos", label: "Photo Contributors", icon: Camera },
  { id: "events", label: "Event Goers", icon: CalendarDays },
  { id: "reviews", label: "Review Writers", icon: MessageSquare },
] as const;

type LeaderboardCat = (typeof leaderboardCategories)[number]["id"];

const leaderboardData: Record<LeaderboardCat, { rank: number; name: string; avatar: string; points: number; badges: number; streak: number }[]> = {
  explorers: [
    { rank: 1, name: "Sarah M.", avatar: "🧑‍💼", points: 12420, badges: 8, streak: 21 },
    { rank: 2, name: "James K.", avatar: "👨‍🎨", points: 10215, badges: 7, streak: 18 },
    { rank: 3, name: "Elena R.", avatar: "👩‍🔬", points: 9890, badges: 7, streak: 14 },
    { rank: 4, name: "Marcus D.", avatar: "🧑‍🏫", points: 8734, badges: 6, streak: 11 },
    { rank: 5, name: "Nina P.", avatar: "👩‍🎤", points: 8210, badges: 6, streak: 16 },
    { rank: 6, name: "Carlos V.", avatar: "🧑‍💻", points: 7650, badges: 5, streak: 9 },
    { rank: 7, name: "Ava T.", avatar: "👩‍🍳", points: 7120, badges: 5, streak: 12 },
    { rank: 8, name: "Liam O.", avatar: "🧑‍🚀", points: 6890, badges: 4, streak: 7 },
  ],
  photos: [
    { rank: 1, name: "Nina P.", avatar: "👩‍🎤", points: 847, badges: 4, streak: 32 },
    { rank: 2, name: "Sarah M.", avatar: "🧑‍💼", points: 623, badges: 3, streak: 21 },
    { rank: 3, name: "Ava T.", avatar: "👩‍🍳", points: 518, badges: 3, streak: 18 },
    { rank: 4, name: "Marcus D.", avatar: "🧑‍🏫", points: 412, badges: 2, streak: 14 },
    { rank: 5, name: "Elena R.", avatar: "👩‍🔬", points: 387, badges: 2, streak: 11 },
    { rank: 6, name: "James K.", avatar: "👨‍🎨", points: 341, badges: 2, streak: 9 },
    { rank: 7, name: "Carlos V.", avatar: "🧑‍💻", points: 298, badges: 1, streak: 6 },
    { rank: 8, name: "Liam O.", avatar: "🧑‍🚀", points: 245, badges: 1, streak: 4 },
  ],
  events: [
    { rank: 1, name: "James K.", avatar: "👨‍🎨", points: 42, badges: 5, streak: 8 },
    { rank: 2, name: "Elena R.", avatar: "👩‍🔬", points: 38, badges: 4, streak: 6 },
    { rank: 3, name: "Sarah M.", avatar: "🧑‍💼", points: 35, badges: 4, streak: 5 },
    { rank: 4, name: "Carlos V.", avatar: "🧑‍💻", points: 31, badges: 3, streak: 4 },
    { rank: 5, name: "Nina P.", avatar: "👩‍🎤", points: 28, badges: 3, streak: 7 },
    { rank: 6, name: "Ava T.", avatar: "👩‍🍳", points: 24, badges: 2, streak: 3 },
    { rank: 7, name: "Liam O.", avatar: "🧑‍🚀", points: 21, badges: 2, streak: 2 },
    { rank: 8, name: "Marcus D.", avatar: "🧑‍🏫", points: 18, badges: 1, streak: 1 },
  ],
  reviews: [
    { rank: 1, name: "Elena R.", avatar: "👩‍🔬", points: 127, badges: 5, streak: 15 },
    { rank: 2, name: "Marcus D.", avatar: "🧑‍🏫", points: 98, badges: 4, streak: 11 },
    { rank: 3, name: "Sarah M.", avatar: "🧑‍💼", points: 84, badges: 3, streak: 9 },
    { rank: 4, name: "James K.", avatar: "👨‍🎨", points: 72, badges: 3, streak: 7 },
    { rank: 5, name: "Ava T.", avatar: "👩‍🍳", points: 65, badges: 2, streak: 6 },
    { rank: 6, name: "Nina P.", avatar: "👩‍🎤", points: 58, badges: 2, streak: 5 },
    { rank: 7, name: "Carlos V.", avatar: "🧑‍💻", points: 47, badges: 1, streak: 3 },
    { rank: 8, name: "Liam O.", avatar: "🧑‍🚀", points: 34, badges: 1, streak: 2 },
  ],
};

const pointsLabel: Record<LeaderboardCat, string> = {
  explorers: "pts",
  photos: "photos",
  events: "events",
  reviews: "reviews",
};

/* ── Tabs ────────────────────────────────────────── */
const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "leaderboards", label: "Leaderboards" },
] as const;
type TabId = (typeof tabItems)[number]["id"];

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

/* ══════════════════════════════════════════════════
   TOURISM GAMIFICATION PAGE
   ══════════════════════════════════════════════════ */
const TourismGamificationPage = () => {
  const [tab, setTab] = useState<TabId>("overview");
  const [lbCat, setLbCat] = useState<LeaderboardCat>("explorers");

  return (
    <DashboardLayout title="Tourism Gamification" subtitle="Visitor engagement, badges & city leaderboards">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <m.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-aura-success flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />{m.trend}
              </span>
            </div>
            <div className="text-2xl font-display font-bold">{m.value}</div>
            <span className="text-xs text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 no-scrollbar">
        {tabItems.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── OVERVIEW ─────────────────────────── */}
        {tab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Popular Badges */}
            <div className="p-5 rounded-2xl bg-card border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">City Badges</h3>
                <button onClick={() => setTab("badges")} className="text-xs text-primary font-medium">View All →</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                {badges.map((b, i) => (
                  <motion.div key={b.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="p-3 rounded-xl bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                    <div className="text-2xl mb-1">{b.emoji}</div>
                    <div className="text-[10px] font-medium leading-tight">{b.name}</div>
                    <div className={`inline-block mt-1 px-1.5 py-0.5 rounded-full text-[8px] font-semibold capitalize ${rarityColors[b.rarity]}`}>{b.rarity}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Leaderboard */}
            <div className="grid lg:grid-cols-2 gap-6">
              {leaderboardCategories.map((cat) => {
                const top3 = leaderboardData[cat.id].slice(0, 3);
                return (
                  <div key={cat.id} className="p-5 rounded-2xl bg-card border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4 text-primary" />
                        <h3 className="font-display font-semibold text-sm">{cat.label}</h3>
                      </div>
                      <button onClick={() => { setTab("leaderboards"); setLbCat(cat.id); }} className="text-xs text-primary font-medium">View All</button>
                    </div>
                    <div className="space-y-2">
                      {top3.map((p, i) => (
                        <div key={p.rank} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0 ? "bg-aura-warning/20 text-aura-warning" : i === 1 ? "bg-muted text-muted-foreground" : "bg-secondary/20 text-secondary"
                          }`}>
                            {p.rank}
                          </div>
                          <span className="text-lg">{p.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-[10px] text-muted-foreground">{p.badges} badges · {p.streak}d streak</div>
                          </div>
                          <span className="text-sm font-bold">{p.points.toLocaleString()} <span className="text-[10px] text-muted-foreground font-normal">{pointsLabel[cat.id]}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── BADGES ───────────────────────────── */}
        {tab === "badges" && (
          <motion.div key="badges" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((b, i) => {
                const pct = Math.round((b.earned / b.total) * 100);
                return (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="p-5 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{b.emoji}</div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${rarityColors[b.rarity]}`}>{b.rarity}</span>
                    </div>
                    <h4 className="font-display font-semibold mb-1">{b.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{b.rule}</p>
                    <p className="text-xs text-primary mb-3">🎁 {b.reward}</p>
                    <Progress value={pct} className="h-1.5 mb-1.5" />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{fmt(b.earned)} earned</span>
                      <span>{pct}% of visitors</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── LEADERBOARDS ─────────────────────── */}
        {tab === "leaderboards" && (
          <motion.div key="leaderboards" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Category selector */}
            <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar pb-1">
              {leaderboardCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setLbCat(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                    lbCat === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" /> {cat.label}
                </button>
              ))}
            </div>

            {/* Podium */}
            <div className="flex items-end justify-center gap-3 mb-6">
              {[1, 0, 2].map((idx) => {
                const p = leaderboardData[lbCat][idx];
                if (!p) return null;
                const heights = ["h-28", "h-24", "h-20"];
                const podiumH = idx === 0 ? heights[0] : idx === 1 ? heights[1] : heights[2];
                return (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-2xl mb-1">{p.avatar}</span>
                    <span className="text-xs font-medium mb-1">{p.name}</span>
                    <span className="text-[10px] text-muted-foreground mb-2">{p.points.toLocaleString()} {pointsLabel[lbCat]}</span>
                    <div className={`w-20 ${podiumH} rounded-t-xl flex items-start justify-center pt-2 ${
                      p.rank === 1 ? "bg-aura-warning/20" : p.rank === 2 ? "bg-muted" : "bg-secondary/20"
                    }`}>
                      <span className={`text-lg font-bold ${
                        p.rank === 1 ? "text-aura-warning" : p.rank === 2 ? "text-muted-foreground" : "text-secondary"
                      }`}>
                        {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="p-5 rounded-2xl bg-card border shadow-sm">
              <h3 className="font-display font-semibold text-lg mb-4">
                {leaderboardCategories.find((c) => c.id === lbCat)?.label} Rankings
              </h3>
              <div className="space-y-2">
                {leaderboardData[lbCat].map((p, i) => (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      i < 3 ? "bg-primary/5" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-aura-warning/20 text-aura-warning" :
                      i === 1 ? "bg-muted text-muted-foreground" :
                      i === 2 ? "bg-secondary/20 text-secondary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {p.rank}
                    </div>
                    <span className="text-xl">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.badges} badges · {p.streak}d streak</div>
                    </div>
                    <span className="text-sm font-bold">{p.points.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground">{pointsLabel[lbCat]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default TourismGamificationPage;
