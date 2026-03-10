import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Star, MapPin, Wifi } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const HotelsStaysPage = () => {
  const { getItems } = useMicrositeContent();
  const hotels = getItems("hotels");

  const handleBook = (name: string) => {
    toast({ title: "Booking requested", description: `Opening booking for ${name}...` });
  };

  const getRatingNum = (r: string) => {
    const match = r?.match(/(\d)/);
    return match ? parseInt(match[1]) : 4;
  };

  return (
    <DestinationSubPage title="Hotels & Stays">
      <p className="text-sm text-muted-foreground mb-5">Hotels, boutique stays, resorts, and vacation rentals in Atlanta.</p>
      <div className="space-y-4">
        {hotels.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {s.image && (
              <img src={s.image} alt={s.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 border-b bg-primary/5 flex items-center justify-between">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{s.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-aura-warning text-aura-warning" />
                <span className="text-sm font-medium">{getRatingNum(s.rating)}.0</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display font-semibold">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                {s.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.address}</span>}
                <span className="flex items-center gap-1"><Wifi className="w-3 h-3" />Free WiFi</span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-sm font-bold text-primary">{s.priceRange}</span>
                <button
                  onClick={() => handleBook(s.name)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {hotels.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No hotels added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default HotelsStaysPage;
