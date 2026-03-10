import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, Sparkles, Zap, Crown, Building2, ArrowRight,
  Shield, TrendingUp, Minus,
} from "lucide-react";
import DashboardLayout from "@/components/aura/DashboardLayout";

/* ── Plan tiers ───────────────────────────────────── */
const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "/mo",
    icon: Zap,
    desc: "Get started with the essentials",
    popular: false,
    cta: "Current Plan",
    disabled: true,
    gradient: "from-muted/60 to-muted/30",
    accent: "text-muted-foreground",
  },
  {
    id: "pro",
    name: "Pro",
    price: 99.99,
    period: "/mo",
    icon: Sparkles,
    desc: "For growing businesses",
    popular: true,
    cta: "Upgrade to Pro",
    disabled: false,
    gradient: "from-primary/15 to-primary/5",
    accent: "text-primary",
  },
  {
    id: "premium",
    name: "Premium",
    price: 299,
    period: "/mo",
    icon: Crown,
    desc: "All tools & multi-location",
    popular: false,
    cta: "Upgrade to Premium",
    disabled: false,
    gradient: "from-chart-4/15 to-chart-4/5",
    accent: "text-chart-4",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "",
    icon: Building2,
    desc: "Custom solutions at scale",
    popular: false,
    cta: "Contact Sales",
    disabled: false,
    gradient: "from-chart-2/15 to-chart-2/5",
    accent: "text-chart-2",
  },
];

