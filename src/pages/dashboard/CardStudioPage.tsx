import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Camera, UtensilsCrossed, Star, Info, Wine, Sparkles, Bot, Award, Users,
  GripVertical, Eye, EyeOff, Pencil, Check, X, Save, LayoutGrid, Type,
  ChevronRight, HelpCircle, CalendarDays, Globe, Gamepad2, Link2, Handshake,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import CardStudioEditor from "@/components/aura/CardStudioEditor";
import CardStudioPreview from "@/components/aura/CardStudioPreview";

/* ── Icon registry ─────────────────────────────────── */
export const iconMap = {
  Camera, UtensilsCrossed, Star, Info, Wine, Sparkles, Bot, Award, Users,
  HelpCircle, CalendarDays, Globe, Gamepad2, Link2, Handshake,
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

/* ── All 15 cards ──────────────────────────────────── */
const defaultCards: MicrositeCard[] = [
  { id: "1",  title: "Photo Gallery",  subtitle: "248 photos",   icon: "Camera",          path: "/microsite/gallery",        visible: true,  color: "hsl(var(--primary))" },
  { id: "2",  title: "Menu",           subtitle: "Full menu",    icon: "UtensilsCrossed", path: "/microsite/menu",           visible: true,  color: "hsl(var(--primary))" },
  { id: "3",  title: "Reviews",        subtitle: "4.8 avg",      icon: "Star",            path: "/microsite/reviews",        visible: true,  color: "hsl(var(--primary))" },
  { id: "4",  title: "Details",        subtitle: "Hours & info", icon: "Info",            path: "/microsite/details",        visible: true,  color: "hsl(var(--primary))" },
  { id: "5",  title: "Private Dining", subtitle: "Book now",     icon: "Wine",            path: "/microsite/private-dining", visible: true,  color: "hsl(var(--primary))" },
  { id: "6",  title: "Popular Dishes", subtitle: "Top 12",       icon: "Sparkles",        path: "/microsite/popular-dishes", visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "7",  title: "AI Concierge",   subtitle: "Ask anything", icon: "Bot",             path: "/microsite/concierge",      visible: true,  color: "hsl(var(--aura-info))" },
  { id: "8",  title: "Awards",         subtitle: "8 awards",     icon: "Award",           path: "/microsite/awards",         visible: true,  color: "hsl(var(--secondary))" },
  { id: "9",  title: "Staff",          subtitle: "Meet team",    icon: "Users",           path: "/microsite/staff",          visible: true,  color: "hsl(var(--primary))" },
  { id: "10", title: "FAQs",           subtitle: "24 answers",   icon: "HelpCircle",      path: "/microsite/faqs",           visible: true,  color: "hsl(var(--primary))" },
  { id: "11", title: "Events",         subtitle: "Upcoming",     icon: "CalendarDays",    path: "/microsite/events",         visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "12", title: "Social Links",   subtitle: "Follow us",    icon: "Globe",           path: "/microsite/social-links",   visible: true,  color: "hsl(var(--aura-info))" },
  { id: "13", title: "Freebie Game",   subtitle: "Spin & win",   icon: "Gamepad2",        path: "/microsite/freebie-game",   visible: true,  color: "hsl(var(--aura-success))" },
  { id: "14", title: "Refer a Friend", subtitle: "Earn rewards", icon: "Link2",           path: "/microsite/referral",       visible: true,  color: "hsl(var(--aura-warning))" },
  { id: "15", title: "Affiliate",      subtitle: "Partner up",   icon: "Handshake",       path: "/microsite/affiliate",      visible: true,  color: "hsl(var(--secondary))" },
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
    <DashboardLayout title="Card Studio" subtitle="Customize your microsite card layout — pick up to 15 cards">
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
