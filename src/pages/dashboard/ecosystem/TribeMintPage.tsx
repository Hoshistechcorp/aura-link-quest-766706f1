import DashboardLayout from "@/components/aura/DashboardLayout";
import { Users2, ArrowLeft, DollarSign, Share2, TrendingUp, Eye, Star, BarChart3, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const kpis = [
  { label: "Active Creators", value: "156", icon: Users2, change: "+12 this month" },
  { label: "Total Commissions", value: "$18,420", icon: DollarSign, change: "+22% vs last month" },
  { label: "Bookings Generated", value: "892", icon: TrendingUp, change: "Via creator links" },
  { label: "Social Reach", value: "2.4M", icon: Eye, change: "Combined audience" },
];

const creators = [
  { name: "AtlantaFoodie", followers: "245K", bookings: 142, earned: "$3,240", tier: "Gold", conversion: 4.2 },
  { name: "ExploreATL", followers: "180K", bookings: 98, earned: "$2,180", tier: "Gold", conversion: 3.8 },
  { name: "SouthernVibes", followers: "320K", bookings: 87, earned: "$1,960", tier: "Silver", conversion: 2.1 },
  { name: "CityWanderer", followers: "95K", bookings: 64, earned: "$1,420", tier: "Silver", conversion: 3.5 },
  { name: "ATLNightlife", followers: "150K", bookings: 56, earned: "$1,180", tier: "Bronze", conversion: 2.8 },
];

const campaigns = [
  { name: "Spring Festival 2026", creators: 24, reach: "1.2M", budget: "$5,000", spent: "$3,200", status: "active" },
  { name: "Restaurant Week Promo", creators: 18, reach: "890K", budget: "$3,000", spent: "$2,800", status: "active" },
  { name: "Summer Concert Series", creators: 12, reach: "0", budget: "$4,500", spent: "$0", status: "draft" },
];

const TribeMintPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="TribeMint Creators" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(25 85% 55% / 0.12)" }}>
            <Users2 className="w-7 h-7" style={{ color: "hsl(25 85% 55%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">TribeMint Creators</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage creator partnerships, track affiliate commissions, and run influencer campaigns for your destination.</p>
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

        <Tabs defaultValue="creators">
          <TabsList>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="creators" className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm"><UserPlus className="w-4 h-4 mr-1.5" /> Invite Creator</Button>
            </div>
            <div className="space-y-3">
              {creators.map((c) => (
                <Card key={c.name}>
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold">@{c.name}</h4>
                          <Badge variant={c.tier === "Gold" ? "default" : "secondary"} className="text-[10px]">{c.tier}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.followers} followers · {c.conversion}% conversion</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-bold">{c.bookings}</p>
                        <p className="text-[10px] text-muted-foreground">Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{c.earned}</p>
                        <p className="text-[10px] text-muted-foreground">Earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-3">
            {campaigns.map((c) => (
              <Card key={c.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold">{c.name}</h4>
                      <p className="text-xs text-muted-foreground">{c.creators} creators · {c.reach} potential reach</p>
                    </div>
                    <Badge variant={c.status === "active" ? "default" : "secondary"}>{c.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(parseFloat(c.spent.replace(/[$,]/g, "")) / parseFloat(c.budget.replace(/[$,]/g, ""))) * 100} className="flex-1 h-2" />
                    <span className="text-xs font-medium">{c.spent} / {c.budget}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payouts" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Payouts</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { creator: "@AtlantaFoodie", amount: "$820", date: "Mar 1, 2026", status: "paid" },
                  { creator: "@ExploreATL", amount: "$540", date: "Mar 1, 2026", status: "paid" },
                  { creator: "@SouthernVibes", amount: "$480", date: "Mar 1, 2026", status: "processing" },
                  { creator: "@CityWanderer", amount: "$360", date: "Mar 1, 2026", status: "processing" },
                ].map((p) => (
                  <div key={p.creator} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                    <div>
                      <p className="text-sm font-medium">{p.creator}</p>
                      <p className="text-xs text-muted-foreground">{p.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{p.amount}</span>
                      <Badge variant={p.status === "paid" ? "default" : "secondary"} className="text-[10px]">{p.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TribeMintPage;
