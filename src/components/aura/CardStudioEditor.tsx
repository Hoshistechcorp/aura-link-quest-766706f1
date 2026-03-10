import { motion, Reorder } from "framer-motion";
import {
  GripVertical, Eye, EyeOff, Pencil, Check, X, Type, ChevronRight,
} from "lucide-react";
import { iconMap, iconOptions, colorPresets, type MicrositeCard } from "@/pages/dashboard/CardStudioPage";

interface Props {
  cards: MicrositeCard[];
  setCards: React.Dispatch<React.SetStateAction<MicrositeCard[]>>;
  editing: string | null;
  setEditing: (id: string | null) => void;
  updateCard: (id: string, patch: Partial<MicrositeCard>) => void;
  visibleCards: MicrositeCard[];
  hiddenCards: MicrositeCard[];
}

const CardStudioEditor = ({ cards, setCards, editing, setEditing, updateCard, visibleCards, hiddenCards }: Props) => (
  <div className="grid lg:grid-cols-3 gap-6">
    {/* Card list */}
    <div className="lg:col-span-2 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Visible Cards — drag to reorder
      </h3>
      <Reorder.Group axis="y" values={visibleCards} onReorder={(newOrder) => {
        const hidden = cards.filter((c) => !c.visible);
        setCards([...newOrder, ...hidden]);
      }}>
        {visibleCards.map((card, i) => {
          const Icon = iconMap[card.icon];
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
                        {iconOptions.map((name) => {
                          const Ic = iconMap[name];
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
            const Icon = iconMap[card.icon];
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
            const Icon = iconMap[card.icon];
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
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Drag cards to reorder how they appear</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Hide cards to remove from the public page</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Display up to 15 cards on your microsite</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Freebie Game drives daily visits</li>
        </ul>
      </div>
    </div>
  </div>
);

export default CardStudioEditor;
