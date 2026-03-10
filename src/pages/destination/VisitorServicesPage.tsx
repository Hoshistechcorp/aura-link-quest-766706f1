import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Info, Phone, Shield, Globe } from "lucide-react";

const services = [
  { icon: Info, name: "Atlanta Visitor Center", details: "65 Upper Alabama St, Underground Atlanta. Open daily 10am–6pm. Free maps, guides, and trip planning." },
  { icon: Phone, name: "Emergency Services", details: "Dial 911. Non-emergency police: (404) 614-6544. Atlanta Visitor Hotline: 1-800-ATL-TOUR." },
  { icon: Shield, name: "Travel Safety Tips", details: "Stay on well-lit paths at night. Use MARTA for safe transit. Downtown and Midtown are well-patrolled." },
  { icon: Globe, name: "Multilingual Assistance", details: "Visitor center offers guides in Spanish, Mandarin, French, and German. Translation apps recommended." },
];

const VisitorServicesPage = () => (
  <DestinationSubPage title="Visitor Services">
    <p className="text-sm text-muted-foreground mb-5">Visitor centers, travel assistance, and emergency services.</p>
    <div className="space-y-3">
      {services.map((s) => (
        <div key={s.name} className="p-4 rounded-2xl bg-card border shadow-sm flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-aura-info/10 flex items-center justify-center shrink-0">
            <s.icon className="w-5 h-5 text-aura-info" />
          </div>
          <div>
            <h3 className="font-display font-semibold">{s.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.details}</p>
          </div>
        </div>
      ))}
    </div>
  </DestinationSubPage>
);

export default VisitorServicesPage;
