import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Trophy, Camera, Wallet, Users2, ShoppingBag,
  MapPin, Music2, Star, X, ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SuperApp {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  color: string;
  action: string;
  path?: string;
}

const superApps: SuperApp[] = [
  {
    id: "destinations",
    icon: MapPin,
    name: "Destinations",
    tagline: "Explore Meridian Tours",
    color: "hsl(var(--primary))",
    action: "Explore",
    path: "/microsite",
  },
  {
    id: "sportmate",
    icon: Trophy,
    name: "Sportmate",
    tagline: "Sports & events",
    color: "hsl(120 50% 40%)",
    action: "Find Events",
  },
  {
    id: "picpop",
    icon: Camera,
    name: "PicPop",
    tagline: "Travel photo memories",
    color: "hsl(340 70% 55%)",
    action: "View Photos",
  },
  {
    id: "flexit",
    icon: Wallet,
    name: "Flex-it",
    tagline: "Split & co-fund trips",
    color: "hsl(152 60% 40%)",
    action: "Pay",
  },
  {
    id: "tribemint",
    icon: ShoppingBag,
    name: "TribeMint",
    tagline: "Earn travel rewards",
    color: "hsl(25 85% 55%)",
    action: "Shop",
  },
  {
    id: "vibesgigs",
    icon: Music2,
    name: "VibesGigs",
    tagline: "Live talent & local events",
    color: "hsl(280 60% 55%)",
    action: "Browse",
  },
];

const AuraSupermenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-16 right-0 w-[300px] rounded-2xl bg-card border shadow-2xl overflow-hidden"
          >
            <div className="px-5 pt-4 pb-3 border-b bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Meridian
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Travel mini-apps</p>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="py-1.5 max-h-[360px] overflow-y-auto">
              {superApps.map((app, i) => (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => { if (app.path) navigate(app.path); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${app.color} 15%, transparent)` }}>
                    <app.icon className="w-5 h-5" style={{ color: app.color }} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-foreground">{app.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{app.tagline}</p>
                  </div>
                  <span className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    {app.action}<ChevronRight className="w-3 h-3" />
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="border-t px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">Powered by iBloov</span>
              </div>
              <button onClick={() => { navigate("/microsite"); setOpen(false); }} className="text-[10px] font-medium text-primary hover:underline">
                View All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        aria-label="Meridian Menu"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AuraSupermenu;
