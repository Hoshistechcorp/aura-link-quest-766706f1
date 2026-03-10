import DashboardLayout from "@/components/aura/DashboardLayout";
import { Wallet, ArrowLeft, DollarSign, Users2, CreditCard, TrendingUp, Receipt, PieChart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { label: "Active Deposits", value: "$42,180", icon: DollarSign, change: "128 open deposits" },
  { label: "Bills Split", value: "1,847", icon: CreditCard, change: "+15% this month" },
  { label: "Co-Funded Trips", value: "234", icon: Users2, change: "Avg $320/group" },
  { label: "Revenue Share", value: "$2,840", icon: TrendingUp, change: "Platform fees earned" },
];

const deposits = [
  { guest: "Emily & Group", experience: "Dragon Con VIP Package", amount: "$450", paid: "$225", due: "Mar 20", members: 4 },
  { guest: "The Johnsons", experience: "Atlanta Food Tour", amount: "$280", paid: "$140", due: "Mar 25", members: 6 },
  { guest: "Tech Meetup ATL", experience: "Conference After-Party", amount: "$1,200", paid: "$800", due: "Apr 1", members: 12 },
  { guest: "Sarah's Birthday", experience: "Rooftop Dinner Experience", amount: "$680", paid: "$340", due: "Apr 5", members: 8 },
];

const FlexitPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Flex-it Payments" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(152 60% 40% / 0.12)" }}>
            <Wallet className="w-7 h-7" style={{ color: "hsl(152 60% 40%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Flex-it Payments</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage deposits, bill splitting, and co-funded group experiences for tourism packages.</p>
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

        <Tabs defaultValue="deposits">
          <TabsList>
            <TabsTrigger value="deposits">Active Deposits</TabsTrigger>
            <TabsTrigger value="splitting">Bill Splitting</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="deposits" className="space-y-3">
            {deposits.map((d) => (
              <Card key={d.guest}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold">{d.guest}</h4>
                      <p className="text-xs text-muted-foreground">{d.experience} · {d.members} members</p>
                    </div>
                    <Badge variant="secondary">Due {d.due}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(parseFloat(d.paid.replace("$", "")) / parseFloat(d.amount.replace("$", ""))) * 100} className="flex-1 h-2" />
                    <span className="text-xs font-medium">{d.paid} / {d.amount}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="splitting" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Splits</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { group: "Friday Night Out", total: "$486", people: 6, each: "$81", status: "complete" },
                  { group: "Weekend Brunch", total: "$312", people: 4, each: "$78", status: "complete" },
                  { group: "Concert Tickets", total: "$720", people: 8, each: "$90", status: "pending" },
                ].map((s) => (
                  <div key={s.group} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                    <div>
                      <p className="text-sm font-medium">{s.group}</p>
                      <p className="text-xs text-muted-foreground">{s.people} people · {s.each} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{s.total}</span>
                      <Badge variant={s.status === "complete" ? "default" : "secondary"} className="text-[10px]">{s.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Enable deposits for all experiences</p>
                    <p className="text-xs text-muted-foreground">Allow visitors to pay 50% upfront</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Group co-funding</p>
                    <p className="text-xs text-muted-foreground">Allow groups to pool money for experiences</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-refund policy</p>
                    <p className="text-xs text-muted-foreground">Full refund if cancelled 48h+ before</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Platform fee (2.5%)</p>
                    <p className="text-xs text-muted-foreground">Applied to each transaction</p>
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

export default FlexitPage;
