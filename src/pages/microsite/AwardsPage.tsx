import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const awards = [
  { title: "TripAdvisor Travelers' Choice", year: "2024", org: "TripAdvisor", icon: Trophy, desc: "Top 10% of attractions worldwide" },
  { title: "Best Tour Operator — Southeast", year: "2024", org: "Travel + Leisure", icon: Award, desc: "Recognized for exceptional curated experiences" },
  { title: "Sustainable Tourism Certification", year: "2023", org: "Global Sustainable Tourism Council", icon: Star, desc: "Certified sustainable tourism operator" },
  { title: "Georgia Tourism Partner of the Year", year: "2024", org: "Georgia Dept. of Tourism", icon: Trophy, desc: "Outstanding contribution to state tourism" },
  { title: "Viator Experience Award", year: "2023", org: "Viator", icon: Award, desc: "Top-rated experiences on the platform" },
  { title: "GetYourGuide Exceptional", year: "2024", org: "GetYourGuide", icon: Star, desc: "Consistently high traveler satisfaction" },
  { title: "Atlanta Magazine Best Of", year: "2024", org: "Atlanta Magazine", icon: Trophy, desc: "Best Tour Company in Atlanta" },
  { title: "ASTA Verified Member", year: "2024", org: "American Society of Travel Advisors", icon: Award, desc: "Verified professional tour operator" },
];

const AwardsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Awards & Certifications</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {awards.map((award, i) => (
          <motion.div key={award.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="p-4 rounded-2xl bg-card border flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <award.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm">{award.title}</h3>
              <p className="text-xs text-muted-foreground">{award.org} · {award.year}</p>
              <p className="text-xs text-muted-foreground mt-1">{award.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default AwardsPage;
