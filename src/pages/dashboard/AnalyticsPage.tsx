import { useState } from "react";
import {
  Eye, Users, MousePointer, Clock, TrendingUp, TrendingDown,
  ArrowUpRight, Globe, Smartphone, Monitor, MapPin, Calendar,
  BarChart3, PieChart as PieChartIcon, Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  CartesianGrid,
} from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ── mock data ── */
const dailyVisitors = [
  { day: "Mon", visitors: 1240, unique: 890 },
  { day: "Tue", visitors: 1680, unique: 1120 },
  { day: "Wed", visitors: 1920, unique: 1340 },
  { day: "Thu", visitors: 1550, unique: 1050 },
  { day: "Fri", visitors: 2340, unique: 1780 },
  { day: "Sat", visitors: 3120, unique: 2450 },
  { day: "Sun", visitors: 2780, unique: 2100 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 4200, bookings: 180 },
  { month: "Feb", revenue: 5100, bookings: 210 },
  { month: "Mar", revenue: 6800, bookings: 290 },
  { month: "Apr", revenue: 7200, bookings: 310 },
  { month: "May", revenue: 8900, bookings: 380 },
  { month: "Jun", revenue: 11200, bookings: 470 },
];

const trafficSources = [
  { name: "Organic Search", value: 42, color: "hsl(var(--primary))" },
  { name: "Direct", value: 28, color: "hsl(var(--secondary))" },
  { name: "Social Media", value: 18, color: "hsl(var(--aura-info))" },
  { name: "Referral", value: 12, color: "hsl(var(--aura-success))" },
];

const deviceBreakdown = [
  { name: "Mobile", value: 58, icon: Smartphone },
  { name: "Desktop", value: 34, icon: Monitor },
  { name: "Tablet", value: 8, icon: Monitor },
];

const topPages = [
  { page: "/destination/attractions", views: 4820, bounce: "32%", avgTime: "3:45" },
  { page: "/destination/food-dining", views: 3640, bounce: "28%", avgTime: "4:12" },
  { page: "/destination/events-festivals", views: 2910, bounce: "35%", avgTime: "2:58" },
  { page: "/destination/hotels", views: 2540, bounce: "22%", avgTime: "5:01" },
  { page: "/destination/things-to-do", views: 2180, bounce: "30%", avgTime: "3:22" },
];

const topLocations = [
  { city: "Atlanta", visitors: 8420, pct: 38 },
  { city: "New York", visitors: 3210, pct: 15 },
  { city: "Los Angeles", visitors: 2640, pct: 12 },
  { city: "Chicago", visitors: 1980, pct: 9 },
  { city: "Miami", visitors: 1540, pct: 7 },
];

const conversionFunnel = [
  { stage: "Page Views", value: 22400 },
  { stage: "Engagement", value: 14200 },
  { stage: "Inquiry", value: 4800 },
  { stage: "Booking", value: 1470 },
];

const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  active: Math.round(40 + Math.random() * 160 + (i >= 9 && i <= 21 ? 120 : 0)),
}));

const kpis = [
  { label: "Total Visitors", value: "22,430", change: "+18.2%", up: true, icon: Eye },
  { label: "Unique Visitors", value: "14,890", change: "+12.5%", up: true, icon: Users },
  { label: "Avg. Session", value: "3m 42s", change: "+8.1%", up: true, icon: Clock },
  { label: "Bounce Rate", value: "34.2%", change: "-3.4%", up: false, icon: MousePointer },
  { label: "Conversion Rate", value: "6.56%", change: "+1.2%", up: true, icon: TrendingUp },
  { label: "Revenue", value: "$43,400", change: "+24.6%", up: true, icon: BarChart3 },
];

/* ── component ── */
const AnalyticsPage = () => {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  return (
    <DashboardLayout title="Analytics" subtitle="Meridian Tours · Performance Overview">
      {/* Date range pills */}
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        {(["7d", "30d", "90d"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              range === r
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-4 rounded-2xl bg-card border"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-primary" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-semibold ${
                  kpi.up ? "text-[hsl(var(--aura-success))]" : "text-destructive"
                }`}
              >
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            <div className="text-xl font-bold">{kpi.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main charts in tabs */}
      <Tabs defaultValue="visitors" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="visitors" className="gap-1.5"><Activity className="w-3.5 h-3.5" /> Visitors</TabsTrigger>
          <TabsTrigger value="revenue" className="gap-1.5"><BarChart3 className="w-3.5 h-3.5" /> Revenue</TabsTrigger>
          <TabsTrigger value="hourly" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> Hourly</TabsTrigger>
        </TabsList>

        <TabsContent value="visitors">
          <div className="p-5 rounded-2xl bg-card border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Daily Visitors</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Total</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Unique</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailyVisitors}>
                <defs>
                  <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gradVisitors)" />
                <Area type="monotone" dataKey="unique" stroke="hsl(var(--secondary))" strokeWidth={2} fill="url(#gradUnique)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="font-display font-semibold mb-4">Monthly Revenue & Bookings</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis yAxisId="rev" axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v: number) => `$${v / 1000}k`} />
                <YAxis yAxisId="book" orientation="right" axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar yAxisId="rev" dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Line yAxisId="book" type="monotone" dataKey="bookings" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))", r: 3 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="hourly">
          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="font-display font-semibold mb-4">Hourly Active Users (Today)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} className="text-xs" interval={2} />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom grid: traffic sources, devices, funnel, top pages, locations */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Traffic Sources — Pie */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-primary" /> Traffic Sources
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {trafficSources.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {trafficSources.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" /> Device Breakdown
          </h3>
          <div className="space-y-4 mt-6">
            {deviceBreakdown.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-2">
                    <d.icon className="w-4 h-4 text-muted-foreground" />
                    {d.name}
                  </span>
                  <span className="font-semibold">{d.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Conversion Funnel
            </h4>
            <div className="space-y-2">
              {conversionFunnel.map((step, i) => {
                const maxVal = conversionFunnel[0].value;
                const pct = (step.value / maxVal) * 100;
                return (
                  <div key={step.stage}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{step.stage}</span>
                      <span className="font-semibold">{step.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(var(--secondary))" : i === 2 ? "hsl(var(--aura-info))" : "hsl(var(--aura-success))" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * i }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Locations */}
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Top Locations
          </h3>
          <div className="space-y-3">
            {topLocations.map((loc, i) => (
              <div key={loc.city} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{loc.city}</span>
                    <span className="text-muted-foreground">{loc.visitors.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                    <motion.div
                      className="h-full rounded-full bg-primary/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${loc.pct}%` }}
                      transition={{ duration: 0.6, delay: 0.08 * i }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Quick Insight</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Weekend traffic is <span className="font-semibold text-foreground">42% higher</span> than weekdays.
              Attractions and Food pages drive <span className="font-semibold text-foreground">63%</span> of all engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Top Pages table */}
      <div className="p-5 rounded-2xl bg-card border">
        <h3 className="font-display font-semibold mb-4">Top Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Page</th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">Views</th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">Bounce Rate</th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((p) => (
                <tr key={p.page} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-primary">{p.page}</td>
                  <td className="py-2.5 px-3 text-right">{p.views.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">{p.bounce}</td>
                  <td className="py-2.5 px-3 text-right">{p.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
