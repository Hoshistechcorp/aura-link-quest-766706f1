import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Plus, Pencil, Trash2, ExternalLink, Copy, Check, X,
  Globe, Phone, Clock, Link2, ChevronRight, Building2, Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  slug: string;
  status: "active" | "draft";
  visitors: number;
  reviews: number;
  rating: number;
}

const defaultLocations: Location[] = [
  {
    id: "1", name: "Bella Vista — Downtown", address: "123 Grand Ave, New York, NY 10001",
    phone: "+1 (212) 555-0147", hours: "11am – 11pm", slug: "bella-vista-downtown",
    status: "active", visitors: 12840, reviews: 342, rating: 4.8,
  },
  {
    id: "2", name: "Bella Vista — Midtown", address: "456 Park Ave, New York, NY 10022",
    phone: "+1 (212) 555-0299", hours: "11am – 10pm", slug: "bella-vista-midtown",
    status: "active", visitors: 8620, reviews: 198, rating: 4.6,
  },
  {
    id: "3", name: "Bella Vista — Brooklyn", address: "789 Atlantic Ave, Brooklyn, NY 11217",
    phone: "+1 (718) 555-0381", hours: "12pm – 11pm", slug: "bella-vista-brooklyn",
    status: "draft", visitors: 0, reviews: 0, rating: 0,
  },
];

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Location>>({});

  const baseUrl = "auralink.app/m/";

  const handleCopyLink = (slug: string) => {
    navigator.clipboard.writeText(`${baseUrl}${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
    toast({ title: "Link copied!", description: `${baseUrl}${slug}` });
  };

  const handleSave = (id: string) => {
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...form } : l)));
    setEditing(null);
    setForm({});
    toast({ title: "Location updated" });
  };

  const handleAdd = () => {
    const newLoc: Location = {
      id: String(Date.now()),
      name: form.name || "New Location",
      address: form.address || "",
      phone: form.phone || "",
      hours: form.hours || "9am – 9pm",
      slug: form.slug || `location-${locations.length + 1}`,
      status: "draft",
      visitors: 0, reviews: 0, rating: 0,
    };
    setLocations((prev) => [...prev, newLoc]);
    setShowAdd(false);
    setForm({});
    toast({ title: "Location added", description: "New location created as draft." });
  };

  const handleDelete = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
    toast({ title: "Location removed" });
  };

  const activeCount = locations.filter((l) => l.status === "active").length;
  const totalVisitors = locations.reduce((s, l) => s + l.visitors, 0);

  return (
    <DashboardLayout title="Locations" subtitle="Manage your franchise locations & microsite links">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Locations", value: locations.length, icon: Building2 },
          { label: "Active", value: activeCount, icon: Globe },
          { label: "Total Visitors", value: totalVisitors.toLocaleString(), icon: Eye },
          { label: "Avg Rating", value: (locations.filter((l) => l.rating > 0).reduce((s, l) => s + l.rating, 0) / (activeCount || 1)).toFixed(1), icon: MapPin },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl bg-card border"
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">All Locations</h3>
        <button
          onClick={() => { setShowAdd(true); setForm({}); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
              <h4 className="font-medium mb-4">New Location</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Location Name</label>
                  <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Bella Vista — Uptown" className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Microsite URL Slug</label>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-1">{baseUrl}</span>
                    <input value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="bella-vista-uptown" className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Address</label>
                  <input value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, City, State ZIP" className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
                  <input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-muted text-sm font-medium">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Create Location</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Cards */}
      <div className="space-y-3">
        {locations.map((loc, i) => {
          const isEditing = editing === loc.id;

          return (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-5 rounded-2xl border transition-all ${isEditing ? "bg-primary/5 border-primary/30" : "bg-card hover:border-primary/20"}`}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Name</label>
                      <input value={form.name ?? loc.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">URL Slug</label>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-1">{baseUrl}</span>
                        <input value={form.slug ?? loc.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Address</label>
                      <input value={form.address ?? loc.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
                      <input value={form.phone ?? loc.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Hours</label>
                      <input value={form.hours ?? loc.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                      <div className="flex gap-2">
                        {(["active", "draft"] as const).map((s) => (
                          <button key={s} onClick={() => setForm({ ...form, status: s })} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${(form.status ?? loc.status) === s ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"}`}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setEditing(null); setForm({}); }} className="p-2 rounded-lg bg-muted"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleSave(loc.id)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Save</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${loc.status === "active" ? "bg-primary/10" : "bg-muted"}`}>
                      <MapPin className={`w-5 h-5 ${loc.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{loc.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${loc.status === "active" ? "bg-aura-success/10 text-aura-success" : "bg-muted text-muted-foreground"}`}>
                          {loc.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{loc.address}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Link2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-mono text-primary">{baseUrl}{loc.slug}</span>
                      </div>
                    </div>
                  </div>

                  {loc.status === "active" && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="text-center">
                        <div className="font-semibold text-foreground text-sm">{loc.visitors.toLocaleString()}</div>
                        <div>visitors</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-foreground text-sm">{loc.reviews}</div>
                        <div>reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-foreground text-sm">{loc.rating}</div>
                        <div>rating</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleCopyLink(loc.slug)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Copy link">
                      {copiedSlug === loc.slug ? <Check className="w-4 h-4 text-aura-success" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    <button onClick={() => { setEditing(loc.id); setForm({}); }} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => handleDelete(loc.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 p-5 rounded-2xl bg-card border">
        <h3 className="font-display font-semibold mb-2">Multi-Location Tips</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Each location gets a unique microsite URL for sharing and QR codes</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Switch locations in the dashboard header to manage cards, settings, and analytics per location</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Team members can be assigned roles per location for granular access control</li>
          <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Upgrade to Premium or Enterprise for more location slots and cross-location analytics</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default LocationsPage;
