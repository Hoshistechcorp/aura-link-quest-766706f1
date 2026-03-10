import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Star, Users, X, ExternalLink, Search, Globe, Filter,
  ArrowLeft, Plane,
} from "lucide-react";
import BottomBrandBar from "@/components/aura/BottomBrandBar";

/* ── Mock destination data ─────────────────────── */
interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  rating: number;
  visitors: string;
  tagline: string;
  tags: string[];
  coords: { x: number; y: number }; // % position on SVG map
}

const destinations: Destination[] = [
  { id: "atlanta", name: "Atlanta", country: "USA", region: "North America", rating: 4.8, visitors: "12M", tagline: "Where Culture, Food, and Music Meet.", tags: ["Culture", "Food", "Music"], coords: { x: 22, y: 42 } },
  { id: "new-york", name: "New York", country: "USA", region: "North America", rating: 4.9, visitors: "66M", tagline: "The City That Never Sleeps.", tags: ["Urban", "Arts", "Food"], coords: { x: 24, y: 38 } },
  { id: "miami", name: "Miami", country: "USA", region: "North America", rating: 4.6, visitors: "24M", tagline: "Sun, Sand, and Endless Vibes.", tags: ["Beach", "Nightlife", "Art Deco"], coords: { x: 21, y: 47 } },
  { id: "cancun", name: "Cancún", country: "Mexico", region: "North America", rating: 4.5, visitors: "18M", tagline: "Caribbean Paradise Awaits.", tags: ["Beach", "Ruins", "Resort"], coords: { x: 17, y: 48 } },
  { id: "london", name: "London", country: "UK", region: "Europe", rating: 4.8, visitors: "32M", tagline: "History Meets Innovation.", tags: ["History", "Theater", "Royal"], coords: { x: 47, y: 30 } },
  { id: "paris", name: "Paris", country: "France", region: "Europe", rating: 4.9, visitors: "44M", tagline: "The City of Light.", tags: ["Romance", "Art", "Cuisine"], coords: { x: 48, y: 33 } },
  { id: "barcelona", name: "Barcelona", country: "Spain", region: "Europe", rating: 4.7, visitors: "15M", tagline: "Art, Architecture, and Mediterranean Soul.", tags: ["Architecture", "Beach", "Tapas"], coords: { x: 47, y: 38 } },
  { id: "rome", name: "Rome", country: "Italy", region: "Europe", rating: 4.8, visitors: "10M", tagline: "The Eternal City.", tags: ["History", "Food", "Art"], coords: { x: 51, y: 37 } },
  { id: "dubai", name: "Dubai", country: "UAE", region: "Middle East", rating: 4.7, visitors: "16M", tagline: "Where the Future Begins.", tags: ["Luxury", "Shopping", "Architecture"], coords: { x: 60, y: 45 } },
  { id: "tokyo", name: "Tokyo", country: "Japan", region: "Asia", rating: 4.9, visitors: "14M", tagline: "Tradition Meets Tomorrow.", tags: ["Tech", "Culture", "Food"], coords: { x: 82, y: 38 } },
  { id: "bangkok", name: "Bangkok", country: "Thailand", region: "Asia", rating: 4.6, visitors: "23M", tagline: "The Land of Smiles.", tags: ["Temples", "Street Food", "Nightlife"], coords: { x: 74, y: 52 } },
  { id: "sydney", name: "Sydney", country: "Australia", region: "Oceania", rating: 4.7, visitors: "10M", tagline: "Harbour City Brilliance.", tags: ["Beach", "Opera", "Nature"], coords: { x: 85, y: 78 } },
  { id: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa", rating: 4.6, visitors: "5M", tagline: "Where Two Oceans Meet.", tags: ["Nature", "Wine", "Culture"], coords: { x: 52, y: 78 } },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", region: "South America", rating: 4.5, visitors: "7M", tagline: "Carnival Spirit All Year.", tags: ["Beach", "Carnival", "Mountains"], coords: { x: 32, y: 72 } },
  { id: "jamaica", name: "Kingston", country: "Jamaica", region: "Caribbean", rating: 4.4, visitors: "4M", tagline: "Feel the Rhythm of the Island.", tags: ["Music", "Beach", "Culture"], coords: { x: 20, y: 50 } },
  { id: "nairobi", name: "Nairobi", country: "Kenya", region: "Africa", rating: 4.5, visitors: "3M", tagline: "Gateway to the Wild.", tags: ["Safari", "Nature", "Culture"], coords: { x: 57, y: 60 } },
];

