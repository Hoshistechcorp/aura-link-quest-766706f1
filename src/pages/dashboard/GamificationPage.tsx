import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Trophy, Target, Flame, Star, Gift, Zap, Crown, Medal,
  TrendingUp, Users, Calendar, Award, Lock, CheckCircle2, ChevronRight,
  Gamepad2, Plus, Trash2, Save,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";

/* ── Data ─────────────────────────────────────────── */
const metrics = [
  { label: "Active Players", value: "1,847", icon: Users, trend: "+12%" },
  { label: "Badges Earned", value: "4,231", icon: Award, trend: "+8%" },
  { label: "Avg Points/User", value: "342", icon: Zap, trend: "+15%" },
  { label: "Completion Rate", value: "67%", icon: Target, trend: "+3%" },
];

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  earnedCount: number;
  totalEligible: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const badges: Badge[] = [
  { id: "1", name: "First Visit", description: "Complete your first check-in", icon: Star, color: "hsl(var(--aura-success))", earnedCount: 1654, totalEligible: 1847, rarity: "common" },
  { id: "2", name: "Foodie Explorer", description: "Try 10 different menu items", icon: Target, color: "hsl(var(--aura-info))", earnedCount: 892, totalEligible: 1847, rarity: "common" },
  { id: "3", name: "Social Butterfly", description: "Share 5 reviews on social media", icon: Users, color: "hsl(var(--secondary))", earnedCount: 421, totalEligible: 1847, rarity: "rare" },
  { id: "4", name: "Wine Connoisseur", description: "Order from the wine list 15 times", icon: Trophy, color: "hsl(var(--aura-warning))", earnedCount: 234, totalEligible: 1847, rarity: "rare" },
  { id: "5", name: "VIP Regular", description: "Visit 25 times in 3 months", icon: Crown, color: "hsl(var(--primary))", earnedCount: 87, totalEligible: 1847, rarity: "epic" },
  { id: "6", name: "Legendary Patron", description: "Accumulate 10,000 lifetime points", icon: Flame, color: "hsl(var(--destructive))", earnedCount: 23, totalEligible: 1847, rarity: "legendary" },
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  xp: number;
  unlocked: boolean;
  category: string;
}

const achievements: Achievement[] = [
  { id: "1", title: "Weekend Warrior", description: "Visit on 4 consecutive weekends", progress: 3, total: 4, xp: 200, unlocked: false, category: "Visits" },
  { id: "2", title: "Review Champion", description: "Leave 10 detailed reviews", progress: 10, total: 10, xp: 500, unlocked: true, category: "Engagement" },
  { id: "3", title: "Referral King", description: "Refer 5 friends who visit", progress: 3, total: 5, xp: 750, unlocked: false, category: "Social" },
  { id: "4", title: "Birthday Celebrant", description: "Celebrate a birthday at Bella Vista", progress: 1, total: 1, xp: 300, unlocked: true, category: "Special" },
  { id: "5", title: "Tasting Menu Master", description: "Complete the full tasting menu 3 times", progress: 1, total: 3, xp: 600, unlocked: false, category: "Dining" },
  { id: "6", title: "Early Bird", description: "Dine during lunch hours 10 times", progress: 7, total: 10, xp: 400, unlocked: false, category: "Visits" },
  { id: "7", title: "Event Enthusiast", description: "Attend 3 special events", progress: 2, total: 3, xp: 350, unlocked: false, category: "Special" },
  { id: "8", title: "Loyalty Legend", description: "Maintain Gold tier for 6 months", progress: 6, total: 6, xp: 1000, unlocked: true, category: "Loyalty" },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", points: 8420, badges: 12, streak: 14 },
  { rank: 2, name: "James K.", points: 7215, badges: 10, streak: 11 },
  { rank: 3, name: "Elena R.", points: 6890, badges: 11, streak: 9 },
  { rank: 4, name: "Marcus D.", points: 5734, badges: 8, streak: 7 },
  { rank: 5, name: "Nina P.", points: 5210, badges: 9, streak: 12 },
];

const challenges = [
  { title: "Weekend Special", description: "Visit this weekend and earn 2x points", deadline: "2 days left", reward: "200 pts", active: true },
  { title: "Photo Contest", description: "Share a photo of your dish for bonus XP", deadline: "5 days left", reward: "150 pts", active: true },
  { title: "Bring a Friend", description: "Dine with a new friend this month", deadline: "12 days left", reward: "300 pts", active: true },
];

const rarityColors: Record<string, string> = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-aura-info/15 text-aura-info",
  epic: "bg-primary/15 text-primary",
  legendary: "bg-aura-warning/15 text-aura-warning",
};

/* ── Tabs ─────────────────────────────────────────── */
const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "achievements", label: "Achievements" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "freebie", label: "Freebie Game" },
] as const;
type TabId = (typeof tabItems)[number]["id"];

/* ── Freebie Game Config Types ─────────────────────── */
interface FreebiePrice {
  id: string;
  label: string;
  probability: number;
  enabled: boolean;
}

