import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Landmark, Calendar, UtensilsCrossed, Hotel, Compass, Tag, Train, Palette,
  Wine, Trophy, TreePine, Baby, Camera, Gamepad2, HelpCircle, Users,
  GripVertical, Eye, EyeOff, Pencil, Check, X, Save, LayoutGrid, Type,
  ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import CardStudioEditor from "@/components/aura/CardStudioEditor";
import CardStudioPreview from "@/components/aura/CardStudioPreview";

/* ── Icon registry ─────────────────────────────────── */
export const iconMap = {
  Landmark, Calendar, UtensilsCrossed, Hotel, Compass, Tag, Train, Palette,
  Wine, Trophy, TreePine, Baby, Camera, Gamepad2, HelpCircle, Users,
} as const;
export type IconName = keyof typeof iconMap;
export const iconOptions = Object.keys(iconMap) as IconName[];

/* ── Types ─────────────────────────────────────────── */
export interface MicrositeCard {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  path: string;
  visible: boolean;
  color: string;
}

/* ── All 16 cards (mirrors microsite modules) ─────── */
const defaultCards: MicrositeCard[] = [
  { id: "1",  title: "Attractions",      subtitle: "Sights, museums & tours",    icon: "Landmark",        path: "/destination/attractions",      visible: true,  color: "hsl(var(--primary))" },
  { id: "2",  title: "Events & Festivals", subtitle: "Calendar & tickets",         icon: "Calendar",        path: "/destination/events-festivals",  visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "3",  title: "Dining",           subtitle: "Restaurants & food tours",   icon: "UtensilsCrossed", path: "/microsite/menu",               visible: true,  color: "hsl(var(--primary))" },
  { id: "4",  title: "Hotels & Stays",   subtitle: "Book & compare",            icon: "Hotel",           path: "/destination/hotels",            visible: true,  color: "hsl(var(--aura-info))" },
  { id: "5",  title: "Plan Your Trip",   subtitle: "Itinerary builder",         icon: "Compass",         path: "/destination/plan-trip",         visible: true,  color: "hsl(var(--aura-info))" },
  { id: "6",  title: "Deals & Packages", subtitle: "Offers & bundles",          icon: "Tag",             path: "/destination/deals",             visible: true,  color: "hsl(var(--aura-success))" },
  { id: "7",  title: "Getting Around",   subtitle: "Transit, parking & bikes",  icon: "Train",           path: "/destination/transportation",    visible: true,  color: "hsl(var(--aura-info))" },
  { id: "8",  title: "Cultural Experiences", subtitle: "Museums, theater & art",    icon: "Palette",         path: "/destination/culture",           visible: true,  color: "hsl(var(--secondary))" },
  { id: "9",  title: "Nightlife",        subtitle: "Bars, clubs & live music",  icon: "Wine",            path: "/destination/things-to-do",      visible: true,  color: "hsl(var(--secondary))" },
  { id: "10", title: "Sports",           subtitle: "Stadiums & fan zones",      icon: "Trophy",          path: "/destination/things-to-do",      visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "11", title: "Nature & Eco",     subtitle: "Parks & sustainability",    icon: "TreePine",        path: "/destination/nature",            visible: true,  color: "hsl(var(--aura-success))" },
  { id: "12", title: "Family",           subtitle: "Kid-friendly picks",        icon: "Baby",            path: "/destination/things-to-do",      visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "13", title: "Photo & Video",    subtitle: "Galleries & virtual tours", icon: "Camera",          path: "/destination/photos",            visible: true,  color: "hsl(var(--primary))" },
  { id: "14", title: "Gamification",     subtitle: "Badges & rewards",          icon: "Gamepad2",        path: "/microsite/freebie-game",        visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "15", title: "Visitor Services", subtitle: "FAQs, chat & accessibility",icon: "HelpCircle",      path: "/microsite/faqs",               visible: true,  color: "hsl(var(--primary))" },
  { id: "16", title: "Community",        subtitle: "Creators, blogs & local biz",icon: "Users",          path: "/destination/creators",          visible: true,  color: "hsl(var(--secondary))" },
];

export const colorPresets = [
  { label: "Wine",   value: "hsl(var(--primary))" },
  { label: "Gold",   value: "hsl(var(--aura-warning))" },
  { label: "Blue",   value: "hsl(var(--aura-info))" },
  { label: "Green",  value: "hsl(var(--aura-success))" },
  { label: "Accent", value: "hsl(var(--secondary))" },
];

const CardStudioPage = () => {
  const [cards, setCards] = useState<MicrositeCard[]>(defaultCards);
  const [editing, setEditing] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const visibleCards = cards.filter((c) => c.visible);
  const hiddenCards = cards.filter((c) => !c.visible);

  const updateCard = (id: string, patch: Partial<MicrositeCard>) =>
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const handleSave = () => {
    toast({ title: "Card layout saved", description: "Changes published to your microsite." });
    setEditing(null);
  };

  return (
    <DashboardLayout title="Card Studio" subtitle="Customize your microsite card layout — pick up to 16 modules">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted text-xs font-medium">
            <LayoutGrid className="w-3.5 h-3.5" />
            {visibleCards.length} visible · {hiddenCards.length} hidden
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              previewMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-4 h-4" /> <span className="hidden sm:inline">{previewMode ? "Exit Preview" : "Preview"}</span>
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </div>

      {previewMode ? (
        <CardStudioPreview cards={visibleCards} />
      ) : (
        <CardStudioEditor
          cards={cards}
          setCards={setCards}
          editing={editing}
          setEditing={setEditing}
          updateCard={updateCard}
          visibleCards={visibleCards}
          hiddenCards={hiddenCards}
        />
      )}
    </DashboardLayout>
  );
};

export default CardStudioPage;
