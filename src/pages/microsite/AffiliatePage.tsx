import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Handshake, Copy, Check, DollarSign, BarChart3, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AffiliatePage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const affiliateCode = "AFF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const affiliateLink = `https://meridiantours.com/atlanta?aff=${affiliateCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast({ title: "Affiliate link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers = [
    { name: "Explorer", commission: "8%", requirement: "0–10 bookings", active: true },
    { name: "Navigator", commission: "12%", requirement: "11–50 bookings", active: false },
    { name: "Ambassador", commission: "18%", requirement: "51+ bookings", active: false },
  ];

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={() => navigate("/microsite")} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display font-semibold text-lg">Travel Partner Program</h1>
          <p className="text-xs text-muted-foreground">Promote tours & earn commission</p>
        </div>
        <Handshake className="w-5 h-5 text-primary ml-auto" />
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center p-6 rounded-2xl bg-secondary/10 border border-secondary/20">
          <DollarSign className="w-12 h-12 text-secondary mx-auto mb-3" />
          <h2 className="font-display font-bold text-xl mb-1">Earn Commission</h2>
          <p className="text-sm text-muted-foreground">Promote Meridian Tours and earn up to 18% on every booking</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Your affiliate link</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border text-sm font-mono truncate">{affiliateLink}</div>
            <button onClick={copyLink} className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium shrink-0">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Referrals", value: "0" },
            { icon: BarChart3, label: "Bookings", value: "0" },
            { icon: DollarSign, label: "Earned", value: "$0" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-card border text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="font-display font-bold text-lg">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-display font-semibold mb-3">Commission Tiers</h3>
          <div className="space-y-2">
            {tiers.map((t) => (
              <div key={t.name} className={`flex items-center justify-between p-4 rounded-xl border ${t.active ? "bg-primary/5 border-primary/30" : "bg-muted/30"}`}>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.requirement}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg">{t.commission}</span>
                  {t.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">Active</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatePage;
