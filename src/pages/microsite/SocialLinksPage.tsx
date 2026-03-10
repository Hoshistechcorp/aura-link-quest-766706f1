import { useNavigate } from "react-router-dom";
import { ArrowLeft, Instagram, Facebook, Twitter, Youtube, Globe, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const platformIcons: Record<string, any> = {
  Instagram, Facebook, "Twitter/X": Twitter, TikTok: MessageCircle, YouTube: Youtube,
  LinkedIn: Globe, Pinterest: Globe, Yelp: Globe, TripAdvisor: Globe, "Google Business": Globe,
};

const platformColors: Record<string, string> = {
  Instagram: "bg-gradient-to-br from-pink-500 to-purple-600",
  Facebook: "bg-blue-600",
  "Twitter/X": "bg-foreground",
  TikTok: "bg-foreground",
  YouTube: "bg-red-600",
  LinkedIn: "bg-blue-700",
  Pinterest: "bg-red-700",
  Yelp: "bg-red-500",
  TripAdvisor: "bg-green-600",
  "Google Business": "bg-primary",
};

const SocialLinksPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const socials = getItems("socialLinks");

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Connect With Us</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {socials.map((s, i) => {
          const Icon = platformIcons[s.platform] || Globe;
          const color = platformColors[s.platform] || "bg-primary";
          return (
            <motion.a
              key={s.id}
              href={s.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-card border hover:border-primary/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{s.platform}</h3>
                <p className="text-xs text-muted-foreground truncate">{s.handle || s.url}</p>
              </div>
              {s.followers && <span className="text-xs text-muted-foreground shrink-0">{s.followers}</span>}
              <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 shrink-0" />
            </motion.a>
          );
        })}
        {socials.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No social links added yet.</div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default SocialLinksPage;
