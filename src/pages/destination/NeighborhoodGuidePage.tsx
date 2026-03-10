import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { MapPin, Train } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const NeighborhoodGuidePage = () => {
  const { getItems } = useMicrositeContent();
  const neighborhoods = getItems("neighborhoods");

  return (
    <DestinationSubPage title="Neighborhood Guide">
      <p className="text-sm text-muted-foreground mb-5">Explore Atlanta's diverse districts and neighborhoods.</p>
      <div className="space-y-4">
        {neighborhoods.map((n) => (
          <div key={n.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {n.image && (
              <img src={n.image} alt={n.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold">{n.name}</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{n.vibe}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.description}</p>
              {n.highlights && (
                <p className="text-xs text-foreground mt-2"><span className="font-medium">Highlights:</span> {n.highlights}</p>
              )}
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                {n.gettingThere && <span className="flex items-center gap-1"><Train className="w-3 h-3" />{n.gettingThere}</span>}
                {n.bestFor && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Best for: {n.bestFor}</span>}
              </div>
            </div>
          </div>
        ))}
        {neighborhoods.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No neighborhoods added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default NeighborhoodGuidePage;
