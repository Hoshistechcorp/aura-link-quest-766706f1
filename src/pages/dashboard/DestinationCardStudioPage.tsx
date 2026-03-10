import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Landmark, Compass, Hotel, TreePine, MapPin, Train, Calendar,
  HelpingHand, Store, Tag, Megaphone, Palette, Camera, UtensilsCrossed,
  GripVertical, Eye, EyeOff, Pencil, Check, X, Type, ChevronRight,
  Save, LayoutGrid,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import type { LucideIcon } from "lucide-react";

/* ── Icon registry for destination cards ───────── */
const destIconMap: Record<string, LucideIcon> = {
  Landmark, Compass, Hotel, TreePine, MapPin, Train, Calendar,
  HelpingHand, Store, Tag, Megaphone, Palette, Camera, UtensilsCrossed,
};
const destIconOptions = Object.keys(destIconMap);

const colorPresets = [
  { label: "Primary", value: "hsl(var(--primary))" },
  { label: "Gold", value: "hsl(var(--aura-warning))" },
  { label: "Blue", value: "hsl(var(--aura-info))" },
  { label: "Green", value: "hsl(var(--aura-success))" },
  { label: "Accent", value: "hsl(var(--secondary))" },
];

interface DestCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  visible: boolean;
  color: string;
}

const defaultDestCards: DestCard[] = [
  { id: "d1", title: "Attractions", subtitle: "Museums & sites", icon: "Landmark", visible: true, color: "hsl(var(--primary))" },
  { id: "d2", title: "Things To Do", subtitle: "Tours & more", icon: "Compass", visible: true, color: "hsl(var(--primary))" },
  { id: "d3", title: "Events & Festivals", subtitle: "What's on", icon: "Calendar", visible: true, color: "hsl(var(--aura-warning))" },
  { id: "d4", title: "Food & Dining", subtitle: "Local eats", icon: "UtensilsCrossed", visible: true, color: "hsl(var(--primary))" },
  { id: "d5", title: "Hotels & Stays", subtitle: "Book now", icon: "Hotel", visible: true, color: "hsl(var(--aura-info))" },
  { id: "d6", title: "Cultural Experiences", subtitle: "Arts & culture", icon: "Palette", visible: true, color: "hsl(var(--secondary))" },
  { id: "d7", title: "Nature & Parks", subtitle: "Outdoors", icon: "TreePine", visible: true, color: "hsl(var(--aura-success))" },
  { id: "d8", title: "Neighborhood Guide", subtitle: "Districts", icon: "MapPin", visible: true, color: "hsl(var(--primary))" },
  { id: "d9", title: "Transportation", subtitle: "Getting around", icon: "Train", visible: true, color: "hsl(var(--aura-info))" },
  { id: "d10", title: "Visitor Services", subtitle: "Help & info", icon: "HelpingHand", visible: true, color: "hsl(var(--primary))" },
  { id: "d11", title: "Local Businesses", subtitle: "Shop local", icon: "Store", visible: true, color: "hsl(var(--aura-warning))" },
  { id: "d12", title: "Photo Memories", subtitle: "PicPop", icon: "Camera", visible: true, color: "hsl(var(--primary))" },
  { id: "d13", title: "Upcoming Deals", subtitle: "Promotions", icon: "Tag", visible: true, color: "hsl(var(--aura-success))" },
  { id: "d14", title: "Local Creators", subtitle: "Influencers", icon: "Megaphone", visible: true, color: "hsl(var(--secondary))" },
  { id: "d15", title: "Plan Your Trip", subtitle: "Itineraries", icon: "Compass", visible: true, color: "hsl(var(--aura-info))" },
];