const regions = ["All", "North America", "Europe", "Asia", "Africa", "South America", "Middle East", "Oceania", "Caribbean"];

const GlobalMapPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Destination | null>(null);
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const filtered = destinations.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = activeRegion === "All" || d.region === activeRegion;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/microsite")} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Globe className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-lg">Global Destinations</h1>
          <span className="text-xs text-muted-foreground ml-1">{destinations.length} cities</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
              className="px-3 py-1.5 rounded-xl bg-muted text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              {viewMode === "map" ? "List View" : "Map View"}
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cities or countries..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  activeRegion === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === "map" ? (
        /* ── Interactive Map View ──────────────────── */
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative w-full aspect-[2/1] bg-card rounded-3xl border shadow-sm overflow-hidden">
            {/* Simple SVG world map outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Ocean background */}
              <rect width="100" height="100" fill="hsl(var(--muted))" rx="2" opacity="0.3" />

              {/* Simplified continent shapes */}
              {/* North America */}
              <path d="M10,20 L28,18 L30,25 L28,35 L25,42 L22,48 L18,50 L14,46 L12,38 L8,30 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />
              {/* South America */}
              <path d="M22,55 L30,52 L35,58 L36,68 L33,78 L28,82 L24,76 L22,65 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />
              {/* Europe */}
              <path d="M44,18 L55,16 L58,22 L56,30 L52,35 L48,38 L44,36 L42,28 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />
              {/* Africa */}
              <path d="M44,40 L56,38 L60,45 L62,55 L58,68 L54,78 L48,80 L44,72 L42,58 L43,48 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />
              {/* Asia */}
              <path d="M58,15 L88,12 L92,20 L90,35 L85,42 L78,48 L72,55 L65,52 L60,45 L58,35 L56,25 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />
              {/* Australia */}
              <path d="M78,68 L92,65 L94,72 L92,80 L84,82 L78,78 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.3" />

              {/* Grid lines */}
              {[20, 40, 60, 80].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="hsl(var(--border))" strokeWidth="0.1" strokeDasharray="1,1" />
              ))}
              {[25, 50, 75].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.1" strokeDasharray="1,1" />
              ))}
            </svg>

            {/* Destination pins */}
            {filtered.map((dest) => (
              <motion.button
                key={dest.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: Math.random() * 0.3 }}
                onClick={() => setSelected(dest)}
                className="absolute group"
                style={{ left: `${dest.coords.x}%`, top: `${dest.coords.y}%`, transform: "translate(-50%, -100%)" }}
              >
                {/* Pulse ring */}
                <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping opacity-30" />
                {/* Pin */}
                <div className={`relative w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                  selected?.id === dest.id ? "bg-aura-warning scale-125" : "bg-primary"
                }`}>
                  <MapPin className="w-3 h-3 text-primary-foreground" />
                </div>
                {/* Label */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap px-2 py-0.5 rounded-md bg-card border shadow-sm text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {dest.name}
                </div>
              </motion.button>
            ))}

            {/* Selected city card */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 p-5 rounded-2xl bg-card border shadow-2xl"
                >
                  <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-display font-bold text-lg">{selected.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{selected.country} · {selected.region}</p>
                  <p className="text-sm text-muted-foreground mt-2 italic">"{selected.tagline}"</p>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-aura-warning text-aura-warning" />{selected.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{selected.visitors} visitors/yr</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selected.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{t}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/microsite")}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Plane className="w-4 h-4" /> Explore Destination
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">Click any pin to explore a destination · {filtered.length} cities shown</p>
        </div>
      ) : (
        /* ── List View ─────────────────────────────── */
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="space-y-3">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(dest)}
                className="p-4 rounded-2xl bg-card border shadow-sm hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold">{dest.name}</h3>
                      <span className="text-xs text-muted-foreground">{dest.country}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{dest.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-aura-warning text-aura-warning" />
                      <span className="font-medium">{dest.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{dest.visitors}/yr</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dest.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No destinations found for your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomBrandBar />
    </div>
  );
};

export default GlobalMapPage;