const defaultFreebieConfig = {
  enabled: true,
  spinsPerDay: 1,
  resetTime: "00:00",
  prizes: [
    { id: "1", label: "10% Off",         probability: 20, enabled: true },
    { id: "2", label: "Free Dessert",    probability: 10, enabled: true },
    { id: "3", label: "Try Again",       probability: 30, enabled: true },
    { id: "4", label: "Free Drink",      probability: 10, enabled: true },
    { id: "5", label: "20% Off",         probability: 5,  enabled: true },
    { id: "6", label: "Free Appetizer",  probability: 10, enabled: true },
    { id: "7", label: "VIP Table",       probability: 5,  enabled: true },
    { id: "8", label: "Try Again",       probability: 10, enabled: true },
  ] as FreebiePrice[],
};

/* ══════════════════════════════════════════════════════
   GAMIFICATION PAGE
   ══════════════════════════════════════════════════════ */
const GamificationPage = () => {
  const [tab, setTab] = useState<TabId>("overview");
  const [achFilter, setAchFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [freebieConfig, setFreebieConfig] = useState(defaultFreebieConfig);
  const [newPrize, setNewPrize] = useState("");

  const filteredAch = achievements.filter((a) =>
    achFilter === "all" ? true : achFilter === "unlocked" ? a.unlocked : !a.unlocked
  );

  return (
    <DashboardLayout title="Gamification" subtitle="Engagement, badges & achievements">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <m.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-medium text-aura-success">{m.trend}</span>
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <span className="text-xs text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
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
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-3 gap-6">
            {/* Active Challenges */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-destructive" />
                <h3 className="font-display font-semibold text-lg">Active Challenges</h3>
              </div>
              <div className="space-y-3">
                {challenges.map((ch, i) => (
                  <motion.div key={ch.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-aura-warning/15 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-aura-warning" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{ch.title}</div>
                        <div className="text-xs text-muted-foreground">{ch.description}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-primary">{ch.reward}</div>
                      <div className="text-[10px] text-muted-foreground">{ch.deadline}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Leaderboard */}
            <div className="p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Top Players</h3>
                <button onClick={() => setTab("leaderboard")} className="text-xs text-primary font-medium">View All</button>
              </div>
              <div className="space-y-2">
                {leaderboard.slice(0, 3).map((p, i) => (
                  <div key={p.rank} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-aura-warning/20 text-aura-warning" : i === 1 ? "bg-muted text-muted-foreground" : "bg-secondary/20 text-secondary"
                    }`}>
                      {p.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.badges} badges</div>
                    </div>
                    <span className="text-sm font-bold">{p.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Badges Preview */}
            <div className="lg:col-span-3 p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Popular Badges</h3>
                <button onClick={() => setTab("badges")} className="text-xs text-primary font-medium">View All →</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {badges.map((b, i) => (
                  <motion.div key={b.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-2xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${b.color}20` }}>
                      <b.icon className="w-6 h-6" style={{ color: b.color }} />
                    </div>
                    <div className="text-xs font-medium">{b.name}</div>
                    <div className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold capitalize ${rarityColors[b.rarity]}`}>{b.rarity}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── BADGES ───────────────────────────── */}
        {tab === "badges" && (
          <motion.div key="badges" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((b, i) => {
                const pct = Math.round((b.earnedCount / b.totalEligible) * 100);
                return (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${b.color}15` }}>
                        <b.icon className="w-7 h-7" style={{ color: b.color }} />
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${rarityColors[b.rarity]}`}>{b.rarity}</span>
                    </div>
                    <h4 className="font-display font-semibold mb-1">{b.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{b.description}</p>
                    <Progress value={pct} className="h-1.5 mb-1.5" />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{b.earnedCount.toLocaleString()} earned</span>
                      <span>{pct}% of users</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── ACHIEVEMENTS ─────────────────────── */}
        {tab === "achievements" && (
          <motion.div key="achievements" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex gap-2 mb-4">
              {(["all", "unlocked", "locked"] as const).map((f) => (
                <button key={f} onClick={() => setAchFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${achFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {f} {f === "all" ? `(${achievements.length})` : f === "unlocked" ? `(${achievements.filter((a) => a.unlocked).length})` : `(${achievements.filter((a) => !a.unlocked).length})`}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filteredAch.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className={`p-4 rounded-2xl border transition-all ${a.unlocked ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${a.unlocked ? "bg-primary/15" : "bg-muted"}`}>
                      {a.unlocked ? <CheckCircle2 className="w-6 h-6 text-primary" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium">{a.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-muted text-[9px] font-medium text-muted-foreground">{a.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{a.description}</p>
                      <div className="flex items-center gap-3">
                        <Progress value={(a.progress / a.total) * 100} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-medium text-muted-foreground shrink-0">{a.progress}/{a.total}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-sm font-bold text-aura-warning">
                        <Zap className="w-3.5 h-3.5" /> {a.xp}
                      </div>
                      <span className="text-[10px] text-muted-foreground">XP</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── LEADERBOARD ──────────────────────── */}
        {tab === "leaderboard" && (
          <motion.div key="leaderboard" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="p-5 rounded-2xl bg-card border">
              <h3 className="font-display font-semibold text-lg mb-4">Player Rankings</h3>
              <div className="space-y-2">
                {leaderboard.map((p, i) => (
                  <motion.div key={p.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${i === 0 ? "bg-aura-warning/10 border border-aura-warning/20" : "bg-muted/30 hover:bg-muted/50"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      i === 0 ? "bg-aura-warning/20 text-aura-warning text-lg" : i === 1 ? "bg-muted text-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {i === 0 ? <Crown className="w-5 h-5" /> : p.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.badges} badges · {p.streak} day streak</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{p.points.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── FREEBIE GAME CONFIG ─────────────────── */}
        {tab === "freebie" && (
          <motion.div key="freebie" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Toggle & Settings */}
            <div className="p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-aura-success/15 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-aura-success" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Freebie Game</h3>
                    <p className="text-xs text-muted-foreground">Spin-to-win wheel on your microsite</p>
                  </div>
                </div>
                <Switch checked={freebieConfig.enabled} onCheckedChange={(v) => setFreebieConfig((c) => ({ ...c, enabled: v }))} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Spins per day</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((n) => (
                      <button key={n} onClick={() => setFreebieConfig((c) => ({ ...c, spinsPerDay: n }))}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${freebieConfig.spinsPerDay === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Daily reset time</label>
                  <input type="time" value={freebieConfig.resetTime}
                    onChange={(e) => setFreebieConfig((c) => ({ ...c, resetTime: e.target.value }))}
                    className="px-4 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>

            {/* Prize Configuration */}
            <div className="p-5 rounded-2xl bg-card border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Prize Slots</h3>
                <span className="text-xs text-muted-foreground">
                  Total probability: {freebieConfig.prizes.reduce((s, p) => s + (p.enabled ? p.probability : 0), 0)}%
                  {freebieConfig.prizes.reduce((s, p) => s + (p.enabled ? p.probability : 0), 0) !== 100 && (
                    <span className="text-destructive ml-1">(must be 100%)</span>
                  )}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {freebieConfig.prizes.map((prize, i) => (
                  <motion.div key={prize.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${prize.enabled ? "bg-card" : "bg-muted/30 opacity-60"}`}>
                    <Gift className="w-4 h-4 text-aura-warning shrink-0" />
                    <input value={prize.label}
                      onChange={(e) => setFreebieConfig((c) => ({
                        ...c,
                        prizes: c.prizes.map((p) => p.id === prize.id ? { ...p, label: e.target.value } : p),
                      }))}
                      className="flex-1 bg-transparent text-sm font-medium focus:outline-none" />
                    <div className="flex items-center gap-1 shrink-0">
                      <input type="number" min={0} max={100} value={prize.probability}
                        onChange={(e) => setFreebieConfig((c) => ({
                          ...c,
                          prizes: c.prizes.map((p) => p.id === prize.id ? { ...p, probability: Number(e.target.value) } : p),
                        }))}
                        className="w-14 px-2 py-1 rounded-lg bg-muted/50 border text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                    <Switch checked={prize.enabled}
                      onCheckedChange={(v) => setFreebieConfig((c) => ({
                        ...c,
                        prizes: c.prizes.map((p) => p.id === prize.id ? { ...p, enabled: v } : p),
                      }))} />
                    <button onClick={() => setFreebieConfig((c) => ({ ...c, prizes: c.prizes.filter((p) => p.id !== prize.id) }))}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Add new prize */}
              <div className="flex gap-2">
                <input value={newPrize} onChange={(e) => setNewPrize(e.target.value)} placeholder="New prize name..."
                  className="flex-1 px-4 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newPrize.trim()) {
                      setFreebieConfig((c) => ({
                        ...c,
                        prizes: [...c.prizes, { id: Date.now().toString(), label: newPrize.trim(), probability: 0, enabled: true }],
                      }));
                      setNewPrize("");
                    }
                  }} />
                <button onClick={() => {
                  if (!newPrize.trim()) return;
                  setFreebieConfig((c) => ({
                    ...c,
                    prizes: [...c.prizes, { id: Date.now().toString(), label: newPrize.trim(), probability: 0, enabled: true }],
                  }));
                  setNewPrize("");
                }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Spins", value: "3,241", icon: Gamepad2, trend: "+18%" },
                { label: "Prizes Won", value: "1,892", icon: Gift, trend: "+22%" },
                { label: "Daily Players", value: "187", icon: Users, trend: "+9%" },
                { label: "Return Rate", value: "74%", icon: TrendingUp, trend: "+5%" },
              ].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <m.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[10px] font-medium text-aura-success">{m.trend}</span>
                  </div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Save */}
            <button onClick={() => toast({ title: "Freebie Game saved", description: "Configuration published to your microsite." })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default GamificationPage;
