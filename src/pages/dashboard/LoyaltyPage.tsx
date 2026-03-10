import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, Award, Star, Gift, Users, TrendingUp, Plus, ChevronRight,
  Cake, UtensilsCrossed, Wine, Sparkles, Trophy, Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/aura/DashboardLayout";

const tiers = [
  {
    id: "bronze",
    name: "Bronze",
    icon: Award,
    color: "from-amber-700 to-amber-600",
    bgColor: "bg-amber-700/10",
    textColor: "text-amber-700",
    points: "0 - 499",
    members: 842,
    rewards: [
      { icon: Cake, label: "Free Dessert", desc: "On your birthday month" },
      { icon: Star, label: "Priority Seating", desc: "Skip the waitlist" },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    icon: Award,
    color: "from-slate-400 to-slate-500",
    bgColor: "bg-slate-400/10",
    textColor: "text-slate-500",
    points: "500 - 1,499",
    members: 384,
    rewards: [
      { icon: Cake, label: "Free Dessert", desc: "Any visit" },
      { icon: UtensilsCrossed, label: "Free Appetizer", desc: "Monthly perk" },
      { icon: Star, label: "10% Off", desc: "All food items" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: Crown,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-600",
    points: "1,500 - 4,999",
    members: 126,
    rewards: [
      { icon: UtensilsCrossed, label: "Free Entrée", desc: "Monthly perk" },
      { icon: Wine, label: "Complimentary Wine", desc: "Per table" },
      { icon: Star, label: "15% Off", desc: "All items" },
      { icon: Sparkles, label: "Chef's Table", desc: "Priority booking" },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: Trophy,
    color: "from-slate-800 to-slate-700",
    bgColor: "bg-slate-800/10",
    textColor: "text-slate-700",
    points: "5,000+",
    members: 31,
    rewards: [
      { icon: UtensilsCrossed, label: "Free Entrée", desc: "Every visit" },
      { icon: Wine, label: "Premium Wine", desc: "Sommelier's pick" },
      { icon: Star, label: "20% Off", desc: "Everything" },
      { icon: Sparkles, label: "VIP Events", desc: "Exclusive access" },
      { icon: Gift, label: "Annual Gift", desc: "Curated surprise" },
    ],
  },
];

const topMembers = [
  { name: "Alexandra H.", tier: "Platinum", points: 8420, visits: 96, avatar: "AH" },
  { name: "Robert M.", tier: "Platinum", points: 7210, visits: 84, avatar: "RM" },
  { name: "Michelle L.", tier: "Gold", points: 4890, visits: 62, avatar: "ML" },
  { name: "Daniel K.", tier: "Gold", points: 3720, visits: 48, avatar: "DK" },
  { name: "Jessica W.", tier: "Gold", points: 2840, visits: 37, avatar: "JW" },
];

const metrics = [
  { label: "Total Members", value: "1,383", icon: Users },
  { label: "Active This Month", value: "847", icon: TrendingUp },
  { label: "Points Redeemed", value: "24.8K", icon: Target },
  { label: "Rewards Given", value: "1,247", icon: Gift },
];

const tierColor = (tier: string) => {
  switch (tier) {
    case "Platinum": return "text-slate-700";
    case "Gold": return "text-yellow-600";
    case "Silver": return "text-slate-500";
    default: return "text-amber-700";
  }
};

const LoyaltyPage = () => {
  const [selectedTier, setSelectedTier] = useState("gold");

  const activeTier = tiers.find((t) => t.id === selectedTier)!;

  return (
    <DashboardLayout title="Loyalty & Rewards" subtitle="Manage your loyalty program tiers">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tier Cards */}
        <div className="lg:col-span-2">
          {/* Tier Selector */}
          <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedTier === tier.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border hover:bg-muted"
                }`}
              >
                <tier.icon className="w-4 h-4" />
                {tier.name}
                <span className={`text-[10px] ${selectedTier === tier.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  ({tier.members})
                </span>
              </button>
            ))}
          </div>

          {/* Active Tier Detail */}
          <motion.div
            key={selectedTier}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card border overflow-hidden"
          >
            {/* Tier Header */}
            <div className={`p-5 bg-gradient-to-r ${activeTier.color} text-primary-foreground`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <activeTier.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{activeTier.name} Tier</h3>
                  <p className="text-sm opacity-80">{activeTier.points} points · {activeTier.members} members</p>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="p-5">
              <h4 className="text-sm font-medium mb-3">Tier Rewards</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {activeTier.rewards.map((reward, i) => (
                  <motion.div
                    key={reward.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                  >
                    <div className={`w-9 h-9 rounded-xl ${activeTier.bgColor} flex items-center justify-center`}>
                      <reward.icon className={`w-4 h-4 ${activeTier.textColor}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{reward.label}</div>
                      <div className="text-[10px] text-muted-foreground">{reward.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                <Plus className="w-4 h-4" />
                Add Reward
              </button>
            </div>
          </motion.div>

          {/* Tier Progression Visual */}
          <div className="mt-6 p-5 rounded-2xl bg-card border">
            <h4 className="text-sm font-medium mb-4">Tier Progression</h4>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <div key={tier.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${tier.bgColor} flex items-center justify-center`}>
                    <tier.icon className={`w-4 h-4 ${tier.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{tier.name}</span>
                      <span className="text-[10px] text-muted-foreground">{tier.members} members</span>
                    </div>
                    <Progress
                      value={((tier.members / 1383) * 100)}
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Members Leaderboard */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-aura-warning" />
              <h3 className="font-display font-semibold">Top Members</h3>
            </div>
            <div className="space-y-3">
              {topMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold w-4 text-muted-foreground">#{i + 1}</span>
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{member.name}</div>
                    <div className={`text-[10px] font-medium ${tierColor(member.tier)}`}>{member.tier}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold">{member.points.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">{member.visits} visits</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-5 rounded-2xl bg-card border">
            <h4 className="text-sm font-medium mb-3">Redemption Rate</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Free Dessert</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Free Appetizer</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Free Entrée</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">VIP Events</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoyaltyPage;
