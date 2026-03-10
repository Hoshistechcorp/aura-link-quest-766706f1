import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, GraduationCap, Music2, Wallet, CreditCard, Camera,
  Trophy, Users2, Building, Grid3X3, Link2, Key, ShieldCheck, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EcosystemApp {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
  path: string;
}

const ecosystemApps: EcosystemApp[] = [
  {
    id: "auralink",
    icon: Sparkles,
    name: "AuraLink",
    description: "Business microsites & customer engagement",
    color: "hsl(var(--primary))",
    path: "/dashboard/ecosystem/auralink",
  },
  {
    id: "learning",
    icon: GraduationCap,
    name: "iBloov Learning",
    description: "Staff training, certifications & badges",
    color: "hsl(210 70% 50%)",
    path: "/dashboard/ecosystem/learning",
  },
  {
    id: "vibesgigs",
    icon: Music2,
    name: "VibesGigs",
    description: "Talent marketplace for DJs, hosts & event staff",
    color: "hsl(280 60% 55%)",
    path: "/dashboard/ecosystem/vibesgigs",
  },
  {
    id: "flexit",
    icon: Wallet,
    name: "Flex-it",
    description: "Deposits, bill splitting & co-funded experiences",
    color: "hsl(152 60% 40%)",
    path: "/dashboard/ecosystem/flexit",
  },
  {
    id: "shpr",
    icon: CreditCard,
    name: "SHPR",
    description: "Save Half Pay Rest financing model",
    color: "hsl(38 90% 55%)",
    path: "/dashboard/ecosystem/shpr",
  },
  {
    id: "picpop",
    icon: Camera,
    name: "PicPop",
    description: "Event photo memory feed & moderation",
    color: "hsl(340 70% 55%)",
    path: "/dashboard/ecosystem/picpop",
  },
  {
    id: "sportmate",
    icon: Trophy,
    name: "Sportmate",
    description: "Sports games, fan gatherings & watch parties",
    color: "hsl(120 50% 40%)",
    path: "/dashboard/ecosystem/sportmate",
  },
  {
    id: "tribemint",
    icon: Users2,
    name: "TribeMint",
    description: "Affiliate & influencer commission system",
    color: "hsl(25 85% 55%)",
    path: "/dashboard/ecosystem/tribemint",
  },
  {
    id: "municipal",
    icon: Building,
    name: "Municipal Nebula",
    description: "City data intelligence for local governments",
    color: "hsl(220 50% 45%)",
    path: "/dashboard/ecosystem/municipal",
  },
];

const EcosystemLauncher = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-muted transition-colors"
        aria-label="iBloov Ecosystem"
        title="iBloov Ecosystem"
      >
        <Grid3X3 className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-full sm:mt-2 left-2 sm:left-auto w-auto sm:w-[400px] rounded-2xl bg-card border shadow-xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div>
                <h3 className="font-display text-base font-bold text-foreground">iBloov</h3>
                <p className="text-[11px] text-muted-foreground">Ecosystem Apps</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-3 gap-1 px-3 py-3">
              {ecosystemApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    navigate(app.path);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/70 transition-colors group"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${app.color}`, opacity: 0.12 }}
                  >
                    <app.icon className="w-5 h-5" style={{ color: app.color }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground leading-tight text-center">
                    {app.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight text-center line-clamp-2">
                    {app.description}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t px-4 py-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => { navigate("/dashboard/ecosystem/connect"); setOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                Connect App
              </button>
              <button
                onClick={() => { navigate("/dashboard/ecosystem/api-keys"); setOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                API Keys
              </button>
              <button
                onClick={() => { navigate("/dashboard/ecosystem/permissions"); setOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Permissions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcosystemLauncher;
