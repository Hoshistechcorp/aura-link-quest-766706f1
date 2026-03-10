import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Store, Building2, Globe, Check, Sparkles } from "lucide-react";
import { useAccountType, AccountType } from "@/contexts/AccountTypeContext";

const accountTypes: {
  type: AccountType;
  icon: typeof Globe;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    type: "creator",
    icon: User,
    title: "Individual Guide",
    description: "Personal page for independent tour guides and travel creators.",
    color: "hsl(var(--aura-info))",
  },
  {
    type: "restaurant",
    icon: Store,
    title: "Tour Operator",
    description: "For tour companies, DMCs, and experience providers.",
    color: "hsl(var(--primary))",
  },
  {
    type: "enterprise",
    icon: Building2,
    title: "Enterprise Group",
    description: "Multi-destination management for tour operator networks.",
    color: "hsl(var(--aura-warning))",
  },
  {
    type: "destination",
    icon: Globe,
    title: "Destination / Tourism Authority",
    description: "Create a digital tourism hub for cities, states, or countries.",
    color: "hsl(var(--aura-success))",
  },
];

const AccountTypeSelectorPage = () => {
  const navigate = useNavigate();
  const { accountType, setAccountType } = useAccountType();

  const handleSelect = (type: AccountType) => {
    setAccountType(type);
  };

  const handleContinue = () => {
    navigate("/microsite");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-display font-bold text-primary">Meridian Tours</h1>
          </div>
          <h2 className="text-xl font-display font-semibold mb-2">Choose Your Account Type</h2>
          <p className="text-sm text-muted-foreground">Select the type that best describes your use case.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {accountTypes.map((at, i) => {
            const isSelected = accountType === at.type;
            return (
              <motion.button
                key={at.type}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleSelect(at.type)}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${at.color}15` }}>
                  <at.icon className="w-6 h-6" style={{ color: at.color }} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{at.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{at.description}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Continue →
          </button>
          <p className="text-xs text-muted-foreground mt-3">You can change this anytime in Settings.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountTypeSelectorPage;
