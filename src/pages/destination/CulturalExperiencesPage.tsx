import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Clock, MapPin, Globe } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const CulturalExperiencesPage = () => {
  const { getItems } = useMicrositeContent();
  const experiences = getItems("culture");

  return (
    <DestinationSubPage title="Cultural Experiences">
      <p className="text-sm text-muted-foreground mb-5">Museums, galleries, performing arts, and cultural tours.</p>
      <div className="space-y-4">
        {experiences.map((e) => (
          <div key={e.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {e.image && (
              <img src={e.image} alt={e.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{e.category}</span>
              <h3 className="font-display font-semibold mt-2">{e.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {e.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration}</span>}
                {e.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                {e.price && <span className="font-medium text-primary">{e.price === "Free" ? "Free" : `$${e.price}`}</span>}
              </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No cultural experiences added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default CulturalExperiencesPage;
