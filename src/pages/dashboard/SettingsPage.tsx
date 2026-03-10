import { useState } from "react";
import { motion } from "framer-motion";
import { useAccountType, type AccountType } from "@/contexts/AccountTypeContext";
import {
  User, Bell, Palette, Globe, Lock, Mail, Phone, MapPin,
  Camera, Save, Check, BellRing, BellOff, Monitor, Moon, Sun,
  Paintbrush, Droplets, RotateCcw, Pipette,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { useDarkMode } from "@/hooks/use-dark-mode";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
] as const;

type Tab = (typeof tabs)[number]["id"];

const themeOptions = [
  { id: "default", label: "Restaurant", desc: "Warm wine & gold tones", colors: ["352 43% 32%", "35 35% 64%", "30 33% 97%"] },
  { id: "hotel", label: "Hotel", desc: "Navy & brass elegance", colors: ["210 35% 17%", "38 30% 56%", "0 0% 100%"] },
  { id: "lounge", label: "Lounge", desc: "Deep purple & neon pink", colors: ["270 30% 17%", "338 100% 53%", "0 0% 7%"] },
  { id: "ocean", label: "Ocean", desc: "Coastal teal & sand", colors: ["185 50% 28%", "42 40% 70%", "195 20% 96%"] },
  { id: "forest", label: "Forest", desc: "Deep green & earth", colors: ["150 40% 22%", "30 35% 55%", "90 15% 96%"] },
  { id: "sunset", label: "Sunset", desc: "Coral & warm amber", colors: ["12 70% 50%", "35 80% 55%", "30 30% 97%"] },
];

const accentColorPresets = [
  { label: "Wine", hsl: "352 43% 32%" },
  { label: "Navy", hsl: "210 35% 17%" },
  { label: "Emerald", hsl: "152 60% 30%" },
  { label: "Coral", hsl: "12 70% 50%" },
  { label: "Teal", hsl: "185 50% 28%" },
  { label: "Violet", hsl: "270 45% 35%" },
  { label: "Amber", hsl: "38 80% 45%" },
  { label: "Rose", hsl: "338 65% 45%" },
  { label: "Slate", hsl: "215 20% 35%" },
  { label: "Crimson", hsl: "0 70% 40%" },
];

