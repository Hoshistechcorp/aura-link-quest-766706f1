import { useState } from "react";
import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const EventsFestivalsPage = () => {
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const { getItems } = useMicrositeContent();
  const events = getItems("events");

  const toggleRsvp = (name: string) => {
    setRsvps((prev) => ({ ...prev, [name]: !prev[name] }));
    toast({ title: rsvps[name] ? "RSVP cancelled" : "RSVP confirmed! 🎉", description: name });
  };

  return (
    <DestinationSubPage title="Events & Festivals">
      <p className="text-sm text-muted-foreground mb-5">Festivals, concerts, sports, and cultural celebrations happening in Atlanta.</p>
      <div className="space-y-4">
        {events.map((e) => (
          <div key={e.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {e.image && (
              <img src={e.image} alt={e.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 border-b bg-primary/5">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{e.category}</span>
            </div>

            <div className="p-4">
              <h3 className="font-display font-semibold">{e.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{e.description}</p>

              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {e.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
                {e.venue && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.venue}</span>}
                {e.price && <span className="font-medium text-primary">{e.price === "Free" ? "Free" : `$${e.price}`}</span>}
              </div>

              <button
                onClick={() => toggleRsvp(e.name)}
                className={`mt-3 w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  rsvps[e.name]
                    ? "bg-aura-success/15 text-aura-success"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {rsvps[e.name] ? <><CheckCircle2 className="w-4 h-4" /> RSVP Confirmed</> : "RSVP Now"}
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No events scheduled yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default EventsFestivalsPage;
