import { useState } from "react";
import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Compass, Sun, Umbrella, Leaf, MapPin, Save, Share2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const itineraries = [
  {
    title: "3-Day Atlanta Essentials",
    days: [
      { day: 1, label: "Day 1 — Downtown", items: ["Georgia Aquarium", "World of Coca-Cola", "Centennial Olympic Park", "Dinner at Ponce City Market"] },
      { day: 2, label: "Day 2 — History & Culture", items: ["MLK National Historic Park", "Sweet Auburn Market", "Fox Theatre Tour", "Dinner at Staplehouse"] },
      { day: 3, label: "Day 3 — BeltLine & Arts", items: ["Atlanta BeltLine walk", "Krog Street Market brunch", "High Museum of Art", "Midtown dining"] },
    ],
  },
  {
    title: "Foodie Weekend",
    days: [
      { day: 1, label: "Day 1 — Southern Flavors", items: ["Buford Highway food crawl", "Sweet Auburn Market", "Fox Bros. BBQ"] },
      { day: 2, label: "Day 2 — Fine Dining", items: ["Krog Street Market brunch", "Staplehouse dinner", "Ponce City rooftop drinks"] },
    ],
  },
  {
    title: "Family Fun Week",
    days: [
      { day: 1, label: "Day 1", items: ["Zoo Atlanta", "Children's Museum of Atlanta"] },
      { day: 2, label: "Day 2", items: ["Georgia Aquarium", "Centennial Olympic Park fountain"] },
      { day: 3, label: "Day 3", items: ["Stone Mountain Park", "Legoland Discovery Center"] },
    ],
  },
];

const tips = [
  { icon: Sun, title: "Best Time to Visit", desc: "Spring (Mar–May) and Fall (Sep–Nov) offer mild weather and outdoor festivals." },
  { icon: Umbrella, title: "Weather Tip", desc: "Summers are hot and humid (90°F+). Carry water and sunscreen for outdoor activities." },
  { icon: Leaf, title: "Getting Around", desc: "MARTA connects airport to downtown. Rideshare and BeltLine bikes cover most neighborhoods." },
  { icon: Compass, title: "Local Tip", desc: "Many attractions offer free admission on certain days. Check Atlanta CityPASS for bundles." },
];

const PlanYourTripPage = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  const toggleExpand = (i: number) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const handleSave = (title: string) => {
    toast({ title: "Itinerary saved! 📋", description: title });
  };

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(`Check out this Atlanta itinerary: ${title}`);
    toast({ title: "Link copied!", description: "Share this trip plan with friends." });
  };

  return (
    <DestinationSubPage title="Plan Your Trip">
      <p className="text-sm text-muted-foreground mb-5">Suggested itineraries, day plans, and travel tips for Atlanta.</p>

      {/* Map Preview */}
      <div className="rounded-2xl bg-muted/50 border p-4 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-semibold text-sm">Interactive Map</h4>
          <p className="text-xs text-muted-foreground">View all attractions, restaurants, and hotels on the map.</p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shrink-0">
          Open Map
        </button>
      </div>

      {/* Itineraries with Day Planner */}
      <h3 className="font-display font-semibold mb-3">Suggested Itineraries</h3>
      <div className="space-y-4 mb-8">
        {itineraries.map((it, idx) => (
          <div key={it.title} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            <button
              onClick={() => toggleExpand(idx)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <h4 className="font-semibold text-sm">{it.title}</h4>
              {expanded[idx] ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            {expanded[idx] && (
              <div className="px-4 pb-4">
                {it.days.map((d) => (
                  <div key={d.day} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{d.day}</div>
                      <span className="text-xs font-medium text-muted-foreground">{d.label}</span>
                    </div>
                    <div className="ml-8 space-y-1">
                      {d.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <button
                    onClick={() => handleSave(it.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Itinerary
                  </button>
                  <button
                    onClick={() => handleShare(it.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Travel Tips */}
      <h3 className="font-display font-semibold mb-3">Travel Tips</h3>
      <div className="space-y-3">
        {tips.map((t) => (
          <div key={t.title} className="p-4 rounded-2xl bg-card border shadow-sm flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-aura-info/10 flex items-center justify-center shrink-0">
              <t.icon className="w-5 h-5 text-aura-info" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t.title}</h4>
              <p className="text-sm text-muted-foreground mt-0.5">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </DestinationSubPage>
  );
};

export default PlanYourTripPage;
