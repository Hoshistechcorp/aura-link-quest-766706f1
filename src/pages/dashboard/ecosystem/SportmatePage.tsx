import DashboardLayout from "@/components/aura/DashboardLayout";
import { Trophy, ArrowLeft, CalendarDays, Users2, MapPin, TrendingUp, Clock, Tv, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const kpis = [
  { label: "Upcoming Events", value: "24", icon: CalendarDays, change: "Next 30 days" },
  { label: "Watch Parties", value: "8", icon: Tv, change: "This weekend" },
  { label: "Fan RSVPs", value: "3,241", icon: Users2, change: "+18% vs last month" },
  { label: "Venue Partners", value: "42", icon: MapPin, change: "12 premium" },
];

const events = [
  { name: "Atlanta United vs Inter Miami", sport: "Soccer", venue: "Mercedes-Benz Stadium", date: "Mar 15", rsvps: 892, capacity: 1200, status: "selling" },
  { name: "Hawks vs Celtics", sport: "Basketball", venue: "State Farm Arena", date: "Mar 18", rsvps: 456, capacity: 600, status: "selling" },
  { name: "Braves Opening Day", sport: "Baseball", venue: "Truist Park", date: "Mar 28", rsvps: 1540, capacity: 2000, status: "selling" },
  { name: "Atlanta Dream vs Aces", sport: "Basketball", venue: "Gateway Center", date: "Apr 2", rsvps: 210, capacity: 400, status: "upcoming" },
];

const watchParties = [
  { name: "Super Bowl Watch Party", venue: "The Brass Tap", attendees: 120, rating: 4.8 },
  { name: "Champions League Final", venue: "Fado Irish Pub", attendees: 85, rating: 4.6 },
  { name: "March Madness HQ", venue: "Stats Brewpub", attendees: 200, rating: 4.7 },
];

const SportmatePage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Sportmate Events" subtitle="Tourism Ecosystem">
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(120 50% 40% / 0.12)" }}>
            <Trophy className="w-7 h-7" style={{ color: "hsl(120 50% 40%)" }} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Sportmate Events</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage sports events, watch parties, and fan experiences across your destination.</p>
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

        <Tabs defaultValue="events">
          <TabsList>
            <TabsTrigger value="events">Game Schedule</TabsTrigger>
            <TabsTrigger value="parties">Watch Parties</TabsTrigger>
            <TabsTrigger value="leaderboard">Fan Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-3">
            {events.map((e) => (
              <Card key={e.name}>
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{e.name}</h4>
                      <Badge variant="secondary" className="text-[10px]">{e.sport}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{e.venue} · {e.date}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <Progress value={(e.rsvps / e.capacity) * 100} className="flex-1 h-2" />
                      <span className="text-xs font-medium">{e.rsvps}/{e.capacity} RSVPs</span>
                    </div>
                  </div>
                  <Badge variant={e.status === "selling" ? "default" : "secondary"}>{e.status === "selling" ? "On Sale" : "Upcoming"}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="parties" className="space-y-3">
            {watchParties.map((wp) => (
              <Card key={wp.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{wp.name}</h4>
                    <p className="text-xs text-muted-foreground">{wp.venue} · {wp.attendees} attendees</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {wp.rating}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-3">
            <Card>
              <CardHeader><CardTitle className="text-base">Top Sports Fans</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Mike D.", events: 28, points: 4200, rank: 1 },
                  { name: "Jessica P.", events: 24, points: 3800, rank: 2 },
                  { name: "Carlos R.", events: 21, points: 3400, rank: 3 },
                  { name: "Aisha K.", events: 19, points: 3100, rank: 4 },
                  { name: "Tom B.", events: 17, points: 2800, rank: 5 },
                ].map((fan) => (
                  <div key={fan.rank} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${fan.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {fan.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{fan.name}</p>
                        <p className="text-xs text-muted-foreground">{fan.events} events attended</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">{fan.points.toLocaleString()} pts</span>
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

export default SportmatePage;