/* ── Color conversion helpers ──────────────────────── */
const hslToHex = (hslStr: string): string => {
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length < 3) return "#000000";
  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hexToHsl = (hex: string): string => {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { accountType, setAccountType } = useAccountType();
  const [activeTheme, setActiveTheme] = useState("default");
  const [customPrimary, setCustomPrimary] = useState("352 43% 32%");
  const [customSecondary, setCustomSecondary] = useState("35 35% 64%");
  const [borderRadius, setBorderRadius] = useState("1rem");
  const [fontStyle, setFontStyle] = useState<"serif" | "sans">("serif");
  const [profile, setProfile] = useState({
    name: "Marco Bellini",
    email: "marco@bellavista.com",
    phone: "+1 (212) 555-0147",
    role: "Owner & Manager",
    location: "123 Grand Ave, New York, NY 10001",
    bio: "Passionate restaurateur with 25+ years of experience in Italian fine dining. Committed to delivering exceptional culinary experiences.",
  });

  const [notifications, setNotifications] = useState({
    newReviews: true,
    weeklyReport: true,
    referralAlerts: true,
    loyaltyMilestones: true,
    systemUpdates: false,
    marketingTips: false,
    staffActivity: true,
    lowRatingAlert: true,
  });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been applied successfully." });
  };

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    const root = document.documentElement;
    root.classList.remove("theme-hotel", "theme-lounge", "theme-ocean", "theme-forest", "theme-sunset");
    if (themeId !== "default") root.classList.add(`theme-${themeId}`);
    const theme = themeOptions.find((t) => t.id === themeId);
    if (theme) {
      setCustomPrimary(theme.colors[0]);
      setCustomSecondary(theme.colors[1]);
    }
    toast({ title: "Theme updated", description: `Switched to ${themeId} theme.` });
  };

  const applyCustomColor = (variable: string, hslValue: string) => {
    document.documentElement.style.setProperty(`--${variable}`, hslValue);
  };

  const handlePrimaryChange = (hsl: string) => {
    setCustomPrimary(hsl);
    applyCustomColor("primary", hsl);
    applyCustomColor("ring", hsl);
    setActiveTheme("custom");
  };

  const handleSecondaryChange = (hsl: string) => {
    setCustomSecondary(hsl);
    applyCustomColor("secondary", hsl);
    applyCustomColor("accent", hsl);
    setActiveTheme("custom");
  };

  const handleRadiusChange = (val: string) => {
    setBorderRadius(val);
    document.documentElement.style.setProperty("--radius", val);
  };

  const handleFontChange = (style: "serif" | "sans") => {
    setFontStyle(style);
    const display = style === "serif" ? "'Playfair Display', serif" : "'Inter', system-ui, sans-serif";
    document.documentElement.style.setProperty("--font-display", display);
  };

  const resetCustomization = () => {
    document.documentElement.style.removeProperty("--primary");
    document.documentElement.style.removeProperty("--secondary");
    document.documentElement.style.removeProperty("--accent");
    document.documentElement.style.removeProperty("--ring");
    document.documentElement.style.removeProperty("--radius");
    document.documentElement.style.removeProperty("--font-display");
    handleThemeChange("default");
    setBorderRadius("1rem");
    setFontStyle("serif");
    toast({ title: "Reset complete", description: "All customizations reverted to defaults." });
  };

  const notificationItems = [
    { key: "newReviews", label: "New Reviews", desc: "Get notified when customers leave reviews", icon: BellRing },
    { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly performance summary", icon: Mail },
    { key: "referralAlerts", label: "Referral Alerts", desc: "Notifications for new referral sign-ups", icon: BellRing },
    { key: "loyaltyMilestones", label: "Loyalty Milestones", desc: "When members reach new tiers", icon: BellRing },
    { key: "staffActivity", label: "Staff Activity", desc: "Updates on staff profile interactions", icon: BellRing },
    { key: "lowRatingAlert", label: "Low Rating Alerts", desc: "Immediate alert for ratings below 3 stars", icon: BellOff },
    { key: "systemUpdates", label: "System Updates", desc: "Platform feature releases and maintenance", icon: Bell },
    { key: "marketingTips", label: "Marketing Tips", desc: "Weekly tips to improve your presence", icon: Mail },
  ] as const;

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account & preferences">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Navigation */}
        <div className="lg:w-52 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-display font-semibold text-lg mb-6">Personal Information</h3>

                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-display font-bold text-primary">
                      {profile.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-medium">{profile.name}</h4>
                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                <div className="mt-6 p-4 rounded-xl bg-muted/30 border">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Account Type</label>
                  <p className="text-xs text-muted-foreground mb-3">Switch between venue mode and destination/tourism mode.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { id: "restaurant" as AccountType, label: "Venue / Restaurant", desc: "For restaurants, hotels, lounges" },
                      { id: "destination" as AccountType, label: "Tourism / Destination", desc: "For cities, states, tourism boards" },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setAccountType(opt.id); toast({ title: "Account type updated", description: `Switched to ${opt.label} mode.` }); }}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          accountType === opt.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"
                        }`}
                      >
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                        {accountType === opt.id && <div className="mt-1 flex items-center gap-1 text-[10px] text-primary font-medium"><Check className="w-3 h-3" /> Active</div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-display font-semibold text-lg mb-2">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground mb-6">Choose which updates you'd like to receive.</p>

                <div className="space-y-1">
                  {notificationItems.map((item, i) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[item.key]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Dark Mode */}
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-display font-semibold text-lg mb-2">Display Mode</h3>
                <p className="text-sm text-muted-foreground mb-5">Switch between light and dark modes.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { if (isDark) toggleDark(); }}
                    className={`p-4 rounded-2xl border-2 transition-all ${!isDark ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"}`}
                  >
                    <div className="w-full h-20 rounded-xl bg-[hsl(30,33%,97%)] border mb-3 flex items-center justify-center">
                      <Sun className="w-6 h-6 text-[hsl(352,43%,32%)]" />
                    </div>
                    <div className="text-sm font-medium">Light</div>
                    <div className="text-[10px] text-muted-foreground">Bright & airy</div>
                  </button>
                  <button
                    onClick={() => { if (!isDark) toggleDark(); }}
                    className={`p-4 rounded-2xl border-2 transition-all ${isDark ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"}`}
                  >
                    <div className="w-full h-20 rounded-xl bg-[hsl(20,10%,8%)] border border-[hsl(20,10%,22%)] mb-3 flex items-center justify-center">
                      <Moon className="w-6 h-6 text-[hsl(352,43%,45%)]" />
                    </div>
                    <div className="text-sm font-medium">Dark</div>
                    <div className="text-[10px] text-muted-foreground">Easy on the eyes</div>
                  </button>
                </div>
              </div>

              {/* Theme Designs */}
              <div className="p-6 rounded-2xl bg-card border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg">Theme Designs</h3>
                  <button onClick={resetCustomization} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw className="w-3 h-3" /> Reset All
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-5">Choose a preset theme or customize colors below.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themeOptions.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        activeTheme === theme.id ? "border-primary bg-primary/5 shadow-md" : "border-transparent bg-muted/50 hover:border-muted"
                      }`}
                    >
                      <div className="flex gap-1.5 mb-3">
                        {theme.colors.map((c, i) => (
                          <div key={i} className="w-7 h-7 rounded-lg shadow-sm" style={{ backgroundColor: `hsl(${c})` }} />
                        ))}
                      </div>
                      <div className="text-sm font-medium">{theme.label}</div>
                      <div className="text-[10px] text-muted-foreground">{theme.desc}</div>
                      {activeTheme === theme.id && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-primary font-medium">
                          <Check className="w-3 h-3" /> Active
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Accent Colors */}
              <div className="p-6 rounded-2xl bg-card border">
                <div className="flex items-center gap-2 mb-2">
                  <Paintbrush className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-lg">Custom Accent Colors</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">Fine-tune your brand colors. Changes apply instantly.</p>

                <div className="mb-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Primary Color</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {accentColorPresets.map((color) => (
                      <button
                        key={color.label}
                        onClick={() => handlePrimaryChange(color.hsl)}
                        className={`relative w-10 h-10 rounded-xl shadow-sm transition-all hover:scale-110 ${
                          customPrimary === color.hsl ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110" : ""
                        }`}
                        style={{ backgroundColor: `hsl(${color.hsl})` }}
                        title={color.label}
                      >
                        {customPrimary === color.hsl && <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="relative cursor-pointer">
                      <input
                        type="color"
                        value={hslToHex(customPrimary)}
                        onChange={(e) => handlePrimaryChange(hexToHsl(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-9 h-9 rounded-lg border-2 border-muted flex items-center justify-center" style={{ backgroundColor: `hsl(${customPrimary})` }}>
                        <Pipette className="w-3.5 h-3.5 text-white drop-shadow" />
                      </div>
                    </label>
                    <input
                      type="text"
                      value={hslToHex(customPrimary)}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^#[0-9a-fA-F]{6}$/.test(v)) handlePrimaryChange(hexToHsl(v));
                      }}
                      placeholder="#5a2d3a"
                      className="w-24 px-3 py-2 rounded-lg bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      type="text"
                      value={customPrimary}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d+\s+\d+%\s+\d+%$/.test(v.trim())) handlePrimaryChange(v.trim());
                      }}
                      placeholder="352 43% 32%"
                      className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Secondary / Accent Color</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {accentColorPresets.map((color) => (
                      <button
                        key={color.label}
                        onClick={() => handleSecondaryChange(color.hsl)}
                        className={`relative w-10 h-10 rounded-xl shadow-sm transition-all hover:scale-110 ${
                          customSecondary === color.hsl ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110" : ""
                        }`}
                        style={{ backgroundColor: `hsl(${color.hsl})` }}
                        title={color.label}
                      >
                        {customSecondary === color.hsl && <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="relative cursor-pointer">
                      <input
                        type="color"
                        value={hslToHex(customSecondary)}
                        onChange={(e) => handleSecondaryChange(hexToHsl(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-9 h-9 rounded-lg border-2 border-muted flex items-center justify-center" style={{ backgroundColor: `hsl(${customSecondary})` }}>
                        <Pipette className="w-3.5 h-3.5 text-white drop-shadow" />
                      </div>
                    </label>
                    <input
                      type="text"
                      value={hslToHex(customSecondary)}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^#[0-9a-fA-F]{6}$/.test(v)) handleSecondaryChange(hexToHsl(v));
                      }}
                      placeholder="#a08860"
                      className="w-24 px-3 py-2 rounded-lg bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      type="text"
                      value={customSecondary}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d+\s+\d+%\s+\d+%$/.test(v.trim())) handleSecondaryChange(v.trim());
                      }}
                      placeholder="35 35% 64%"
                      className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border">
                  <div className="text-xs font-medium text-muted-foreground mb-3">Live Preview</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: `hsl(${customPrimary})` }} />
                    <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: `hsl(${customSecondary})` }} />
                    <div className="flex-1 ml-2">
                      <div className="h-3 rounded-full mb-2" style={{ backgroundColor: `hsl(${customPrimary})`, width: "70%" }} />
                      <div className="h-2 rounded-full" style={{ backgroundColor: `hsl(${customSecondary})`, width: "45%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shape & Typography */}
              <div className="p-6 rounded-2xl bg-card border">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-lg">Shape & Typography</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">Adjust corner rounding and heading font style.</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Corner Radius</label>
                    <div className="flex gap-2">
                      {[
                        { label: "Sharp", value: "0.25rem" },
                        { label: "Soft", value: "0.75rem" },
                        { label: "Rounded", value: "1rem" },
                        { label: "Pill", value: "1.5rem" },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleRadiusChange(opt.value)}
                          className={`flex-1 p-3 border-2 text-center transition-all ${
                            borderRadius === opt.value ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"
                          }`}
                          style={{ borderRadius: opt.value }}
                        >
                          <div className="w-8 h-8 mx-auto mb-1 bg-primary/20 border border-primary/30" style={{ borderRadius: opt.value }} />
                          <span className="text-[10px] font-medium">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Heading Font</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFontChange("serif")}
                        className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                          fontStyle === "serif" ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"
                        }`}
                      >
                        <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Aa</span>
                        <div className="text-[10px] font-medium mt-1">Serif</div>
                        <div className="text-[9px] text-muted-foreground">Playfair Display</div>
                      </button>
                      <button
                        onClick={() => handleFontChange("sans")}
                        className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                          fontStyle === "sans" ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:border-muted"
                        }`}
                      >
                        <span className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Aa</span>
                        <div className="text-[10px] font-medium mt-1">Sans-Serif</div>
                        <div className="text-[9px] text-muted-foreground">Inter</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="p-6 rounded-2xl bg-card border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Language</h3>
                      <p className="text-xs text-muted-foreground">Currently set to English (US)</p>
                    </div>
                  </div>
                  <select className="px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto">
                    <option>English (US)</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Italiano</option>
                    <option>Deutsch</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-display font-semibold text-lg mb-6">Security Settings</h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium">Password</div>
                        <div className="text-xs text-muted-foreground">Last changed 45 days ago</div>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Login Notifications</div>
                        <div className="text-xs text-muted-foreground">Get notified of new sign-ins</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="text-sm font-medium mb-2">Active Sessions</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs font-medium">MacBook Pro — New York</div>
                            <div className="text-[10px] text-muted-foreground">Current session</div>
                          </div>
                        </div>
                        <span className="aura-badge aura-badge-success text-[10px]">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs font-medium">iPhone 15 — New York</div>
                            <div className="text-[10px] text-muted-foreground">2 hours ago</div>
                          </div>
                        </div>
                        <button className="text-[10px] text-destructive font-medium">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
