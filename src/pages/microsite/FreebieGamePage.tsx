import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Gift, RotateCcw, Trophy, Sparkles, Mail, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const prizes = [
  { label: "10% Off Tour", color: "hsl(var(--primary))", icon: Gift },
  { label: "Free Guide Book", color: "hsl(var(--aura-success))", icon: Sparkles },
  { label: "Try Again", color: "hsl(var(--muted-foreground))", icon: RotateCcw },
  { label: "Free Souvenir", color: "hsl(var(--aura-info))", icon: Gift },
  { label: "20% Off Package", color: "hsl(var(--aura-warning))", icon: Trophy },
  { label: "Try Again", color: "hsl(var(--muted-foreground))", icon: RotateCcw },
  { label: "Free Bike Rental", color: "hsl(var(--secondary))", icon: Gift },
  { label: "VIP Upgrade", color: "hsl(var(--primary))", icon: Trophy },
];

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const FreebieGamePage = () => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [claimed, setClaimed] = useState(false);

  const spin = () => {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setResult(null);
    setClaimed(false);
    setEmail("");
    setEmailError("");
    setSpinsLeft((s) => s - 1);
    setTimeout(() => {
      const winner = Math.floor(Math.random() * prizes.length);
      setResult(winner);
      setSpinning(false);
    }, 2500);
  };

  const handleClaim = () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailError(parsed.error.errors[0].message);
      return;
    }
    setEmailError("");
    setClaimed(true);
    toast({ title: "Prize claimed! 🎉", description: `We'll send your reward details to ${parsed.data}` });
  };

  const prize = result !== null ? prizes[result] : null;
  const isWinner = prize && prize.label !== "Try Again";

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={() => navigate("/microsite")} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display font-semibold text-lg">Spin & Win</h1>
          <p className="text-xs text-muted-foreground">Win travel perks & discounts!</p>
        </div>
        <Gamepad2 className="w-5 h-5 text-primary ml-auto" />
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        <div className="relative w-64 h-64">
          <motion.div
            className="w-full h-full rounded-full border-4 border-primary/20 grid grid-cols-2 grid-rows-4 overflow-hidden"
            animate={spinning ? { rotate: 360 * 5 + (result ?? 0) * 45 } : {}}
            transition={{ duration: 2.5, ease: [0.2, 0.8, 0.3, 1] }}
          >
            {prizes.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex flex-col items-center justify-center gap-1 border border-border/30" style={{ backgroundColor: `${p.color}10` }}>
                  <Icon className="w-4 h-4" style={{ color: p.color }} />
                  <span className="text-[10px] font-medium text-center leading-tight">{p.label}</span>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 bg-primary rotate-45 rounded-sm" />
        </div>

        <AnimatePresence mode="wait">
          {prize && !isWinner && (
            <motion.div key="lose" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center p-6 rounded-2xl bg-muted/30 border w-full">
              <RotateCcw className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
              <h2 className="font-display font-bold text-xl">No luck this time!</h2>
              <p className="text-sm text-muted-foreground mt-1">Come back tomorrow for another spin</p>
            </motion.div>
          )}
          {isWinner && !claimed && (
            <motion.div key="win" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full space-y-4">
              <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <prize.icon className="w-10 h-10 mx-auto mb-2" style={{ color: prize.color }} />
                <h2 className="font-display font-bold text-xl">You won: {prize.label}!</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your email to claim your travel perk</p>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} placeholder="your@email.com" className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={255} onKeyDown={(e) => e.key === "Enter" && handleClaim()} />
                </div>
                {emailError && <p className="text-xs text-destructive px-1">{emailError}</p>}
                <button onClick={handleClaim} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg">🎁 Claim My Prize</button>
                <p className="text-[10px] text-muted-foreground text-center">We'll email your reward code. No spam, ever.</p>
              </div>
            </motion.div>
          )}
          {claimed && (
            <motion.div key="claimed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center p-6 rounded-2xl bg-aura-success/10 border border-aura-success/20 w-full">
              <div className="w-14 h-14 rounded-full bg-aura-success/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7 text-aura-success" />
              </div>
              <h2 className="font-display font-bold text-xl">Prize Claimed!</h2>
              <p className="text-sm text-muted-foreground mt-1">Check your email for your <strong>{prize?.label}</strong> reward code</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && (
          <button onClick={spin} disabled={spinning || spinsLeft <= 0} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg disabled:opacity-50 transition-opacity">
            {spinning ? "Spinning..." : spinsLeft > 0 ? "🎰 Spin the Wheel" : "Come back tomorrow!"}
          </button>
        )}
        <p className="text-xs text-muted-foreground text-center">{spinsLeft} spin{spinsLeft !== 1 ? "s" : ""} remaining today · Resets daily at midnight</p>
      </div>
    </div>
  );
};

export default FreebieGamePage;
