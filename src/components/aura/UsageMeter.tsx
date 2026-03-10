import { motion } from "framer-motion";
import { CreditCard, MapPin, Users, QrCode, LayoutGrid } from "lucide-react";

interface UsageItem {
  label: string;
  used: number;
  limit: number | "Unlimited";
  icon: React.ElementType;
}

const usageData: UsageItem[] = [
  { label: "Card Slots", used: 3, limit: 3, icon: LayoutGrid },
  { label: "Locations", used: 1, limit: 1, icon: MapPin },
  { label: "Team Members", used: 1, limit: 1, icon: Users },
  { label: "QR Codes", used: 1, limit: 1, icon: QrCode },
];

const UsageMeter = () => {
  return (
    <div className="p-5 rounded-2xl bg-card border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold">Plan Usage</h3>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          <CreditCard className="w-3 h-3" />
          Free Plan
        </span>
      </div>
      <div className="space-y-4">
        {usageData.map((item, i) => {
          const isUnlimited = item.limit === "Unlimited";
          const pct = isUnlimited ? 30 : Math.min((item.used / (item.limit as number)) * 100, 100);
          const atLimit = !isUnlimited && item.used >= (item.limit as number);

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  {item.label}
                </div>
                <span className={`text-xs font-semibold ${atLimit ? "text-destructive" : "text-muted-foreground"}`}>
                  {item.used} / {isUnlimited ? "∞" : item.limit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    atLimit ? "bg-destructive" : pct > 70 ? "bg-chart-4" : "bg-primary"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
        Upgrade to Pro ($99.99/mo) for 9 cards, or Premium ($299/mo) for all 15 cards + full tools.
      </p>
    </div>
  );
};

export default UsageMeter;
