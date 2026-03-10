import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Globe, MapPin } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const TransportationPage = () => {
  const { getItems } = useMicrositeContent();
  const options = getItems("transportation");

  return (
    <DestinationSubPage title="Transportation">
      <p className="text-sm text-muted-foreground mb-5">Getting to and around Atlanta.</p>
      <div className="space-y-4">
        {options.map((o) => (
          <div key={o.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {o.image && (
              <img src={o.image} alt={o.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{o.type}</span>
              <h3 className="font-display font-semibold text-sm mt-2">{o.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{o.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {o.price && <span className="font-medium text-primary">{o.price}</span>}
                {o.coverage && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{o.coverage}</span>}
                {o.website && (
                  <a href={o.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    <Globe className="w-3 h-3" />Website
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {options.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No transport options added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default TransportationPage;
