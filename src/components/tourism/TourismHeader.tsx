import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/dallasData";
import dallasLogo from "@/assets/dallas-logo.png";

const TourismHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dallas" className="flex items-center gap-2">
            <img src={dallasLogo} alt="Visit Dallas" className="h-9 w-9 rounded-lg object-cover" />
            <div className="flex flex-col">
              <span className="text-primary-foreground font-display text-lg font-bold leading-none">Visit Dallas</span>
              <span className="text-primary-foreground/60 text-[10px] leading-none">Official Tourism Site</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + "/");
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "text-primary-foreground/75 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/10 text-primary-foreground/80 text-sm hover:bg-primary-foreground/15 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search</span>
            </button>
            <button className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-xs">
              <Globe className="w-3.5 h-3.5" />
              EN
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-primary border-t border-primary-foreground/10"
          >
            <nav className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-primary-foreground/10 mt-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground/80 text-sm">
                  <Search className="w-3.5 h-3.5" />
                  Search
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-primary-foreground/70 text-sm">
                  <Globe className="w-3.5 h-3.5" />
                  EN
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TourismHeader;
