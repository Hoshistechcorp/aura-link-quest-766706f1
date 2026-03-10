import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Globe, Users } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const LocalCreatorsPage = () => {
  const { getItems } = useMicrositeContent();
  const creators = getItems("creators");

  return (
    <DestinationSubPage title="Local Creators">
      <p className="text-sm text-muted-foreground mb-2">Influencers and creators promoting Atlanta.</p>
      <p className="text-xs text-primary mb-5">Connected to TribeMint affiliate system</p>
      <div className="space-y-4">
        {creators.map((c) => (
          <div key={c.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {c.image && (
              <img src={c.image} alt={c.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold">{c.name}</h3>
                {c.followers && <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{c.followers}</span>}
              </div>
              <div className="flex gap-2 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.platform}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c.niche}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{c.bio}</p>
              {c.profileUrl && (
                <a href={c.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                  <Globe className="w-3 h-3" />View Profile
                </a>
              )}
            </div>
          </div>
        ))}
        {creators.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No creators added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default LocalCreatorsPage;
