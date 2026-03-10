import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Utensils, Hotel, Landmark, Star, ArrowRight, Trophy } from "lucide-react";
import { attractions, restaurants, events } from "@/data/dallasData";
import heroImg from "@/assets/dallas-hero.jpg";
import artsImg from "@/assets/dallas-arts.jpg";
import bbqImg from "@/assets/dallas-bbq.jpg";
import hotelImg from "@/assets/dallas-hotel.jpg";
import eventImg from "@/assets/dallas-event.jpg";
import worldcupImg from "@/assets/dallas-worldcup.jpg";

const quickLinks = [
  { icon: Landmark, label: "Things to Do", path: "/dallas/attractions", color: "hsl(var(--tourism-navy))" },
  { icon: Utensils, label: "Eat & Drink", path: "/dallas/restaurants", color: "hsl(var(--tourism-coral))" },
  { icon: Hotel, label: "Where to Stay", path: "/dallas/hotels", color: "hsl(var(--tourism-sage))" },
  { icon: Calendar, label: "Events", path: "/dallas/events", color: "hsl(var(--tourism-sky))" },
  { icon: Trophy, label: "World Cup", path: "/dallas/worldcup", color: "hsl(var(--tourism-gold))" },
];

const featuredImages = [artsImg, bbqImg, hotelImg, eventImg];

const DallasHomePage = () => {
  const featuredAttractions = attractions.filter((a) => a.featured).slice(0, 4);
  const featuredEvents = events.filter((e) => e.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <img src={heroImg} alt="Dallas skyline at sunset" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 sm:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-2">Welcome to</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-3 leading-[1.1]">Dallas</h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-xl mb-6">
              Big dreams, bold flavors, and unforgettable experiences in the heart of Texas.
            </p>
            {/* Search Bar */}
            <div className="flex max-w-lg">
              <div className="flex-1 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-l-xl px-4 py-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search attractions, restaurants, events..."
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button className="px-5 rounded-r-xl bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                Explore
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {quickLinks.map((link, i) => (
            <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
              <Link
                to={link.path}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all text-center group"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <link.icon className="w-5 h-5" style={{ color: link.color }} />
                </div>
                <span className="text-xs font-medium group-hover:text-primary transition-colors">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">Must-See Attractions</h2>
            <p className="text-muted-foreground text-sm mt-1">Iconic landmarks and experiences that define Dallas</p>
          </div>
          <Link to="/dallas/attractions" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredAttractions.map((attr, i) => (
            <motion.div key={attr.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={`/dallas/attractions/${attr.id}`} className="listing-card block group">
                <div className="aspect-[4/3] overflow-hidden">
                  {featuredImages[i] ? (
                    <img src={featuredImages[i]} alt={attr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-display font-semibold text-sm">{attr.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{attr.neighborhood}</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-secondary text-secondary" />{attr.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <Link to="/dallas/attractions" className="sm:hidden flex items-center justify-center gap-1 mt-4 text-sm font-medium text-primary">
          View all attractions <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* World Cup Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <Link to="/dallas/worldcup" className="block relative rounded-2xl overflow-hidden group">
          <div className="aspect-[21/9] sm:aspect-[3/1]">
            <img src={worldcupImg} alt="FIFA World Cup 2026 Dallas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent flex items-center">
            <div className="px-6 sm:px-10">
              <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-1">FIFA World Cup 2026</p>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-2">Dallas Is Ready</h2>
              <p className="text-white/80 text-sm sm:text-base max-w-md mb-3">Match schedules, fan zones, team guides & more — your complete World Cup companion.</p>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                Explore World Cup Hub <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Upcoming Events */}
      <section className="bg-muted/50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Upcoming Events</h2>
              <p className="text-muted-foreground text-sm mt-1">Don't miss what's happening in Dallas</p>
            </div>
            <Link to="/dallas/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              All events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredEvents.map((evt, i) => (
              <motion.div key={evt.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="listing-card p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-primary uppercase">
                        {new Date(evt.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-lg font-bold text-primary leading-none">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-sm">{evt.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{evt.venue} · {evt.neighborhood}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{evt.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary">{evt.price}</span>
                    <div className="flex gap-1">
                      {evt.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">Plan Your Dallas Adventure</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          From iconic BBQ joints to world-class museums, Dallas has something for everyone. Start planning today.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/dallas/attractions" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Explore Attractions
          </Link>
          <Link to="/dallas/restaurants" className="px-6 py-3 rounded-xl bg-card border font-medium text-sm hover:bg-muted transition-colors">
            Find Restaurants
          </Link>
          <Link to="/dallas/hotels" className="px-6 py-3 rounded-xl bg-card border font-medium text-sm hover:bg-muted transition-colors">
            Book a Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DallasHomePage;
