import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Leaf, Hotel, TreePine, Footprints, Recycle, Wind, Droplets, Sun } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const greenHotels = [
  { name: "1 Hotel Atlanta (concept)", rating: 4.8, cert: "LEED Platinum", carbon: "Low", desc: "Nature-inspired luxury with rooftop garden and zero-waste dining." },
  { name: "The Burgess Hotel", rating: 4.7, cert: "Green Key", carbon: "Medium", desc: "Eco-conscious boutique with EV charging and rainwater collection." },
  { name: "Bellyard Hotel", rating: 4.5, cert: "EarthCheck", carbon: "Low", desc: "Urban resort using 100% renewable energy sources." },
];

const ecoTours = [
  { name: "Atlanta BeltLine Bike Tour", type: "Cycling", duration: "3 hours", impact: "Zero emission", icon: Footprints },
  { name: "Chattahoochee River Kayak", type: "Water", duration: "4 hours", impact: "Zero emission", icon: Droplets },
  { name: "Piedmont Park Nature Walk", type: "Walking", duration: "2 hours", impact: "Zero emission", icon: TreePine },
  { name: "Stone Mountain Eco Hike", type: "Hiking", duration: "5 hours", impact: "Low emission", icon: Wind },
];

const carbonMetrics = [
  { label: "Avg. Visitor Carbon Footprint", value: "2.4 tons CO₂", benchmark: "US avg: 4.1 tons", pct: 58 },
  { label: "Green Transport Usage", value: "34%", benchmark: "Target: 50%", pct: 68 },
  { label: "Eco-Certified Businesses", value: "42 / 184", benchmark: "23% of listings", pct: 23 },
  { label: "Renewable Energy Hotels", value: "8 / 24", benchmark: "33% of stays", pct: 33 },
];

const carbonColor = (pct: number) => {
  if (pct <= 30) return "text-aura-success";
  if (pct <= 60) return "text-aura-warning";
  return "text-destructive";
};

const SustainabilityPage = () => (
  <DestinationSubPage title="Sustainability">
    {/* Hero */}
    <div className="rounded-2xl bg-aura-success/5 border border-aura-success/20 p-5 mb-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-aura-success/10 flex items-center justify-center mx-auto mb-3">
        <Leaf className="w-7 h-7 text-aura-success" />
      </div>
      <h2 className="font-display text-lg font-bold mb-1">Sustainable Atlanta</h2>
      <p className="text-xs text-muted-foreground max-w-xs mx-auto">
        Explore eco-friendly travel options and track the environmental impact of tourism in Atlanta.
      </p>
    </div>

    {/* Carbon Impact Indicators */}
    <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
      <Recycle className="w-4 h-4 text-aura-success" /> Carbon Impact
    </h3>
    <div className="grid grid-cols-2 gap-3 mb-8">
      {carbonMetrics.map((m) => (
        <div key={m.label} className="p-4 rounded-2xl bg-card border shadow-sm">
          <div className={`text-lg font-display font-bold ${carbonColor(m.pct)}`}>{m.value}</div>
          <div className="text-xs font-medium mt-0.5">{m.label}</div>
          <Progress value={m.pct} className="h-1.5 mt-2 mb-1" />
          <div className="text-[10px] text-muted-foreground">{m.benchmark}</div>
        </div>
      ))}
    </div>

    {/* Green Hotels */}
    <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
      <Hotel className="w-4 h-4 text-aura-success" /> Green Hotels
    </h3>
    <div className="space-y-3 mb-8">
      {greenHotels.map((h) => (
        <div key={h.name} className="p-4 rounded-2xl bg-card border shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-display font-semibold text-sm">{h.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">⭐ {h.rating}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-aura-success/15 text-aura-success">{h.cert}</span>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              h.carbon === "Low" ? "bg-aura-success/15 text-aura-success" : "bg-aura-warning/15 text-aura-warning"
            }`}>
              {h.carbon} Carbon
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{h.desc}</p>
        </div>
      ))}
    </div>

    {/* Eco Tours */}
    <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
      <TreePine className="w-4 h-4 text-aura-success" /> Eco Tours & Activities
    </h3>
    <div className="space-y-3">
      {ecoTours.map((t) => (
        <div key={t.name} className="p-4 rounded-2xl bg-card border shadow-sm flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-aura-success/10 flex items-center justify-center shrink-0">
            <t.icon className="w-5 h-5 text-aura-success" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{t.name}</h4>
            <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
              <span>{t.type}</span>
              <span>{t.duration}</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-aura-success/15 text-aura-success self-start shrink-0">
            {t.impact}
          </span>
        </div>
      ))}
    </div>
  </DestinationSubPage>
);

export default SustainabilityPage;
