import { useNavigate } from "react-router-dom";
import {
  Phone, MessageCircle, Navigation, Share2, Bookmark,
  Camera, Star, Info, Bot, Users, HelpCircle,
  Landmark, Compass, Hotel, TreePine, Map, Train,
  Store, Tag, Palette, UtensilsCrossed, Calendar,
  Leaf, Gamepad2, MapPin,
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

/* ── Consolidated cards: 28 → 12 ── */
const cards = [
  { icon: Landmark,        title: "Things To Do",        subtitle: "Attractions & tours",   color: "hsl(var(--primary))" },
  { icon: Calendar,        title: "Events & Festivals",  subtitle: "What's happening",      color: "hsl(var(--aura-warning))" },
  { icon: UtensilsCrossed, title: "Food & Dining",       subtitle: "Restaurants & cuisine",  color: "hsl(var(--primary))" },
  { icon: Hotel,           title: "Hotels & Stays",      subtitle: "Accommodations",         color: "hsl(var(--aura-info))" },
  { icon: MapPin,          title: "Neighborhoods",       subtitle: "Explore districts",      color: "hsl(var(--primary))" },
  { icon: TreePine,        title: "Nature & Outdoors",   subtitle: "Parks & trails",         color: "hsl(var(--aura-success))" },
  { icon: Train,           title: "Getting Around",      subtitle: "Transit & parking",      color: "hsl(var(--aura-info))" },
  { icon: Compass,         title: "Plan Your Trip",      subtitle: "AI itinerary builder",   color: "hsl(var(--aura-info))" },
  { icon: Camera,          title: "Photo Memories",      subtitle: "Capture & share",        color: "hsl(var(--primary))" },
  { icon: Tag,             title: "Deals & Rewards",     subtitle: "Packages & prizes",      color: "hsl(var(--aura-success))" },
  { icon: Info,            title: "Visitor Info",         subtitle: "FAQs, about & more",     color: "hsl(var(--primary))" },
  { icon: Users,           title: "Community",           subtitle: "Creators & social",       color: "hsl(var(--secondary))" },
];

const routes: Record<string, string> = {
  "Things To Do":       "/destination/attractions",
  "Events & Festivals": "/destination/events-festivals",
  "Food & Dining":      "/microsite/menu",
  "Hotels & Stays":     "/destination/hotels",
  "Neighborhoods":      "/destination/neighborhoods",
  "Nature & Outdoors":  "/destination/nature",
  "Getting Around":     "/destination/transportation",
  "Plan Your Trip":     "/destination/plan-trip",
  "Photo Memories":     "/destination/photos",
  "Deals & Rewards":    "/destination/deals",
  "Visitor Info":       "/microsite/faqs",
  "Community":          "/destination/creators",
};

/* ── Quick category chips ── */
const quickCategories = [
  { label: "Museums",  icon: Landmark, route: "/destination/attractions" },
  { label: "Outdoors", icon: TreePine,  route: "/destination/nature" },
  { label: "Nightlife",icon: Star,      route: "/destination/things-to-do" },
  { label: "Family",   icon: Users,     route: "/destination/things-to-do" },
  { label: "Culture",  icon: Palette,   route: "/destination/culture" },
  { label: "Shopping", icon: Store,     route: "/destination/local-businesses" },
];

/* ── Featured content ── */
const featured = [
  { title: "Georgia Aquarium",    image: attractionAquarium, route: "/destination/attractions" },
  { title: "Atlanta Jazz Festival",image: eventJazz,         route: "/destination/events-festivals" },
  { title: "The BeltLine Trail",  image: photoBeltline,      route: "/destination/nature" },
  { title: "Southern BBQ Tour",   image: restaurantBbq,      route: "/microsite/menu" },
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

      {/* Main Cards Grid */}
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
