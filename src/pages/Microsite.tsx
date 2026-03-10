import { useNavigate } from "react-router-dom";
import {
  Phone, MessageCircle, Navigation, Share2, Bookmark,
  Camera, Star, Info, Bot, Award, Users, HelpCircle, CalendarDays, Globe,
  Gamepad2, Link2, Handshake,
  Landmark, Compass, Hotel, TreePine, Map, Train,
  HelpingHand, Store, Tag, Megaphone, Palette,
  MapPin, Calendar, Leaf, UtensilsCrossed,
} from "lucide-react";
import DestinationHeader from "@/components/aura/DestinationHeader";
import ActionButton from "@/components/aura/ActionButton";
import AuraCard from "@/components/aura/AuraCard";
import BottomBrandBar from "@/components/aura/BottomBrandBar";
import AuraSupermenu from "@/components/aura/AuraSupermenu";

const actions = [
  { icon: Phone, label: "Call" },
  { icon: MessageCircle, label: "Message" },
  { icon: Navigation, label: "Directions" },
  { icon: Share2, label: "Share" },
  { icon: Bookmark, label: "Save" },
];

const cards = [
  { icon: Landmark, title: "Attractions", subtitle: "Museums & sites", color: "hsl(var(--primary))" },
  { icon: Compass, title: "Things To Do", subtitle: "Tours & more", color: "hsl(var(--primary))" },
  { icon: Calendar, title: "Events & Festivals", subtitle: "What's on", color: "hsl(var(--aura-warning))" },
  { icon: UtensilsCrossed, title: "Local Cuisine", subtitle: "Food guide", color: "hsl(var(--primary))" },
  { icon: Hotel, title: "Hotels & Stays", subtitle: "Book now", color: "hsl(var(--aura-info))" },
  { icon: Palette, title: "Cultural Experiences", subtitle: "Arts & culture", color: "hsl(var(--secondary))" },
  { icon: TreePine, title: "Nature & Parks", subtitle: "Outdoors", color: "hsl(var(--aura-success))" },
  { icon: MapPin, title: "Neighborhood Guide", subtitle: "Districts", color: "hsl(var(--primary))" },
  { icon: Train, title: "Transportation", subtitle: "Getting around", color: "hsl(var(--aura-info))" },
  { icon: Users, title: "Tour Guides", subtitle: "Expert guides", color: "hsl(var(--primary))" },
  { icon: Camera, title: "Photo Memories", subtitle: "PicPop", color: "hsl(var(--primary))" },
  { icon: Star, title: "Traveler Reviews", subtitle: "4.9 avg", color: "hsl(var(--aura-warning))" },
  { icon: Award, title: "Top Experiences", subtitle: "Must-do", color: "hsl(var(--aura-warning))" },
  { icon: Info, title: "About Us", subtitle: "Our story", color: "hsl(var(--primary))" },
  { icon: Bot, title: "AI Travel Assistant", subtitle: "Ask anything", color: "hsl(var(--aura-info))" },
  { icon: HelpingHand, title: "VIP Experiences", subtitle: "Premium", color: "hsl(var(--secondary))" },
  { icon: HelpCircle, title: "Travel FAQs", subtitle: "24 answers", color: "hsl(var(--primary))" },
  { icon: CalendarDays, title: "Upcoming Tours", subtitle: "Book now", color: "hsl(var(--aura-success))" },
  { icon: Store, title: "Local Businesses", subtitle: "Shop local", color: "hsl(var(--aura-warning))" },
  { icon: Tag, title: "Deals & Packages", subtitle: "Promotions", color: "hsl(var(--aura-success))" },
  { icon: Megaphone, title: "Local Creators", subtitle: "Influencers", color: "hsl(var(--secondary))" },
  { icon: Globe, title: "Social Links", subtitle: "Follow us", color: "hsl(var(--primary))" },
  { icon: Gamepad2, title: "Spin & Win", subtitle: "Win prizes", color: "hsl(var(--aura-warning))" },
  { icon: Link2, title: "Refer a Traveler", subtitle: "Earn rewards", color: "hsl(var(--aura-info))" },
  { icon: Handshake, title: "Travel Partners", subtitle: "Affiliate", color: "hsl(var(--primary))" },
  { icon: Compass, title: "Plan Your Trip", subtitle: "Itineraries", color: "hsl(var(--aura-info))" },
  { icon: Bot, title: "AI Trip Planner", subtitle: "Ask AI", color: "hsl(var(--aura-info))" },
  { icon: Leaf, title: "Sustainability", subtitle: "Eco travel", color: "hsl(var(--aura-success))" },
];

const routes: Record<string, string> = {
  "Attractions": "/destination/attractions",
  "Things To Do": "/destination/things-to-do",
  "Events & Festivals": "/destination/events-festivals",
  "Local Cuisine": "/microsite/menu",
  "Hotels & Stays": "/destination/hotels",
  "Cultural Experiences": "/destination/culture",
  "Nature & Parks": "/destination/nature",
  "Neighborhood Guide": "/destination/neighborhoods",
  "Transportation": "/destination/transportation",
  "Tour Guides": "/microsite/staff",
  "Photo Memories": "/destination/photos",
  "Traveler Reviews": "/microsite/reviews",
  "Top Experiences": "/microsite/popular-dishes",
  "About Us": "/microsite/details",
  "AI Travel Assistant": "/microsite/concierge",
  "VIP Experiences": "/microsite/private-dining",
  "Travel FAQs": "/microsite/faqs",
  "Upcoming Tours": "/microsite/events",
  "Local Businesses": "/destination/local-businesses",
  "Deals & Packages": "/destination/deals",
  "Local Creators": "/destination/creators",
  "Social Links": "/microsite/social-links",
  "Spin & Win": "/microsite/freebie-game",
  "Refer a Traveler": "/microsite/referral",
  "Travel Partners": "/microsite/affiliate",
  "Plan Your Trip": "/destination/plan-trip",
  "AI Trip Planner": "/destination/ai-planner",
  "Sustainability": "/destination/sustainability",
  "Awards": "/microsite/awards",
};

const Microsite = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <DestinationHeader />

      <div className="flex gap-2 overflow-x-auto px-4 py-4 no-scrollbar">
        {actions.map((btn) => (
          <ActionButton key={btn.label} icon={btn.icon} label={btn.label} />
        ))}
      </div>

      <div className="px-4 pb-4">
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
