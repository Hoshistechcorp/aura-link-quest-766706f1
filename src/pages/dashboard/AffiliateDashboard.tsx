import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users2, MousePointer, DollarSign, TrendingUp, Trophy, Link2, Copy, Check,
  Gift, CalendarDays, ShoppingBag, Ticket, ExternalLink,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";

const metrics = [
  { label: "Affiliates", value: "148", change: "+12", icon: Users2 },
  { label: "Total Clicks", value: "24,891", change: "+1,240", icon: MousePointer },
  { label: "Conversions", value: "1,847", change: "+89", icon: TrendingUp },
  { label: "Revenue", value: "$18,420", change: "+$2,100", icon: DollarSign },
];

const leaderboard = [
  { rank: 1, name: "Sarah Johnson", clicks: 4821, conversions: 342, revenue: "$4,280", avatar: "SJ" },
  { rank: 2, name: "Mike Chen", clicks: 3492, conversions: 271, revenue: "$3,150", avatar: "MC" },
  { rank: 3, name: "Emma Davis", clicks: 2847, conversions: 198, revenue: "$2,470", avatar: "ED" },
  { rank: 4, name: "Alex Rivera", clicks: 2103, conversions: 156, revenue: "$1,920", avatar: "AR" },
  { rank: 5, name: "Lisa Park", clicks: 1892, conversions: 134, revenue: "$1,680", avatar: "LP" },
];

const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 3100 },
  { month: "Mar", revenue: 2800 },
  { month: "Apr", revenue: 3600 },
  { month: "May", revenue: 4200 },
  { month: "Jun", revenue: 4800 },
];

const products = [
  { id: "gift", label: "Gift Cards", icon: Gift, commission: "8%", links: 42 },
  { id: "dining", label: "Dining Experiences", icon: CalendarDays, commission: "12%", links: 28 },
  { id: "events", label: "Events", icon: Ticket, commission: "10%", links: 19 },
  { id: "merch", label: "Merchandise", icon: ShoppingBag, commission: "15%", links: 11 },
];

const rankColors = ["text-aura-warning", "text-muted-foreground", "text-secondary"];

const AffiliateDashboard = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("gift");

  const handleCopy = (id: string) => {
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <DashboardLayout title="Affiliate Marketing" subtitle="Manage affiliates & track performance">
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

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Affiliate Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-aura-warning" />
            <h3 className="font-display font-semibold">Top Affiliates</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((affiliate, i) => (
              <motion.div
                key={affiliate.rank}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className={`text-sm font-bold w-5 ${rankColors[i] || "text-muted-foreground"}`}>
                  #{affiliate.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                  {affiliate.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{affiliate.name}</div>
                  <div className="text-[10px] text-muted-foreground">{affiliate.conversions} conversions</div>
                </div>
                <span className="text-xs font-semibold text-aura-success">{affiliate.revenue}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Link Generator */}
      <div className="p-5 rounded-2xl bg-card border">
        <div className="flex items-center gap-2 mb-5">
          <Link2 className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold">Affiliate Link Generator</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedProduct === product.id
                  ? "bg-primary/5 border-primary/30"
                  : "bg-card hover:bg-muted/50"
              }`}
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <product.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{product.label}</div>
                  <div className="text-[10px] text-muted-foreground">{product.links} active links</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="aura-badge aura-badge-gold text-[10px]">{product.commission} commission</span>
              </div>

              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted text-[11px]">
                <span className="flex-1 truncate text-muted-foreground">
                  auralink.io/bv/ref/{product.id}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(product.id);
                  }}
                  className="shrink-0 w-6 h-6 rounded-md bg-card border flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  {copiedLink === product.id ? (
                    <Check className="w-3 h-3 text-aura-success" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                <button className="shrink-0 w-6 h-6 rounded-md bg-card border flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AffiliateDashboard;
