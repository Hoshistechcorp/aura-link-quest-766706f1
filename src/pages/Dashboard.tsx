import { Eye, MousePointer, TrendingUp, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import DashboardLayout from "@/components/aura/DashboardLayout";
import UsageMeter from "@/components/aura/UsageMeter";

// ... keep existing code (viewData, engagementData, metrics, activities)
const viewData = [
  { day: "Mon", views: 320 },
  { day: "Tue", views: 480 },
  { day: "Wed", views: 520 },
  { day: "Thu", views: 410 },
  { day: "Fri", views: 680 },
  { day: "Sat", views: 890 },
  { day: "Sun", views: 750 },
];

const engagementData = [
  { day: "Mon", rate: 32 },
  { day: "Tue", rate: 45 },
  { day: "Wed", rate: 38 },
  { day: "Thu", rate: 52 },
  { day: "Fri", rate: 48 },
  { day: "Sat", rate: 61 },
  { day: "Sun", rate: 55 },
];

const metrics = [
  { label: "Page Views", value: "12,847", change: "+18%", icon: Eye },
  { label: "Attractions Visited", value: "4,231", change: "+24%", icon: MousePointer },
  { label: "Event Tickets", value: "1,892", change: "+31%", icon: TrendingUp },
  { label: "Active Modules", value: "16", change: "All Live", icon: CreditCard },
];

const activities = [
  { text: "New review on Attractions ⭐⭐⭐⭐⭐", time: "2m ago" },
  { text: "Events module: Jazz Festival trending", time: "15m ago" },
  { text: "Dining module: 8 new restaurant listings", time: "1h ago" },
  { text: "Gamification: 142 spins today", time: "2h ago" },
  { text: "Hotels & Stays: 26 bookings this week", time: "3h ago" },
  { text: "Photo & Video gallery: 12 new uploads", time: "5h ago" },
];


const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <m.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className="aura-badge aura-badge-success text-[10px]">{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>


      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Page Views</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={viewData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Bar dataKey="views" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Booking Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <UsageMeter />
        <div className="p-5 rounded-2xl bg-card border">
          <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{a.text}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
