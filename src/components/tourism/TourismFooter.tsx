import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const TourismFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3">Visit Dallas</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Discover everything the Big D has to offer — world-class dining, iconic attractions, vibrant culture, and unforgettable experiences.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 text-primary-foreground/60">Explore</h4>
            <ul className="space-y-2 text-sm">
              {["Things to Do", "Eat & Drink", "Where to Stay", "Events", "Neighborhoods"].map((item) => (
                <li key={item}>
                  <Link to="/dallas/attractions" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 text-primary-foreground/60">Plan Your Trip</h4>
            <ul className="space-y-2 text-sm">
              {["World Cup 2026", "Trip Ideas", "Getting Around", "Deals & Offers", "Visitor Guide"].map((item) => (
                <li key={item}>
                  <Link to="/dallas/worldcup" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 text-primary-foreground/60">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                325 N St Paul St, Suite 700, Dallas, TX 75201
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="w-4 h-4 shrink-0" />
                (214) 571-1000
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="w-4 h-4 shrink-0" />
                info@visitdallas.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/50">© 2026 Visit Dallas. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground/70">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground/70">Terms of Use</a>
            <a href="#" className="hover:text-primary-foreground/70">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TourismFooter;