/* ── Feature comparison (updated for 15 cards) ───── */
const featureGroups = [
  {
    group: "Core Platform",
    features: [
      { name: "AuraLink Page", free: true, pro: true, premium: true, enterprise: true },
      { name: "Card Slots", free: "3", pro: "9", premium: "15", enterprise: "15" },
      { name: "Staff Profiles", free: "2", pro: "10", premium: "Unlimited", enterprise: "Unlimited" },
      { name: "Photo Gallery", free: "20 photos", pro: "200 photos", premium: "Unlimited", enterprise: "Unlimited" },
      { name: "QR Codes", free: "1", pro: "5", premium: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    group: "Locations & Team",
    features: [
      { name: "Locations", free: "1", pro: "1", premium: "Up to 5", enterprise: "Unlimited" },
      { name: "Add Location", free: false, pro: false, premium: true, enterprise: true },
      { name: "Per-Location Links", free: false, pro: false, premium: true, enterprise: true },
      { name: "Team Members", free: "1 (owner)", pro: "3", premium: "10", enterprise: "Unlimited" },
      { name: "Role-Based Access", free: false, pro: false, premium: true, enterprise: true },
    ],
  },
  {
    group: "Marketing & Growth",
    features: [
      { name: "Analytics Dashboard", free: false, pro: true, premium: true, enterprise: true },
      { name: "AI Concierge", free: false, pro: true, premium: true, enterprise: true },
      { name: "SEO Dashboard", free: false, pro: "Basic", premium: true, enterprise: true },
      { name: "Gamification & Badges", free: false, pro: false, premium: true, enterprise: true },
      { name: "Affiliate Marketing", free: false, pro: false, premium: true, enterprise: true },
      { name: "Influencer Tools", free: false, pro: false, premium: true, enterprise: true },
      { name: "Loyalty Program", free: false, pro: false, premium: true, enterprise: true },
      { name: "Reputation Management", free: false, pro: false, premium: true, enterprise: true },
    ],
  },
  {
    group: "Enterprise Features",
    features: [
      { name: "Multi-Location Analytics", free: false, pro: false, premium: false, enterprise: true },
      { name: "Custom Branding", free: false, pro: false, premium: true, enterprise: true },
      { name: "Priority Support", free: false, pro: false, premium: true, enterprise: true },
      { name: "Dedicated Account Manager", free: false, pro: false, premium: false, enterprise: true },
      { name: "API Access", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
];

const renderCell = (val: boolean | string) => {
  if (val === true) return <Check className="w-4 h-4 text-emerald-500 mx-auto" />;
  if (val === false) return <Minus className="w-3.5 h-3.5 text-muted-foreground/25 mx-auto" />;
  return <span className="text-xs font-semibold text-foreground/80">{val}</span>;
};

/* ── Highlights per plan (for modal) ──────────────── */
const planHighlights: Record<string, string[]> = {
  pro: ["9 Card Slots", "Analytics Dashboard", "AI Concierge", "Up to 3 Team Members", "5 QR Codes", "Basic SEO"],
  premium: ["All 15 Card Slots", "Up to 5 Locations", "Add Location", "All Marketing Tools", "Loyalty Program", "Reputation Management"],
  enterprise: ["Unlimited Everything", "Multi-Location Analytics", "Dedicated Account Manager", "API Access", "Custom Branding", "Priority Support"],
};

const SubscriptionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [annual, setAnnual] = useState(false);

  const handleUpgrade = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <DashboardLayout title="Subscription" subtitle="Choose the right plan for your business">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-primary" : "bg-muted-foreground/20"}`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-5 h-5 rounded-full bg-card shadow-md"
            style={{ left: annual ? "calc(100% - 24px)" : "4px" }}
          />
        </button>
        <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
          Annual
          <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold tracking-wide uppercase">
            Save 20%
          </span>
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className={`relative flex flex-col p-6 rounded-2xl border transition-all hover:shadow-lg bg-gradient-to-b ${plan.gradient} ${
              plan.popular ? "border-primary/40 shadow-lg ring-1 ring-primary/20" : "border-border/60 hover:border-primary/20"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold tracking-wide uppercase shadow-md">
                Most Popular
              </span>
            )}

            <div className={`w-11 h-11 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center mb-4 ${plan.accent}`}>
              <plan.icon className="w-5 h-5" />
            </div>

            <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{plan.desc}</p>

            <div className="mb-6 mt-auto">
              {plan.price !== null ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ${annual ? Math.round(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{plan.period}</span>
                  {annual && plan.price > 0 && (
                    <span className="text-xs text-muted-foreground line-through ml-1">${plan.price}</span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-bold">Custom Pricing</span>
              )}
            </div>

            <button
              onClick={() => !plan.disabled && handleUpgrade(plan)}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                plan.disabled
                  ? "bg-muted text-muted-foreground cursor-default"
                  : plan.popular
                  ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                  : "bg-card border border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Current Plan Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 mb-10"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">You're on the Free plan</p>
          <p className="text-xs text-muted-foreground">Upgrade to unlock all 15 cards, analytics, AI tools, and multi-location support. Pro starts at $99.99/mo.</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-primary">
          <TrendingUp className="w-3.5 h-3.5" />
          Compare plans below
        </div>
      </motion.div>

      {/* Feature Comparison */}
      <div className="rounded-2xl bg-card border overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-muted/30 to-transparent">
          <h3 className="font-display text-lg font-bold">Feature Comparison</h3>
          <p className="text-xs text-muted-foreground mt-1">All 15 destination & restaurant cards included in Premium+</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Feature</th>
                {plans.map((p) => (
                  <th key={p.id} className={`px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider min-w-[100px] ${p.popular ? "text-primary" : "text-muted-foreground"}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureGroups.map((group) => (
                <>
                  <tr key={group.group}>
                    <td colSpan={5} className="px-6 py-3 bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {group.group}
                    </td>
                  </tr>
                  {group.features.map((feat, i) => (
                    <tr key={feat.name} className={`border-b border-border/40 last:border-0 transition-colors hover:bg-muted/10 ${i % 2 === 0 ? "" : "bg-muted/5"}`}>
                      <td className="px-6 py-3 text-sm font-medium">{feat.name}</td>
                      <td className="px-4 py-3 text-center">{renderCell(feat.free)}</td>
                      <td className={`px-4 py-3 text-center ${plans[1].popular ? "bg-primary/[0.03]" : ""}`}>{renderCell(feat.pro)}</td>
                      <td className="px-4 py-3 text-center">{renderCell(feat.premium)}</td>
                      <td className="px-4 py-3 text-center">{renderCell(feat.enterprise)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-7 rounded-2xl bg-card border shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlan.gradient} flex items-center justify-center`}>
                  <selectedPlan.icon className={`w-5 h-5 ${selectedPlan.accent}`} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Upgrade to {selectedPlan.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedPlan.desc}</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-muted/30 border border-border/40 mb-6">
                <h4 className="text-sm font-bold mb-3">What you'll unlock:</h4>
                <div className="space-y-2.5">
                  {(planHighlights[selectedPlan.id] ?? []).map((h) => (
                    <div key={h} className="flex items-center gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPlan.price !== null && (
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ${annual ? Math.round(selectedPlan.price * 0.8) : selectedPlan.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">/month</span>
                  {annual && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">
                      20% off
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl bg-muted text-sm font-semibold hover:bg-muted/80 transition-colors"
                >
                  Maybe Later
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-md">
                  {selectedPlan.price !== null ? "Subscribe Now" : "Contact Sales"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
