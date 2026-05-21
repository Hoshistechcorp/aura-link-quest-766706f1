import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Store, Building2, Globe, Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth, AccountType } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const accountTypes: { type: AccountType; icon: typeof Globe; title: string; description: string; color: string }[] = [
  { type: "creator", icon: User, title: "Individual Guide", description: "Personal page for independent tour guides and travel creators.", color: "hsl(var(--aura-info))" },
  { type: "operator", icon: Store, title: "Tour Operator", description: "For tour companies, DMCs, and experience providers.", color: "hsl(var(--primary))" },
  { type: "enterprise", icon: Building2, title: "Enterprise Group", description: "Multi-destination management for tour operator networks.", color: "hsl(var(--aura-warning))" },
  { type: "destination", icon: Globe, title: "Destination / Tourism Authority", description: "Digital tourism hub for cities, states, or countries.", color: "hsl(var(--aura-success))" },
];

const interests = [
  "Attractions", "Events & Festivals", "Dining", "Hotels & Stays",
  "Cultural Experiences", "Nightlife", "Sports", "Nature & Eco",
  "Family", "Photo & Video", "Plan Your Trip", "Getting Around",
];

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

  const steps = ["Account type", "Profile", "Interests", "Done"];
  const total = steps.length;
  const progress = ((step + 1) / total) * 100;

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
    toast({ title: "All set", description: "Welcome to your dashboard." });
    navigate("/dashboard", { replace: true });
  };

  const togglePick = (label: string) =>
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const inputCls = "w-full px-3 py-2.5 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-primary">Meridian Tours</span>
          </div>
          <button onClick={() => { signOut(); navigate("/auth"); }} className="text-xs text-muted-foreground hover:text-foreground">
            Sign out
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-[11px] text-muted-foreground mb-2">
            <span>Step {step + 1} of {total}</span>
            <span>{steps[step]}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="bg-card border rounded-2xl p-6 shadow-sm"
          >
            {step === 0 && (
              <>
                <h2 className="font-display font-semibold text-lg mb-1">What best describes you?</h2>
                <p className="text-xs text-muted-foreground mb-5">We'll tailor the dashboard to your use case.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {accountTypes.map((at) => {
                    const sel = type === at.type;
                    return (
                      <button
                        key={at.type}
                        onClick={() => setType(at.type)}
                        className={`relative text-left p-4 rounded-xl border-2 transition ${
                          sel ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        {sel && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${at.color}15` }}>
                          <at.icon className="w-5 h-5" style={{ color: at.color }} />
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
                <h2 className="font-display font-semibold text-lg mb-1">Tell us about your operation</h2>
                <p className="text-xs text-muted-foreground mb-5">This appears across your dashboard and microsite.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5">Organization / Page name</label>
                    <input className={inputCls} placeholder="e.g. Meridian Tours" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5">Primary city or destination</label>
                    <input className={inputCls} placeholder="e.g. Atlanta, Georgia" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-display font-semibold text-lg mb-1">Which modules matter most?</h2>
                <p className="text-xs text-muted-foreground mb-5">Pick the modules you want enabled first. You can change this anytime.</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((label) => {
                    const sel = picked.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => togglePick(label)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition ${
                          sel ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 hover:bg-muted border-border"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-lg mb-1">You're all set, {user.name}</h2>
                <p className="text-xs text-muted-foreground mb-2">
                  {organization} · {city || "Destination not set"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Account type: <span className="font-medium text-foreground">{accountTypes.find((a) => a.type === type)?.title}</span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < total - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
