import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, TrendingUp, DollarSign, Gift, Copy, Check, Share2,
  Trophy, ChevronRight, Plus, Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";

const metrics = [
  { label: "Total Referrals", value: "1,247", change: "+82 this month", icon: Users },
  { label: "Conversions", value: "847", change: "67.8% rate", icon: TrendingUp },
  { label: "Revenue Generated", value: "$24,680", change: "+$3,200", icon: DollarSign },
  { label: "Rewards Given", value: "634", change: "$8,420 value", icon: Gift },
];

const referralData = [
  { month: "Jan", referrals: 82, conversions: 54 },
  { month: "Feb", referrals: 96, conversions: 67 },
  { month: "Mar", referrals: 110, conversions: 78 },
  { month: "Apr", referrals: 124, conversions: 89 },
  { month: "May", referrals: 148, conversions: 102 },
  { month: "Jun", referrals: 168, conversions: 118 },
];

const topReferrers = [
  { name: "Alexandra H.", referrals: 42, conversions: 31, earned: "$620", avatar: "AH" },
  { name: "Robert M.", referrals: 38, conversions: 28, earned: "$560", avatar: "RM" },
  { name: "Michelle L.", referrals: 31, conversions: 22, earned: "$440", avatar: "ML" },
  { name: "Daniel K.", referrals: 27, conversions: 19, earned: "$380", avatar: "DK" },
  { name: "Jessica W.", referrals: 24, conversions: 17, earned: "$340", avatar: "JW" },
];

const rewardRules = [
  { id: 1, trigger: "First Referral Signup", referrerReward: "$10 credit", refereeReward: "$10 off first visit", active: true },
  { id: 2, trigger: "Referee's First Purchase", referrerReward: "Free appetizer", refereeReward: "10% off", active: true },
  { id: 3, trigger: "5 Successful Referrals", referrerReward: "Free entrée", refereeReward: "—", active: true },
  { id: 4, trigger: "10 Successful Referrals", referrerReward: "VIP dinner for 2", refereeReward: "—", active: false },
];

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Referral Program" subtitle="Track referrals & manage rewards">
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

      {/* Share Link */}
      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold">Your Referral Link</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-card border text-sm text-muted-foreground truncate">
            https://auralink.io/bellavista?ref=BELLAVISTA2024
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Referral Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={referralData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Bar dataKey="referrals" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Referrals" />
              <Bar dataKey="conversions" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Referrers */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-aura-warning" />
            <h3 className="font-display font-semibold">Top Referrers</h3>
          </div>
          <div className="space-y-3">
            {topReferrers.map((referrer, i) => (
              <motion.div
                key={referrer.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className={`text-xs font-bold w-4 ${i < 3 ? "text-aura-warning" : "text-muted-foreground"}`}>
                  #{i + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {referrer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{referrer.name}</div>
                  <div className="text-[10px] text-muted-foreground">{referrer.referrals} referrals · {referrer.conversions} converted</div>
                </div>
                <span className="text-xs font-semibold text-aura-success">{referrer.earned}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reward Rules */}
      <div className="p-5 rounded-2xl bg-card border">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold">Reward Rules</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Rule
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Trigger</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Referrer Gets</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Referee Gets</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {rewardRules.map((rule) => (
                <tr key={rule.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{rule.trigger}</td>
                  <td className="px-4 py-3">
                    <span className="aura-badge aura-badge-gold">{rule.referrerReward}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground">{rule.refereeReward}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`aura-badge text-[10px] ${rule.active ? "aura-badge-success" : "bg-muted text-muted-foreground"}`}>
                      {rule.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralPage;
