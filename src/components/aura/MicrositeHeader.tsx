import { MapPin, Star, BadgeCheck, Shield } from "lucide-react";
import coverImage from "@/assets/destination-cover.jpg";
import logoImage from "@/assets/destination-logo.png";

const MicrositeHeader = () => {
  return (
    <div className="relative">
      {/* Cover */}
      <div className="h-48 overflow-hidden">
        <img src={coverImage} alt="Atlanta skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 h-48 bg-gradient-to-b from-transparent to-background/80" />
      </div>

      {/* Profile */}
      <div className="relative px-4 -mt-12">
        <div className="flex items-end gap-3">
          <img
            src={logoImage}
            alt="Meridian Tours logo"
            className="w-20 h-20 rounded-2xl border-4 border-background shadow-lg object-cover"
          />
          <div className="pb-1 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-display font-bold">Meridian Tours</h1>
              <BadgeCheck className="w-5 h-5 text-aura-info" />
              <Shield className="w-4 h-4 text-aura-success" />
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-aura-warning text-aura-warning" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-xs text-muted-foreground">(1,284 traveler reviews)</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Atlanta's Premier Tour Operator & DMC · Est. 2012
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>Atlanta, Georgia, USA</span>
        </div>
      </div>
    </div>
  );
};

export default MicrositeHeader;
