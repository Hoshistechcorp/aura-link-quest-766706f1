import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { MapPin, Clock, Zap } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const NatureParksPage = () => {
  const { getItems } = useMicrositeContent();
  const spots = getItems("nature");

  return (
    <DestinationSubPage title="Nature & Parks">
      <p className="text-sm text-muted-foreground mb-5">National parks, trails, waterways, and outdoor recreation.</p>
      <div className="space-y-4">
        {spots.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {s.image && (
              <img src={s.image} alt={s.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs font-medium text-aura-success bg-aura-success/10 px-2 py-1 rounded-lg">{s.category}</span>
              <h3 className="font-display font-semibold mt-2">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {s.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.address}</span>}
                {s.hours && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.hours}</span>}
                {s.difficulty && s.difficulty !== "N/A" && <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{s.difficulty}</span>}
                {s.admission && <span className="font-medium text-primary">{s.admission}</span>}
              </div>
            </div>
          </div>
        ))}
        {spots.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No parks added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default NatureParksPage;
