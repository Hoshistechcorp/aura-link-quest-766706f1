import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/aura/DashboardLayout";
import {
  Sparkles, GraduationCap, Music2, Wallet, CreditCard, Camera,
  Trophy, Users2, Building, Link2, Key, ShieldCheck, ArrowLeft,
  CheckCircle2, XCircle, Globe, Bell, ToggleLeft, Award, Search,
  ImageIcon, CalendarDays, DollarSign, Share2, Eye, Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const appData: Record<string, { name: string; icon: any; description: string; color: string; features: { icon: any; title: string; desc: string }[] }> = {
  auralink: {
    name: "AuraLink",
    icon: Sparkles,
    description: "Business microsites and customer engagement platform.",
    color: "hsl(var(--primary))",
    features: [
      { icon: Globe, title: "Microsite Builder", desc: "Create and manage your public business page." },
      { icon: Share2, title: "Social Sharing", desc: "Auto-generate shareable links and QR codes." },
      { icon: Eye, title: "Visitor Analytics", desc: "Track page views, clicks, and engagement." },
    ],
  },
  learning: {
    name: "iBloov Learning",
    icon: GraduationCap,
    description: "Staff training, certifications, and professional badges.",
    color: "hsl(210 70% 50%)",
    features: [
      { icon: Award, title: "Staff Badges", desc: "Badge levels and training completion tracking." },
      { icon: CheckCircle2, title: "Certifications", desc: "Issue and verify staff certifications." },
      { icon: GraduationCap, title: "Course Builder", desc: "Create training modules for your team." },
    ],
  },
  vibesgigs: {
    name: "VibesGigs",
    icon: Music2,
    description: "Talent marketplace for DJs, hosts, bartenders, and event staff.",
    color: "hsl(280 60% 55%)",
    features: [
      { icon: Search, title: "Search Talent", desc: "Find verified DJs, hosts, and performers." },
      { icon: Users2, title: "Hire Mavericks", desc: "Book and manage talent for your events." },
      { icon: CheckCircle2, title: "Import Profiles", desc: "Import staff profiles from the marketplace." },
    ],
  },
  flexit: {
    name: "Flex-it",
    icon: Wallet,
    description: "Fintech system for deposits, bill splitting, and co-funded experiences.",
    color: "hsl(152 60% 40%)",
    features: [
      { icon: DollarSign, title: "Deposit Rules", desc: "Configure deposit amounts and refund policies." },
      { icon: Users2, title: "Co-Funding", desc: "Allow groups to co-fund experiences together." },
      { icon: CreditCard, title: "Bill Splitting", desc: "Split bills between multiple guests." },
    ],
  },
  shpr: {
    name: "SHPR",
    icon: CreditCard,
    description: "Save Half Pay Rest — financing for high-value experiences.",
    color: "hsl(38 90% 55%)",
    features: [
      { icon: DollarSign, title: "Payment Plans", desc: "Enable Save Half Pay Rest payment model." },
      { icon: Settings, title: "Configuration", desc: "Set eligibility thresholds and terms." },
      { icon: CheckCircle2, title: "Approval Flow", desc: "Manage financing approval workflows." },
    ],
  },
  picpop: {
    name: "PicPop",
    icon: Camera,
    description: "Event photo memory feed — display and moderate user photos from events.",
    color: "hsl(340 70% 55%)",
    features: [
      { icon: ImageIcon, title: "Photo Feed", desc: "View and feature trending event photos." },
      { icon: Eye, title: "Moderation", desc: "Approve, flag, or remove user-submitted photos." },
      { icon: Share2, title: "Social Export", desc: "Export photo collections for social media." },
    ],
  },
  sportmate: {
    name: "Sportmate",
    icon: Trophy,
    description: "Discover sports games happening at venues — fan gatherings and watch parties.",
    color: "hsl(120 50% 40%)",
    features: [
      { icon: CalendarDays, title: "Game Schedules", desc: "List upcoming games and watch parties." },
      { icon: Users2, title: "Fan Meetups", desc: "Organize and promote fan gatherings." },
      { icon: Trophy, title: "Leaderboards", desc: "Track fan engagement and predictions." },
    ],
  },
  tribemint: {
    name: "TribeMint",
    icon: Users2,
    description: "Affiliate and influencer commission system — earn from bookings and purchases.",
    color: "hsl(25 85% 55%)",
    features: [
      { icon: DollarSign, title: "Affiliate Earnings", desc: "Track commissions and payouts." },
      { icon: Share2, title: "Campaigns", desc: "Create and manage influencer campaigns." },
      { icon: Users2, title: "Creator Partners", desc: "Manage creator partnerships and tiers." },
    ],
  },
  municipal: {
    name: "Municipal Nebula",
    icon: Building,
    description: "City data intelligence layer for local governments.",
    color: "hsl(220 50% 45%)",
    features: [
      { icon: Eye, title: "Data Sharing", desc: "Share anonymous engagement data with the city." },
      { icon: ToggleLeft, title: "Transparency Mode", desc: "Opt-in to full transparency reporting." },
      { icon: Award, title: "City Partner Badge", desc: "Earn recognition as a contributing venue." },
    ],
  },
};

// Quick action sub-pages
const ConnectAppPage = () => {
  const [webhookEvents, setWebhookEvents] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem("eco-webhooks") || "{}"); } catch { return {}; }
  });

  const toggleEvent = (evt: string) => {
    const next = { ...webhookEvents, [evt]: !webhookEvents[evt] };
    setWebhookEvents(next);
    localStorage.setItem("eco-webhooks", JSON.stringify(next));
  };

  const events = [
    "Supernova user enters venue geofence",
    "Staff member earns new certification",
    "Affiliate booking generated",
    "Influencer campaign conversion",
  ];

  return (
    <DashboardLayout title="Connect New App" subtitle="iBloov Ecosystem">
      <div className="space-y-6">
        <div className="bg-card rounded-2xl border p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold">API Connection</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Aura Protocol API Key</label>
              <input className="w-full px-3 py-2 rounded-xl border bg-background text-sm" placeholder="ap_live_xxxxxxxxxxxx" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Webhook URL</label>
              <input className="w-full px-3 py-2 rounded-xl border bg-background text-sm" placeholder="https://your-domain.com/webhook" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-muted-foreground">Not connected</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Connect
          </button>
        </div>
        <div className="bg-card rounded-2xl border p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold">Webhook Events</h3>
          <p className="text-sm text-muted-foreground">Subscribe to ecosystem triggers:</p>
          <div className="space-y-3">
            {events.map((evt) => (
              <label key={evt} className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={!!webhookEvents[evt]}
                  onCheckedChange={() => toggleEvent(evt)}
                />
                <span className="text-sm">{evt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ApiKeysPage = () => (
  <DashboardLayout title="Manage API Keys" subtitle="iBloov Ecosystem">
    <div className="bg-card rounded-2xl border p-6 space-y-4">
      <h3 className="font-display text-lg font-semibold">Your API Keys</h3>
      <div className="space-y-3">
        {[
          { name: "Production Key", key: "ap_live_••••••••xxR4", status: "active" },
          { name: "Staging Key", key: "ap_test_••••••••yZ12", status: "active" },
        ].map((k) => (
          <div key={k.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
            <div>
              <p className="text-sm font-medium">{k.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{k.key}</p>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--aura-success)/0.15)] text-[hsl(var(--aura-success))]">
              {k.status}
            </span>
          </div>
        ))}
      </div>
      <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
        Generate New Key
      </button>
    </div>
  </DashboardLayout>
);

const permissionItems = [
  { key: "ibloov-global", label: "Share data with iBloov Global", desc: "Aggregate analytics across the platform" },
  { key: "municipal-nebula", label: "Share data with Municipal Nebula", desc: "Anonymous venue engagement data for city insights" },
  { key: "partner-venues", label: "Share data with Partner Venues", desc: "Cross-promote with partner businesses" },
];

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem("eco-permissions") || "{}"); } catch { return {}; }
  });

  const togglePerm = (key: string) => {
    const next = { ...permissions, [key]: !permissions[key] };
    setPermissions(next);
    localStorage.setItem("eco-permissions", JSON.stringify(next));
  };

  return (
    <DashboardLayout title="Ecosystem Permissions" subtitle="iBloov Ecosystem">
      <div className="bg-card rounded-2xl border p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold">Data Permissions</h3>
        <p className="text-sm text-muted-foreground">Control what data is shared with ecosystem partners.</p>
        <div className="space-y-4">
          {permissionItems.map((perm) => (
            <div key={perm.key} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
              <div>
                <p className="text-sm font-medium">{perm.label}</p>
                <p className="text-xs text-muted-foreground">{perm.desc}</p>
              </div>
              <Switch
                checked={!!permissions[perm.key]}
                onCheckedChange={() => togglePerm(perm.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Individual app detail page
const AppDetailPage = ({ appId }: { appId: string }) => {
  const navigate = useNavigate();
  const app = appData[appId];
  const [connected, setConnected] = useState(appId === "auralink");

  if (!app) {
    return (
      <DashboardLayout title="App Not Found" subtitle="iBloov Ecosystem">
        <div className="text-center py-20">
          <p className="text-muted-foreground">This ecosystem app is not available yet.</p>
          <button onClick={() => navigate("/dashboard")} className="mt-4 text-primary text-sm font-medium hover:underline">
            ← Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const Icon = app.icon;

  return (
    <DashboardLayout title={app.name} subtitle="iBloov Ecosystem">
      <div className="space-y-6">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero */}
        <div className="bg-card rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${app.color}20` }}>
            <Icon className="w-7 h-7" style={{ color: app.color }} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg sm:text-xl font-bold">{app.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <button
                onClick={() => setConnected(!connected)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  connected
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {connected ? "Disconnect" : "Connect App"}
              </button>
              {connected && (
                <span className="flex items-center gap-1.5 text-sm text-[hsl(var(--aura-success))]">
                  <CheckCircle2 className="w-4 h-4" /> Connected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {app.features.map((f) => (
            <div key={f.title} className="bg-card rounded-2xl border p-5 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h4 className="text-sm font-semibold">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="bg-card rounded-2xl border p-6 space-y-4">
          <h3 className="font-display text-base font-semibold">Integration Status</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Webhook</p>
                <p className="text-xs text-muted-foreground">{connected ? "Active" : "Not configured"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Key className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">API Key</p>
                <p className="text-xs text-muted-foreground">{connected ? "ap_live_••••xxR4" : "None"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Lazy imports for dedicated ecosystem pages
import PicPopPage from "./ecosystem/PicPopPage";
import SportmatePage from "./ecosystem/SportmatePage";
import TribeMintPage from "./ecosystem/TribeMintPage";
import FlexitPage from "./ecosystem/FlexitPage";
import VibesGigsPage from "./ecosystem/VibesGigsPage";
import MunicipalNebulaPage from "./ecosystem/MunicipalNebulaPage";

const dedicatedPages: Record<string, React.ComponentType> = {
  picpop: PicPopPage,
  sportmate: SportmatePage,
  tribemint: TribeMintPage,
  flexit: FlexitPage,
  vibesgigs: VibesGigsPage,
  municipal: MunicipalNebulaPage,
};

// Router component
const EcosystemPage = () => {
  const { appId } = useParams();

  if (appId === "connect") return <ConnectAppPage />;
  if (appId === "api-keys") return <ApiKeysPage />;
  if (appId === "permissions") return <PermissionsPage />;

  // Check for dedicated tourism pages
  if (appId && dedicatedPages[appId]) {
    const DedicatedPage = dedicatedPages[appId];
    return <DedicatedPage />;
  }

  if (appId) return <AppDetailPage appId={appId} />;

  return (
    <DashboardLayout title="iBloov Ecosystem" subtitle="All Apps">
      <p className="text-muted-foreground">Select an app from the launcher.</p>
    </DashboardLayout>
  );
};

export default EcosystemPage;
