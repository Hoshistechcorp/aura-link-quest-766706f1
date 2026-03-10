import { MapPin, BadgeCheck, Shield, Hotel, Train, ExternalLink } from "lucide-react";
import coverImage from "@/assets/destination-cover.jpg";
import logoImage from "@/assets/destination-logo.png";

const DestinationHeader = () => (
  <div className="relative">
    <div className="h-48 overflow-hidden">
      <img src={coverImage} alt="Atlanta skyline at golden hour" className="w-full h-full object-cover" />
      <div className="absolute inset-0 h-48 bg-gradient-to-b from-transparent to-background/80" />
    </div>

    <div className="relative px-4 -mt-12">
      <div className="flex items-end gap-3">
        <img
          src={logoImage}
          alt="Meridian Tours logo"
          className="w-20 h-20 rounded-2xl border-4 border-background shadow-lg object-cover bg-card"
        />
        <div className="pb-1 flex-1">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-display font-bold">Meridian Tours</h1>
            <BadgeCheck className="w-5 h-5 text-aura-info" />
            <Shield className="w-4 h-4 text-aura-success" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Explore Atlanta · Georgia, USA</p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-sm font-medium flex items-center gap-1">⭐ 4.9 <span className="text-xs text-muted-foreground">traveler rating</span></span>
            <span className="text-sm font-medium flex items-center gap-1">🗺️ 50+ <span className="text-xs text-muted-foreground">curated tours</span></span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Curated Tours, Local Experiences & Destination Management.
      </p>
      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span>Atlanta, Georgia, USA</span>
      </div>
      <div className="flex gap-1.5 mt-2 flex-wrap">
        <span className="aura-badge aura-badge-gold">🏆 Top Operator</span>
        <span className="aura-badge aura-badge-success">🌍 Licensed DMC</span>
        <span className="aura-badge aura-badge-info">✈️ 50+ Tours</span>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
        <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0">
          <Hotel className="w-3.5 h-3.5" /> Book Hotels
        </a>
        <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0">
          <Train className="w-3.5 h-3.5" /> Transportation
        </a>
        <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0">
          <ExternalLink className="w-3.5 h-3.5" /> Official Site
        </a>
      </div>
    </div>
  </div>
);

export default DestinationHeader;
