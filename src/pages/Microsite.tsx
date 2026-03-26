import { useNavigate } from "react-router-dom";
import {
  Phone, MessageCircle, Navigation, Share2, Bookmark,
  Camera, Star, Bot, Users, HelpCircle,
  Landmark, Compass, Hotel, TreePine, Map, Train,
  Store, Tag, Palette, UtensilsCrossed, Calendar,
  Leaf, Gamepad2, MapPin, Wine, Heart, Trophy,
  Baby, Video, FileText, MessageSquare, Accessibility,
} from "lucide-react";
import DestinationHeader from "@/components/aura/DestinationHeader";
import ActionButton from "@/components/aura/ActionButton";
import AuraCard from "@/components/aura/AuraCard";
import BottomBrandBar from "@/components/aura/BottomBrandBar";
import AuraSupermenu from "@/components/aura/AuraSupermenu";
import { motion } from "framer-motion";

import attractionAquarium from "@/assets/attraction-aquarium.jpg";
import eventJazz from "@/assets/event-jazz.jpg";
import photoBeltline from "@/assets/photo-beltline.jpg";
import restaurantBbq from "@/assets/restaurant-bbq.jpg";

const actions = [
  { icon: Phone, label: "Call" },
  { icon: MessageCircle, label: "Message" },
  { icon: Navigation, label: "Directions" },
  { icon: Share2, label: "Share" },
  { icon: Bookmark, label: "Save" },
];

/* ── Consolidated Module Cards ── */
const cards = [
  { icon: Landmark,        title: "Attractions",          subtitle: "Sights, museums & tours",       color: "hsl(var(--primary))" },
  { icon: Calendar,        title: "Events & Festivals",   subtitle: "Calendar & tickets",            color: "hsl(var(--aura-warning))" },
  { icon: UtensilsCrossed, title: "Dining",               subtitle: "Restaurants & food tours",      color: "hsl(var(--primary))" },
  { icon: Hotel,           title: "Hotels & Stays",       subtitle: "Book & compare",                color: "hsl(var(--aura-info))" },
  { icon: Compass,         title: "Plan Your Trip",       subtitle: "Itinerary builder",             color: "hsl(var(--aura-info))" },
  { icon: Tag,             title: "Deals & Packages",     subtitle: "Offers & bundles",              color: "hsl(var(--aura-success))" },
  { icon: Train,           title: "Getting Around",       subtitle: "Transit, parking & bikes",      color: "hsl(var(--aura-info))" },
  { icon: Palette,         title: "Cultural Experiences", subtitle: "Museums, theater & art",        color: "hsl(var(--secondary))" },
  { icon: Wine,            title: "Nightlife",            subtitle: "Bars, clubs & live music",      color: "hsl(var(--secondary))" },
  { icon: Trophy,          title: "Sports",               subtitle: "Stadiums & fan zones",          color: "hsl(var(--aura-warning))" },
  { icon: TreePine,        title: "Nature & Eco",         subtitle: "Parks & sustainability",        color: "hsl(var(--aura-success))" },
  { icon: Baby,            title: "Family",               subtitle: "Kid-friendly picks",            color: "hsl(var(--aura-warning))" },
  { icon: Camera,          title: "Photo & Video",        subtitle: "Galleries & virtual tours",     color: "hsl(var(--primary))" },
  { icon: Gamepad2,        title: "Gamification",         subtitle: "Badges & rewards",              color: "hsl(var(--aura-warning))" },
  { icon: HelpCircle,      title: "Visitor Services",     subtitle: "FAQs, chat & accessibility",   color: "hsl(var(--primary))" },
  { icon: Users,           title: "Community",            subtitle: "Creators, blogs & local biz",   color: "hsl(var(--secondary))" },
];

const routes: Record<string, string> = {
  "Attractions":       "/destination/attractions",
  "Events":            "/destination/events-festivals",
  "Dining":            "/microsite/menu",
  "Hotels & Stays":    "/destination/hotels",
  "Plan Your Trip":    "/destination/plan-trip",
  "Deals & Packages":  "/destination/deals",
  "Getting Around":    "/destination/transportation",
  "Arts & Culture":    "/destination/culture",
  "Nightlife":         "/destination/things-to-do",
  "Sports":            "/destination/things-to-do",
  "Nature & Eco":      "/destination/nature",
  "Family":            "/destination/things-to-do",
  "Photo & Video":     "/destination/photos",
  "Gamification":      "/microsite/freebie-game",
  "Visitor Services":  "/microsite/faqs",
  "Community":         "/destination/creators",
};

/* ── Quick category chips ── */
const quickCategories = [
  { label: "Museums",   icon: Landmark, route: "/destination/attractions" },
  { label: "Outdoors",  icon: TreePine,  route: "/destination/nature" },
  { label: "Nightlife", icon: Wine,      route: "/destination/things-to-do" },
  { label: "Family",    icon: Baby,      route: "/destination/things-to-do" },
  { label: "Culture",   icon: Palette,   route: "/destination/culture" },
  { label: "Sports",    icon: Trophy,    route: "/destination/things-to-do" },
  { label: "Shopping",  icon: Store,     route: "/destination/local-businesses" },
  { label: "Weddings",  icon: Heart,     route: "/destination/things-to-do" },
];

/* ── Featured content ── */
const featured = [
  { title: "Georgia Aquarium",     image: attractionAquarium, route: "/destination/attractions" },
  { title: "Atlanta Jazz Festival", image: eventJazz,         route: "/destination/events-festivals" },
  { title: "The BeltLine Trail",   image: photoBeltline,      route: "/destination/nature" },
  { title: "Southern BBQ Tour",    image: restaurantBbq,      route: "/microsite/menu" },
];

const Microsite = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <DestinationHeader />

      {/* Action buttons */}
      <div className="flex gap-2 overflow-x-auto px-4 py-4 no-scrollbar">
        {actions.map((btn) => (
          <ActionButton key={btn.label} icon={btn.icon} label={btn.label} />
        ))}
      </div>

      {/* Quick Category Links */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {quickCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(cat.route)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-xs font-medium text-primary whitespace-nowrap shrink-0 hover:bg-primary/20 transition-colors"
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Content Grid */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-display font-semibold mb-2 text-foreground">Featured</h2>
        <div className="grid grid-cols-2 gap-2">
          {featured.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(item.route)}
              className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer group"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-semibold text-white leading-tight">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-display font-semibold mb-2 text-foreground">Explore</h2>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card, i) => (
            <AuraCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              delay={i}
              color={card.color}
              onClick={() => {
                const route = routes[card.title];
                if (route) navigate(route);
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/destination/map")}
          className="w-full mt-4 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary flex items-center justify-center gap-2 hover:bg-primary/15 transition-colors"
        >
          <Map className="w-4 h-4" /> Explore Global Destination Map
        </button>
      </div>

      <BottomBrandBar />
      <AuraSupermenu />
    </div>
  );
};

export default Microsite;
