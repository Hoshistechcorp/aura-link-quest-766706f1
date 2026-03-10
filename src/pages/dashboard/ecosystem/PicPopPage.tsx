import DashboardLayout from "@/components/aura/DashboardLayout";
import { Camera, ArrowLeft, Image, Flag, Share2, TrendingUp, Eye, Heart, Download, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total Photos", value: "12,847", icon: Image, change: "+342 this week" },
  { label: "Pending Review", value: "58", icon: Flag, change: "18 flagged" },
  { label: "Social Shares", value: "4,291", icon: Share2, change: "+12% vs last month" },
  { label: "Engagement Rate", value: "8.7%", icon: TrendingUp, change: "+1.2pp" },
];

const photos = [
  { id: 1, user: "Sarah M.", location: "Georgia Aquarium", likes: 234, status: "approved", flagged: false },
  { id: 2, user: "Jake T.", location: "Piedmont Park", likes: 189, status: "approved", flagged: false },
  { id: 3, user: "Maria L.", location: "Ponce City Market", likes: 412, status: "pending", flagged: false },
  { id: 4, user: "Chris W.", location: "High Museum", likes: 67, status: "flagged", flagged: true },
  { id: 5, user: "Emma R.", location: "BeltLine Trail", likes: 301, status: "approved", flagged: false },
  { id: 6, user: "David K.", location: "Centennial Park", likes: 156, status: "pending", flagged: false },
];

const PicPopPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [autoApprove, setAutoApprove] = useState(false);

  return (
    <DashboardLayout title="PicPop Photo Manager" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero */}
        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(340 70% 55% / 0.12)" }}>
            <Camera className="w-7 h-7" style={{ color: "hsl(340 70% 55%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">PicPop Photo Manager</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage visitor-submitted photos, moderate content, and curate destination galleries.</p>
          </div>
        </div>

        {/* KPIs */}
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

        <Tabs defaultValue="feed">
          <TabsList>
            <TabsTrigger value="feed">Photo Feed</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by user or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.filter((p) => !search || p.user.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Image className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <CardContent className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{p.user}</span>
                      <Badge variant={p.status === "flagged" ? "destructive" : p.status === "pending" ? "secondary" : "default"} className="text-[10px]">
                        {p.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.location}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {p.likes}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.likes * 4}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Moderation Queue</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {photos.filter((p) => p.status !== "approved").map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Image className="w-5 h-5 text-muted-foreground/40" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.user} — {p.location}</p>
                        <p className="text-xs text-muted-foreground">{p.flagged ? "Flagged by AI" : "Awaiting review"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">Approve</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-approve verified users</p>
                    <p className="text-xs text-muted-foreground">Photos from verified accounts skip moderation</p>
                  </div>
                  <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">AI content moderation</p>
                    <p className="text-xs text-muted-foreground">Automatically flag inappropriate content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Watermark exports</p>
                    <p className="text-xs text-muted-foreground">Add destination branding to exported photos</p>
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

export default PicPopPage;
