import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Store, Building2, Globe, Check, Sparkles, ArrowRight, ArrowLeft,
  Landmark, CalendarDays, UtensilsCrossed, Hotel, Palette, Wine, Trophy,
  TreePine, Baby, Camera, Compass, Train, Compass as CompassIcon,
} from "lucide-react";
import { useAuth, AccountType } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import coastImg from "@/assets/auth-coast.jpg";
import templeImg from "@/assets/auth-temple.jpg";
import mountainImg from "@/assets/auth-mountain.jpg";
import beachImg from "@/assets/auth-beach.jpg";

const accountTypes: { type: AccountType; icon: typeof Globe; title: string; description: string }[] = [
  { type: "creator", icon: User, title: "Individual Guide", description: "A personal page for independent guides and travel creators." },
  { type: "operator", icon: Store, title: "Tour Operator", description: "For tour companies, DMCs, and experience providers." },
  { type: "enterprise", icon: Building2, title: "Enterprise Group", description: "Multi-destination management for operator networks." },
  { type: "destination", icon: Globe, title: "Destination Authority", description: "Digital tourism hub for cities, states, or countries." },
];

const interestSet = [
  { label: "Attractions", icon: Landmark },
  { label: "Events & Festivals", icon: CalendarDays },
  { label: "Dining", icon: UtensilsCrossed },
  { label: "Hotels & Stays", icon: Hotel },
  { label: "Cultural Experiences", icon: Palette },
  { label: "Nightlife", icon: Wine },
  { label: "Sports", icon: Trophy },
  { label: "Nature & Eco", icon: TreePine },
  { label: "Family", icon: Baby },
  { label: "Photo & Video", icon: Camera },
  { label: "Plan Your Trip", icon: Compass },
  { label: "Getting Around", icon: Train },
];

const stepImages = [coastImg, templeImg, mountainImg, beachImg];
const stepLabels = ["Account type", "Profile", "Interests", "All set"];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, updateUser, signOut } = useAuth();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<AccountType | null>(user?.accountType ?? null);
  const [organization, setOrganization] = useState(user?.organization ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [picked, setPicked] = useState<string[]>([]);

  if (!user) {
    navigate("/auth", { replace: true });
    return null;
  }

  const total = stepLabels.length;

  const next = () => {
    if (step === 0 && !type) return toast({ title: "Pick an account type" });
    if (step === 1 && !organization) return toast({ title: "Enter your organization or page name" });
    setStep((s) => Math.min(s + 1, total - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    updateUser({
      accountType: type!,
      organization,
      city,
      onboarded: true,
    });
    toast({ title: "Welcome aboard", description: "Your dashboard is ready." });
    navigate("/dashboard", { replace: true });
  };

  const togglePick = (label: string) =>
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition";

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* LEFT — Form */}
      <div className="flex flex-col px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <CompassIcon className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-primary">Meridian Tours</span>
          </div>
          <button
            onClick={() => { signOut(); navigate("/signout"); }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>

        {/* Progress dots */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            {stepLabels.map((label, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <div key={label} className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 transition-all ${
                        done
                          ? "bg-primary border-primary text-primary-foreground"
                          : active
                          ? "border-primary text-primary bg-primary/5"
                          : "border-border text-muted-foreground bg-background"
                      }`}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider transition-colors ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div className="flex-1 h-px bg-border relative -mt-4">
                      <motion.div
                        className="h-full bg-primary origin-left"
                        initial={false}
                        animate={{ scaleX: done ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step body */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Step 1</span>
                  <h2 className="font-display text-3xl font-bold mt-2 mb-2">What best describes you?</h2>
                  <p className="text-sm text-muted-foreground mb-6">We'll tailor your dashboard to your use case.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {accountTypes.map((at) => {
                      const sel = type === at.type;
                      return (
                        <button
                          key={at.type}
                          onClick={() => setType(at.type)}
                          className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
                            sel
                              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                              : "border-border hover:border-muted-foreground/30 hover:shadow-sm"
                          }`}
                        >
                          {sel && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${sel ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                            <at.icon className="w-5 h-5" />
                          </div>
                          <div className="font-display font-semibold text-sm mb-1">{at.title}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{at.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Step 2</span>
                  <h2 className="font-display text-3xl font-bold mt-2 mb-2">Tell us about your operation</h2>
                  <p className="text-sm text-muted-foreground mb-6">This appears across your dashboard and microsite.</p>
                  <div className="space-y-5 max-w-md">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        Organization · Page name
                      </label>
                      <input className={inputCls} placeholder="e.g. Meridian Tours" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        Primary city or destination
                      </label>
                      <input className={inputCls} placeholder="e.g. Atlanta, Georgia" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Step 3</span>
                  <h2 className="font-display text-3xl font-bold mt-2 mb-2">Which modules matter most?</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Pick a few to enable first. You can change this anytime — {picked.length} selected.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {interestSet.map(({ label, icon: Icon }) => {
                      const sel = picked.includes(label);
                      return (
                        <button
                          key={label}
                          onClick={() => togglePick(label)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-medium transition-all text-left ${
                            sel
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border bg-card hover:border-muted-foreground/30 text-muted-foreground"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${sel ? "text-primary" : ""}`} />
                          <span className="truncate">{label}</span>
                          {sel && <Check className="w-3 h-3 ml-auto text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="py-4">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-xl shadow-primary/30"
                  >
                    <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">All set</span>
                  <h2 className="font-display text-3xl font-bold mt-2 mb-3">You're ready to explore, {user.name.split(" ")[0]}.</h2>
                  <p className="text-sm text-muted-foreground mb-5 max-w-md">
                    Your {accountTypes.find((a) => a.type === type)?.title.toLowerCase()} workspace is ready in seconds.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Organization</div>
                      <div className="text-sm font-semibold truncate">{organization}</div>
                    </div>
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Destination</div>
                      <div className="text-sm font-semibold truncate">{city || "—"}</div>
                    </div>
                    <div className="col-span-2 p-4 rounded-xl border bg-card">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Modules enabled</div>
                      <div className="flex flex-wrap gap-1.5">
                        {picked.length === 0 && <span className="text-xs text-muted-foreground">Start fresh — pick later</span>}
                        {picked.map((p) => (
                          <span key={p} className="px-2 py-0.5 rounded-full text-[11px] bg-primary/10 text-primary font-medium">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < total - 1 ? (
            <button
              onClick={next}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-primary/20"
            >
              Continue
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-primary/20"
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT — Imagery */}
      <div className="relative hidden lg:block overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={stepImages[step]}
            src={stepImages[step]}
            alt="Destination preview"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/15 to-black/55" />

        {/* Floating quote card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute inset-x-10 bottom-10 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-white"
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Why operators choose Meridian
          </div>
          <p className="font-display text-2xl xl:text-3xl leading-tight font-bold">
            {[
              "From a single page to a network of destinations — manage everything in one home.",
              "Curated experiences, sold through your branded microsite.",
              "Plug in the modules your travelers actually use.",
              "Welcome to a calmer way to run modern tourism.",
            ][step]}
          </p>
        </motion.div>

        {/* Top badge */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Setting up your workspace
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
