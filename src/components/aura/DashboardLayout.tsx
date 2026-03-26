import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Layers, BarChart3, Gamepad2, Settings, QrCode, Users2, CreditCard,
  Heart, Megaphone, Share2, Search, Shield, Building2, ChevronDown, LucideIcon, Menu, Sun, Moon,
  ClipboardEdit, MapPin, UserCog, Check, Globe, Landmark, CalendarDays, Store, Trophy,
  UtensilsCrossed, Hotel, Compass, Train, Palette, Wine, TreePine, Baby, Camera, HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useDarkMode } from "@/hooks/use-dark-mode";
import EcosystemLauncher from "@/components/aura/EcosystemLauncher";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    defaultOpen: true,
    items: [
      { icon: Home, label: "Dashboard", path: "/dashboard" },
      { icon: ClipboardEdit, label: "Admin Panel", path: "/dashboard/admin" },
      { icon: Layers, label: "Card Studio", path: "/dashboard/cards" },
      { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    title: "Microsite Modules",
    defaultOpen: true,
    items: [
      { icon: Landmark, label: "Attractions", path: "/destination/attractions" },
      { icon: CalendarDays, label: "Events", path: "/destination/events-festivals" },
      { icon: UtensilsCrossed, label: "Dining", path: "/microsite/menu" },
      { icon: Hotel, label: "Hotels & Stays", path: "/destination/hotels" },
      { icon: Compass, label: "Plan Your Trip", path: "/destination/plan-trip" },
      { icon: Train, label: "Getting Around", path: "/destination/transportation" },
    ],
  },
  {
    title: "Experiences",
    defaultOpen: false,
    items: [
      { icon: Palette, label: "Cultural Experiences", path: "/destination/culture" },
      { icon: Wine, label: "Nightlife", path: "/destination/things-to-do" },
      { icon: Trophy, label: "Sports", path: "/dashboard/tourism-gamification" },
      { icon: TreePine, label: "Nature & Eco", path: "/destination/nature" },
      { icon: Baby, label: "Family", path: "/destination/things-to-do" },
      { icon: Camera, label: "Photo & Video", path: "/destination/photos" },
    ],
  },
  {
    title: "Engagement",
    defaultOpen: false,
    items: [
      { icon: Gamepad2, label: "Gamification", path: "/dashboard/gamification" },
      { icon: Heart, label: "Loyalty", path: "/dashboard/loyalty" },
      { icon: Share2, label: "Referrals", path: "/dashboard/referrals" },
      { icon: Store, label: "Deals & Packages", path: "/destination/deals" },
    ],
  },
  {
    title: "Marketing",
    defaultOpen: false,
    items: [
      { icon: QrCode, label: "QR Codes", path: "/dashboard/qr" },
      { icon: Users2, label: "Affiliates", path: "/dashboard/affiliates" },
      { icon: Megaphone, label: "Influencers", path: "/dashboard/influencers" },
      { icon: Search, label: "SEO & Maps", path: "/dashboard/seo" },
      { icon: Shield, label: "Reputation", path: "/dashboard/reputation" },
    ],
  },
  {
    title: "Visitor Services",
    defaultOpen: false,
    items: [
      { icon: HelpCircle, label: "FAQs & Chat", path: "/microsite/faqs" },
      { icon: Globe, label: "Community", path: "/destination/creators" },
      { icon: Globe, label: "Social Links", path: "/microsite/social-links" },
    ],
  },
  {
    title: "Monetization",
    defaultOpen: false,
    items: [
      { icon: Landmark, label: "Sponsored Attractions", path: "/dashboard/sponsored-attractions" },
      { icon: CalendarDays, label: "Event Promotion", path: "/dashboard/event-promotion" },
      { icon: Store, label: "Business Promotion", path: "/dashboard/business-promotion" },
    ],
  },
  {
    title: "Business",
    defaultOpen: false,
    items: [
      { icon: MapPin, label: "Locations", path: "/dashboard/locations" },
      { icon: UserCog, label: "Team", path: "/dashboard/team" },
      { icon: Building2, label: "Enterprise", path: "/dashboard/enterprise" },
      { icon: CreditCard, label: "Subscription", path: "/dashboard/subscription" },
      { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    ],
  },
];

const SidebarSection = ({ section, currentPath, navigate }: { section: NavSection; currentPath: string; navigate: (p: string) => void }) => {
  const hasActive = section.items.some((i) => currentPath === i.path);
  const [open, setOpen] = useState(section.defaultOpen || hasActive);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {section.title}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {section.items.map((item) => {
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const SidebarNav = ({ currentPath, navigate, onNavigate }: { currentPath: string; navigate: (p: string) => void; onNavigate?: () => void }) => (
  <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
    {navSections.map((section) => (
      <SidebarSection
        key={section.title}
        section={section}
        currentPath={currentPath}
        navigate={(p) => { navigate(p); onNavigate?.(); }}
      />
    ))}
  </nav>
);

const locations = [
  { id: "atlanta-downtown", label: "Meridian Tours — Downtown Atlanta" },
  { id: "atlanta-midtown", label: "Meridian Tours — Midtown" },
  { id: "atlanta-buckhead", label: "Meridian Tours — Buckhead" },
];

const DashboardLayout = ({ children, title, subtitle = "Meridian Tours · Tour Operator" }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [locDropdownOpen, setLocDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="w-56 bg-card border-r hidden lg:flex flex-col">
        <div className="p-4 pb-2">
          <div className="font-display text-xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
            Meridian Tours
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Operator Dashboard</p>
        </div>
        <SidebarNav currentPath={location.pathname} navigate={navigate} />
        <div className="p-3 border-t">
          <button
            onClick={() => navigate("/microsite")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← View Public Page
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="p-4 pb-2">
            <div className="font-display text-xl font-bold text-primary cursor-pointer" onClick={() => { navigate("/"); setMobileOpen(false); }}>
              Meridian Tours
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Operator Dashboard</p>
          </div>
          <SidebarNav currentPath={location.pathname} navigate={navigate} onNavigate={() => setMobileOpen(false)} />
          <div className="p-3 border-t">
            <button
              onClick={() => { navigate("/microsite"); setMobileOpen(false); }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              ← View Public Page
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold">{title}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <EcosystemLauncher />
              {/* Location Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLocDropdownOpen(!locDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl bg-muted/50 border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline max-w-[140px] truncate">{activeLocation.label.split("—")[1]?.trim() || activeLocation.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${locDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {locDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 top-full mt-1 w-64 p-1.5 rounded-xl bg-card border shadow-lg z-50"
                    >
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => { setActiveLocation(loc); setLocDropdownOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeLocation.id === loc.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`}
                        >
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{loc.label}</span>
                          {activeLocation.id === loc.id && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
                        </button>
                      ))}
                      <div className="border-t mt-1 pt-1">
                        <button onClick={() => { navigate("/dashboard/locations"); setLocDropdownOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
                          <Settings className="w-3.5 h-3.5" /> Manage Locations
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={toggleDark}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