const DestinationCardStudioPage = () => {
  const [cards, setCards] = useState<DestCard[]>(defaultDestCards);
  const [editing, setEditing] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const visibleCards = cards.filter((c) => c.visible);
  const hiddenCards = cards.filter((c) => !c.visible);

  const updateCard = (id: string, patch: Partial<DestCard>) =>
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const handleSave = () => {
    toast({ title: "Destination layout saved", description: "Changes published to your tourism microsite." });
    setEditing(null);
  };

  return (
    <DashboardLayout title="Destination Card Studio" subtitle="Customize your tourism microsite cards">
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
        /* Preview */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
          <div className="p-6 rounded-3xl bg-card border shadow-lg">
            <h3 className="font-display font-semibold text-center mb-4">Destination Preview</h3>
            <div className="grid grid-cols-3 gap-3">
              {visibleCards.map((card) => {
                const Icon = destIconMap[card.icon] || Landmark;
                return (
                  <motion.div key={card.id} layout className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted/30 border aspect-square gap-1.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span className="text-xs font-medium text-center leading-tight">{card.title}</span>
                    <span className="text-[9px] text-muted-foreground">{card.subtitle}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Editor */
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Visible Cards — drag to reorder
            </h3>
            <Reorder.Group axis="y" values={visibleCards} onReorder={(newOrder) => {
              const hidden = cards.filter((c) => !c.visible);
              setCards([...newOrder, ...hidden]);
            }}>
              {visibleCards.map((card, i) => {
                const Icon = destIconMap[card.icon] || Landmark;
                const isEditing = editing === card.id;
                return (
                  <Reorder.Item key={card.id} value={card}>
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`p-4 rounded-2xl border mb-2 transition-all ${
                        isEditing ? "bg-primary/5 border-primary/30" : "bg-card hover:border-primary/20"
                      }`}
                    >
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                              <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input value={card.title} onChange={(e) => updateCard(card.id, { title: e.target.value })}
                                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={30} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">Subtitle</label>
                              <input value={card.subtitle} onChange={(e) => updateCard(card.id, { subtitle: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={30} />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Icon</label>
                            <div className="flex flex-wrap gap-2">
                              {destIconOptions.map((name) => {
                                const Ic = destIconMap[name];
                                return (
                                  <button key={name} onClick={() => updateCard(card.id, { icon: name })}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                                      card.icon === name ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    }`}>
                                    <Ic className="w-4 h-4" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Color</label>
                            <div className="flex gap-2">
                              {colorPresets.map((cp) => (
                                <button key={cp.label} onClick={() => updateCard(card.id, { color: cp.value })}
                                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    card.color === cp.value ? "border-foreground scale-110" : "border-transparent"
                                  }`} style={{ backgroundColor: cp.value }} title={cp.label} />
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"><X className="w-4 h-4" /></button>
                            <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"><Check className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${card.color}15` }}>
                            <Icon className="w-5 h-5" style={{ color: card.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{card.title}</div>
                            <div className="text-xs text-muted-foreground">{card.subtitle}</div>
                          </div>
                          <button onClick={() => setEditing(card.id)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button onClick={() => updateCard(card.id, { visible: false })} className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            {hiddenCards.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Hidden Cards</h3>
                {hiddenCards.map((card) => {
                  const Icon = destIconMap[card.icon] || Landmark;
                  return (
                    <div key={card.id} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-dashed mb-2 opacity-60">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{card.title}</div>
                        <div className="text-xs text-muted-foreground">{card.subtitle}</div>
                      </div>
                      <button onClick={() => updateCard(card.id, { visible: true })} className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-card border sticky top-8">
              <h3 className="font-display font-semibold mb-4">Live Preview</h3>
              <div className="grid grid-cols-3 gap-2">
                {visibleCards.map((card) => {
                  const Icon = destIconMap[card.icon] || Landmark;
                  return (
                    <motion.div key={card.id} layout className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-muted/30 border aspect-square gap-1">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                      </div>
                      <span className="text-[9px] font-medium text-center leading-tight">{card.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-card border">
              <h3 className="font-display font-semibold mb-2">Tips</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Drag cards to reorder appearance</li>
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Hide cards to remove from the public page</li>
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Display up to 15 destination cards</li>
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Customize icons and colors per card</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DestinationCardStudioPage;
