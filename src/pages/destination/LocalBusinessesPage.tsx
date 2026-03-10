import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { MapPin, Phone, Globe, Star } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const LocalBusinessesPage = () => {
  const { getItems } = useMicrositeContent();
  const businesses = getItems("localBusinesses");

  return (
    <DestinationSubPage title="Local Businesses">
      <p className="text-sm text-muted-foreground mb-5">Discover local shops, markets, and craft districts.</p>
      <div className="space-y-4">
        {businesses.map((b) => (
          <div key={b.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {b.image && (
              <img src={b.image} alt={b.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{b.category}</span>
                  <h3 className="font-display font-semibold mt-2">{b.name}</h3>
                </div>
                {b.featured && <Star className="w-4 h-4 fill-aura-warning text-aura-warning" />}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{b.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {b.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.address}</span>}
                {b.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{b.phone}</span>}
                {b.website && (
                  <a href={b.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    <Globe className="w-3 h-3" />Website
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {businesses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No businesses added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default LocalBusinessesPage;
