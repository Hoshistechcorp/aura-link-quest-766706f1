import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Clock, Users, Zap, MapPin } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const ThingsToDoPage = () => {
  const { getItems } = useMicrositeContent();
  const activities = getItems("thingsToDo");

  return (
    <DestinationSubPage title="Things To Do">
      <p className="text-sm text-muted-foreground mb-5">Tours, adventures, nightlife, and shopping — all in one place.</p>
      <div className="space-y-4">
        {activities.map((a) => (
          <div key={a.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {a.image && (
              <img src={a.image} alt={a.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{a.category}</span>
                {a.price && <span className="text-sm font-bold text-primary">${a.price}</span>}
              </div>
              <h3 className="font-display font-semibold mt-2">{a.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {a.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.duration}</span>}
                {a.difficulty && <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{a.difficulty}</span>}
                {a.groupSize && <span className="flex items-center gap-1"><Users className="w-3 h-3" />Max {a.groupSize}</span>}
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No activities added yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default ThingsToDoPage;
