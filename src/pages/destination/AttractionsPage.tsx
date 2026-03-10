import { useState } from "react";
import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { MapPin, Star, Clock, Bookmark, Share2, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const AttractionsPage = () => {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const { getItems } = useMicrositeContent();
  const attractions = getItems("attractions");

  const toggleSave = (name: string) => {
    setSaved((prev) => ({ ...prev, [name]: !prev[name] }));
    toast({ title: saved[name] ? "Removed from saved" : "Saved!", description: name });
  };

  const handleShare = (name: string) => {
    navigator.clipboard?.writeText(`Check out ${name} in Atlanta!`);
    toast({ title: "Link copied!", description: `Share link for ${name} copied to clipboard.` });
  };

  return (
    <DestinationSubPage title="Attractions">
      <p className="text-sm text-muted-foreground mb-5">Discover Atlanta's iconic museums, parks, and historic sites.</p>
      <div className="space-y-4">
        {attractions.map((a) => (
          <div key={a.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {a.image && (
              <img src={a.image} alt={a.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 border-b bg-primary/5">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{a.category}</span>
                {a.price && <span className="text-sm font-bold text-primary">{a.price === "Free" ? "Free" : `$${a.price}`}</span>}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display font-semibold text-sm">{a.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{a.description}</p>

              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                {a.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.address}</span>}
                {a.hours && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.hours}</span>}
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <button
                  onClick={() => toggleSave(a.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    saved[a.name] ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {saved[a.name] ? <Heart className="w-3.5 h-3.5 fill-primary" /> : <Bookmark className="w-3.5 h-3.5" />}
                  {saved[a.name] ? "Saved" : "Save"}
                </button>
                <button
                  onClick={() => handleShare(a.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
        {attractions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No attractions added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default AttractionsPage;
