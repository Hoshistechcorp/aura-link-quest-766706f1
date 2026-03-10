import { motion } from "framer-motion";
import { iconMap, type MicrositeCard } from "@/pages/dashboard/CardStudioPage";

const CardStudioPreview = ({ cards }: { cards: MicrositeCard[] }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
    <div className="p-6 rounded-3xl bg-card border shadow-lg">
      <h3 className="font-display font-semibold text-center mb-4">Microsite Preview</h3>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => {
          const Icon = iconMap[card.icon];
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
);

export default CardStudioPreview;
