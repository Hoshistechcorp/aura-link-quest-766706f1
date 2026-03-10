import DashboardLayout from "@/components/aura/DashboardLayout";
import { Building, ArrowLeft, Eye, BarChart3, TrendingUp, Users2, MapPin, FileText, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "City Data Score", value: "94/100", icon: BarChart3, change: "Top 5% nationally" },
  { label: "Reports Generated", value: "28", icon: FileText, change: "This quarter" },
  { label: "Economic Impact", value: "$4.2M", icon: TrendingUp, change: "Tourism revenue tracked" },
  { label: "Active Partners", value: "186", icon: Users2, change: "Contributing venues" },
];

const visitorData = [
  { month: "Oct", domestic: 42000, international: 8200 },
  { month: "Nov", domestic: 38000, international: 7100 },
  { month: "Dec", domestic: 51000, international: 12400 },
  { month: "Jan", domestic: 35000, international: 6800 },
  { month: "Feb", domestic: 39000, international: 7600 },
  { month: "Mar", domestic: 48000, international: 9800 },
];

const spendingData = [
  { name: "Dining", value: 35 },
  { name: "Hotels", value: 28 },
  { name: "Attractions", value: 18 },
  { name: "Shopping", value: 12 },
  { name: "Transport", value: 7 },
];

const COLORS = ["hsl(var(--primary))", "hsl(210 70% 50%)", "hsl(280 60% 55%)", "hsl(38 90% 55%)", "hsl(152 60% 40%)"];

const MunicipalNebulaPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Municipal Nebula" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(220 50% 45% / 0.12)" }}>
            <Building className="w-7 h-7" style={{ color: "hsl(220 50% 45%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Municipal Nebula</h2>
            <p className="text-sm text-muted-foreground mt-1">City data intelligence for local governments — share tourism insights, economic impact reports, and visitor analytics.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <k.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{k.label}</span>
                </div>
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="analytics">
          <TabsList>
            <TabsTrigger value="analytics">City Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="sharing">Data Sharing</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle className="text-base">Visitor Trends (6 Months)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={visitorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="domestic" fill="hsl(var(--primary))" name="Domestic" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="international" fill="hsl(210 70% 50%)" name="International" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Spending Distribution</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={spendingData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                        {spendingData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1 mt-2">
                    {spendingData.map((s, i) => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                          <span>{s.name}</span>
                        </div>
                        <span className="font-medium">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-3">
            {[
              { name: "Q1 2026 Tourism Impact Report", date: "Mar 2026", pages: 24, status: "ready" },
              { name: "February Visitor Analytics", date: "Feb 2026", pages: 12, status: "ready" },
              { name: "Economic Impact Assessment", date: "Jan 2026", pages: 36, status: "ready" },
              { name: "Q2 2026 Forecast", date: "Apr 2026", pages: 0, status: "generating" },
            ].map((r) => (
              <Card key={r.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-semibold">{r.name}</h4>
                      <p className="text-xs text-muted-foreground">{r.date} {r.pages > 0 && `· ${r.pages} pages`}</p>
                    </div>
                  </div>
                  <Badge variant={r.status === "ready" ? "default" : "secondary"}>{r.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sharing" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Share anonymized visitor data</p>
                      <p className="text-xs text-muted-foreground">Aggregate patterns shared with city planning</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Economic impact metrics</p>
                      <p className="text-xs text-muted-foreground">Revenue and spending data for city reports</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Full transparency mode</p>
                      <p className="text-xs text-muted-foreground">Real-time data access for government partners</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Heatmap data contribution</p>
                      <p className="text-xs text-muted-foreground">Anonymous location density for infrastructure planning</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MunicipalNebulaPage;
