import DashboardLayout from "@/components/aura/DashboardLayout";
import { Music2, ArrowLeft, Users2, Star, MapPin, Clock, Search, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const kpis = [
  { label: "Available Talent", value: "342", icon: Users2, change: "In Atlanta metro" },
  { label: "Active Bookings", value: "18", icon: Calendar, change: "Next 14 days" },
  { label: "Avg Rating", value: "4.7", icon: Star, change: "From 892 reviews" },
  { label: "Response Time", value: "2.4h", icon: Clock, change: "Avg acceptance" },
];

const talent = [
  { name: "DJ Pulse", category: "DJ", rating: 4.9, gigs: 142, rate: "$350/hr", location: "Midtown", available: true },
  { name: "Maria Santos", category: "Host/MC", rating: 4.8, gigs: 98, rate: "$200/hr", location: "Buckhead", available: true },
  { name: "The Groove Band", category: "Live Band", rating: 4.7, gigs: 67, rate: "$800/event", location: "Downtown", available: false },
  { name: "Chef Antoine", category: "Private Chef", rating: 4.9, gigs: 54, rate: "$450/event", location: "Decatur", available: true },
  { name: "Alex Rivera", category: "Bartender", rating: 4.6, gigs: 203, rate: "$180/hr", location: "East Atlanta", available: true },
  { name: "Sunset Strings", category: "Live Music", rating: 4.8, gigs: 45, rate: "$600/event", location: "Virginia-Highland", available: true },
];

const bookings = [
  { talent: "DJ Pulse", event: "Spring Rooftop Party", date: "Mar 12", status: "confirmed" },
  { talent: "Maria Santos", event: "Tourism Gala", date: "Mar 15", status: "confirmed" },
  { talent: "Chef Antoine", event: "VIP Dinner Experience", date: "Mar 18", status: "pending" },
  { talent: "Alex Rivera", event: "Festival Cocktail Bar", date: "Mar 22", status: "pending" },
];

const VibesGigsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout title="VibesGigs Staffing" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(280 60% 55% / 0.12)" }}>
            <Music2 className="w-7 h-7" style={{ color: "hsl(280 60% 55%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">VibesGigs Staffing</h2>
            <p className="text-sm text-muted-foreground mt-1">Find and book DJs, hosts, chefs, bartenders, and performers for tourism events and experiences.</p>
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

        <Tabs defaultValue="marketplace">
          <TabsList>
            <TabsTrigger value="marketplace">Talent Marketplace</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search talent by name, category, or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {talent.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())).map((t) => (
                <Card key={t.name}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{t.name}</h4>
                          <p className="text-xs text-muted-foreground">{t.category}</p>
                        </div>
                      </div>
                      {t.available ? (
                        <Badge variant="default" className="text-[10px]">Available</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">Booked</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {t.rating}</span>
                      <span>{t.gigs} gigs</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold">{t.rate}</span>
                      <Button size="sm" disabled={!t.available}>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-3">
            {bookings.map((b) => (
              <Card key={b.talent + b.date}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{b.talent}</h4>
                    <p className="text-xs text-muted-foreground">{b.event} · {b.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.status === "confirmed" ? (
                      <><CheckCircle2 className="w-4 h-4 text-green-500" /><span className="text-xs font-medium text-green-600">Confirmed</span></>
                    ) : (
                      <><Clock className="w-4 h-4 text-yellow-500" /><span className="text-xs font-medium text-yellow-600">Pending</span></>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VibesGigsPage;
