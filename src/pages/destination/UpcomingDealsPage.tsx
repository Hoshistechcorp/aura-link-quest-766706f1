import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Calendar, Tag } from "lucide-react";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const UpcomingDealsPage = () => {
  const { getItems } = useMicrositeContent();
  const deals = getItems("deals");

  return (
    <DestinationSubPage title="Upcoming Deals">
      <p className="text-sm text-muted-foreground mb-5">Tourism promotions, hotel discounts, and travel packages.</p>
      <div className="space-y-4">
        {deals.map((d) => (
          <div key={d.id} className="rounded-2xl bg-card border shadow-sm overflow-hidden">
            {d.image && (
              <img src={d.image} alt={d.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold">{d.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-aura-success/15 text-aura-success text-xs font-bold shrink-0">{d.discount}</span>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{d.type}</span>
              <p className="text-sm text-muted-foreground mt-2">{d.description}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                {d.validUntil && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Expires: {new Date(d.validUntil).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
                {d.code && (
                  <span className="flex items-center gap-1 font-mono text-primary">
                    <Tag className="w-3 h-3" />{d.code}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {deals.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No deals available yet.</div>
        )}
      </div>
    </DestinationSubPage>
  );
};

export default UpcomingDealsPage;
