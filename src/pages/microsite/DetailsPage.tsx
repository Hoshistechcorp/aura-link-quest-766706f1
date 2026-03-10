import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Phone, Globe, MapPin, Shield, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const highlights = [
  { icon: Shield, label: "Licensed & Insured DMC" },
  { icon: Award, label: "TripAdvisor Excellence 2024" },
  { icon: Users, label: "50,000+ travelers served" },
  { icon: Globe, label: "Multi-language guides" },
];

const DetailsPage = () => {
  const navigate = useNavigate();
  const { businessInfo, hours, getItems } = useMicrositeContent();
  const aboutSections = getItems("aboutUs");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const formatTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h > 12 ? h - 12 : h || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">About {businessInfo.name}</h1>
      </div>

      <div className="px-4 mt-4 space-y-6">
        {/* About sections from admin */}
        {aboutSections.map((section, i) => (
          <motion.div key={section.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{section.heading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
          </motion.div>
        ))}

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm">{businessInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm">{businessInfo.website}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{businessInfo.address}</span>
            </div>
          </div>
        </motion.div>

        {/* Hours */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Office Hours</h2>
          <div className="rounded-xl bg-card border divide-y">
            {hours.map((h) => (
              <div key={h.day} className={`flex items-center justify-between px-4 py-2.5 text-sm ${h.day === today ? "bg-primary/5 font-medium" : ""}`}>
                <div className="flex items-center gap-2">
                  {h.day === today && <Clock className="w-3.5 h-3.5 text-primary" />}
                  <span>{h.day}</span>
                </div>
                <span className="text-muted-foreground">
                  {h.closed ? "Closed" : `${formatTime(h.open)} – ${formatTime(h.close)}`}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Why Choose Us</h2>
          <div className="grid grid-cols-2 gap-2">
            {highlights.map((a) => (
              <div key={a.label} className="flex items-center gap-2 p-3 rounded-xl bg-card border text-sm">
                <a.icon className="w-4 h-4 text-primary" />
                {a.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="h-8" />
    </div>
  );
};

export default DetailsPage;
