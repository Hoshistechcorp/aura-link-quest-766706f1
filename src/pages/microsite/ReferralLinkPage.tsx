import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Link2, Copy, Check, Gift, Users, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReferralLinkPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralCode = "MERIDIAN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralLink = `https://meridiantours.com/atlanta?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share it with fellow travelers to earn rewards." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={() => navigate("/microsite")} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display font-semibold text-lg">Refer a Traveler</h1>
          <p className="text-xs text-muted-foreground">Share & earn travel credits</p>
        </div>
        <Link2 className="w-5 h-5 text-primary ml-auto" />
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <Gift className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="font-display font-bold text-xl mb-1">Give $15, Get $15</h2>
          <p className="text-sm text-muted-foreground">When your friend books a tour using your link, you both get $15 credit</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Your unique referral link</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border text-sm font-mono truncate">{referralLink}</div>
            <button onClick={copyLink} className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium shrink-0">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Referred", value: "0" },
            { icon: TrendingUp, label: "Bookings", value: "0" },
            { icon: Gift, label: "Earned", value: "$0" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-card border text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="font-display font-bold text-lg">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-display font-semibold mb-3">How it works</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Share your unique link with fellow travelers" },
              { step: "2", text: "They book any Meridian Tours experience" },
              { step: "3", text: "You both receive $15 toward your next adventure" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                <span className="text-sm">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkPage;
