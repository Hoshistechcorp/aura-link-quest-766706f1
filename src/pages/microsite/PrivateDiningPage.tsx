import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, Sparkles, Crown, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import cellarImg from "@/assets/private-dining-cellar.jpg";
import terraceImg from "@/assets/private-dining-terrace.jpg";
import salonImg from "@/assets/private-dining-salon.jpg";

const experiences = [
  { name: "Sunset Helicopter Tour", capacity: "2–6 guests", desc: "Soar above Atlanta's skyline at golden hour with champagne service", icon: Sparkles, image: terraceImg },
  { name: "Private Civil Rights Tour", capacity: "4–12 guests", desc: "Exclusive guided tour of MLK Center, Ebenezer Church, and historic sites", icon: Crown, image: cellarImg },
  { name: "VIP Food & Wine Safari", capacity: "6–20 guests", desc: "Chauffeured culinary journey through Atlanta's best restaurants and vineyards", icon: Users, image: salonImg },
];

const PrivateDiningPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">VIP Experiences</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        <p className="text-sm text-muted-foreground">Exclusive, private experiences curated for discerning travelers.</p>
        {experiences.map((exp, i) => (
          <motion.div key={exp.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card border overflow-hidden">
            <img src={exp.image} alt={exp.name} className="w-full h-40 object-cover" loading="lazy" />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <exp.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{exp.name}</h3>
                  <span className="text-xs text-muted-foreground">{exp.capacity}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{exp.desc}</p>
              <button className="w-full mt-2 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                <Calendar className="w-3.5 h-3.5 inline mr-1.5" />Book Experience
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default PrivateDiningPage;
