import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, MapPin, Clock, Users, ArrowRight, Star, Tv, Utensils, Hotel as HotelIcon, PartyPopper } from "lucide-react";
import { worldCupMatches, fanZones } from "@/data/dallasData";
import worldcupImg from "@/assets/dallas-worldcup.jpg";

const tabs = [
  { id: "schedule", label: "Match Schedule", icon: Trophy },
  { id: "fanzones", label: "Fan Zones", icon: Tv },
  { id: "guides", label: "Team Guides", icon: Users },
  { id: "availability", label: "Last-Minute", icon: HotelIcon },
];

const teamGuides = [
  { team: "USA", flag: "🇺🇸", fans: "Where to Watch: Deep Ellum bars, Victory Park Fan Zone", food: "American BBQ & craft beer crawl", stay: "Downtown & Uptown hotels" },
  { team: "Mexico", flag: "🇲🇽", fans: "Where to Watch: Oak Cliff, Bishop Arts screenings", food: "Authentic Mexican in Oak Cliff", stay: "Bishop Arts boutique hotels" },
  { team: "Brazil", flag: "🇧🇷", fans: "Where to Watch: Fair Park International Pavilion", food: "Brazilian steakhouses & churrascarias", stay: "Deep Ellum area for nightlife" },
  { team: "Argentina", flag: "🇦🇷", fans: "Where to Watch: Klyde Warren Village", food: "Argentine restaurants & empanada shops", stay: "Uptown for easy transit" },
  { team: "Germany", flag: "🇩🇪", fans: "Where to Watch: Victory Park Fan Zone", food: "German beer halls & biergartens", stay: "Downtown luxury hotels" },
  { team: "France", flag: "🇫🇷", fans: "Where to Watch: Arts District venues", food: "French bistros & wine bars", stay: "The Adolphus Hotel" },
];

const DallasWorldCupPage = () => {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={worldcupImg} alt="FIFA World Cup 2026 Dallas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-bold text-sm uppercase tracking-widest">FIFA World Cup 2026™</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">Dallas World Cup Hub</h1>
            <p className="text-white/80 text-base sm:text-lg max-w-xl">
              Your complete guide to the World Cup in Dallas — matches, fan zones, recommendations, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Match Schedule */}
        {activeTab === "schedule" && (
          <div className="space-y-3 mt-4">
            {worldCupMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="listing-card p-4 sm:p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-bold uppercase">{match.stage}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(match.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} · {match.time}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-6 sm:gap-10 py-3">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl">{match.teamFlags[0]}</span>
                    <p className="font-display font-bold text-sm sm:text-base mt-1">{match.teams[0]}</p>
                  </div>
                  <span className="text-xl font-bold text-muted-foreground">VS</span>
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl">{match.teamFlags[1]}</span>
                    <p className="font-display font-bold text-sm sm:text-base mt-1">{match.teams[1]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  {match.venue}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-aura-success/10 space-y-1">
                    <p className="text-[11px] font-bold text-aura-success uppercase tracking-wider">Pre-Game</p>
                    {match.preGameRecs.map((rec, j) => (
                      <p key={j} className="text-xs text-muted-foreground">• {rec}</p>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-aura-info/10 space-y-1">
                    <p className="text-[11px] font-bold text-aura-info uppercase tracking-wider">Post-Game</p>
                    {match.postGameRecs.map((rec, j) => (
                      <p key={j} className="text-xs text-muted-foreground">• {rec}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Fan Zones */}
        {activeTab === "fanzones" && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {fanZones.map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="listing-card p-5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <PartyPopper className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base">{zone.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />{zone.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />Capacity: {zone.capacity}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{zone.hours}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {zone.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">{f}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Team Guides */}
        {activeTab === "guides" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {teamGuides.map((team, i) => (
              <motion.div
                key={team.team}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="listing-card p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{team.flag}</span>
                  <h3 className="font-display font-bold text-lg">{team.team} Fan Guide</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Tv className="w-4 h-4 text-aura-info shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{team.fans}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Utensils className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{team.food}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <HotelIcon className="w-4 h-4 text-aura-success shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{team.stay}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Last-Minute Availability */}
        {activeTab === "availability" && (
          <div className="mt-4 space-y-6">
            <div className="listing-card p-6 text-center">
              <HotelIcon className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-xl mb-2">Last-Minute Availability Finder</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                Find available hotels and restaurants near AT&T Stadium and fan zones during match days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <select className="flex-1 px-3 py-2.5 rounded-lg border bg-card text-sm">
                  <option>Select Match Day</option>
                  {worldCupMatches.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.teams[0]} vs {m.teams[1]} — {new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </option>
                  ))}
                </select>
                <select className="flex-1 px-3 py-2.5 rounded-lg border bg-card text-sm">
                  <option>Hotels & Stays</option>
                  <option>Restaurants</option>
                  <option>Both</option>
                </select>
                <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 justify-center">
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sample Results */}
            <div>
              <h4 className="font-display font-semibold mb-3">Near AT&T Stadium</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: "Marriott Arlington", distance: "0.3 mi", price: "$289/night", available: true },
                  { name: "Live! by Loews", distance: "0.1 mi", price: "$349/night", available: true },
                  { name: "Sheraton Arlington", distance: "0.5 mi", price: "$199/night", available: false },
                  { name: "Hilton Arlington", distance: "0.8 mi", price: "$179/night", available: true },
                  { name: "Texas Live! Restaurants", distance: "0.1 mi", price: "$$", available: true },
                  { name: "Babe's Chicken", distance: "1.2 mi", price: "$", available: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-3 rounded-xl border ${item.available ? "bg-card" : "bg-muted/50 opacity-60"}`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm">{item.name}</h5>
                      {item.available ? (
                        <span className="aura-badge aura-badge-success text-[10px]">Available</span>
                      ) : (
                        <span className="aura-badge text-[10px] bg-destructive/10 text-destructive">Sold Out</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{item.distance} from stadium</span>
                      <span className="font-semibold text-secondary">{item.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DallasWorldCupPage;
