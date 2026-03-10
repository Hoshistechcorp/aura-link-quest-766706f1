import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, Copy, UtensilsCrossed, CalendarDays, Users, Smartphone, Check } from "lucide-react";
import DashboardLayout from "@/components/aura/DashboardLayout";

const qrTypes = [
  { id: "main", label: "Main Page", icon: Smartphone, desc: "Link to your AuraLink page", scans: 1284, color: "bg-primary/10 text-primary" },
  { id: "table", label: "Table QR", icon: QrCode, desc: "Menu access per table", scans: 892, color: "bg-aura-gold/20 text-secondary" },
  { id: "menu", label: "Menu QR", icon: UtensilsCrossed, desc: "Direct to menu card", scans: 2103, color: "bg-aura-success/15 text-aura-success" },
  { id: "event", label: "Event QR", icon: CalendarDays, desc: "Event-specific landing", scans: 347, color: "bg-aura-info/15 text-aura-info" },
  { id: "staff", label: "Staff QR", icon: Users, desc: "Staff profile & tipping", scans: 156, color: "bg-aura-warning/15 text-aura-warning" },
];

const downloadFormats = ["PNG", "SVG", "PDF"];

const QRManagement = () => {
  const [selected, setSelected] = useState("main");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedQR = qrTypes.find((q) => q.id === selected)!;

  return (
    <DashboardLayout title="QR Codes" subtitle="Generate & manage your QR codes">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* QR Type List */}
        <div className="lg:col-span-2 space-y-3">
          {qrTypes.map((qr, i) => (
            <motion.button
              key={qr.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(qr.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                selected === qr.id ? "bg-primary/5 border-primary/30 shadow-sm" : "bg-card hover:bg-muted/50"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${qr.color}`}>
                <qr.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{qr.label}</div>
                <div className="text-xs text-muted-foreground">{qr.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{qr.scans.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">scans</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* QR Preview & Actions */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-card border text-center">
            <div className="w-48 h-48 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
              <div className="relative">
                {/* Simulated QR pattern */}
                <div className="w-36 h-36 grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[2px] ${
                        Math.random() > 0.4 ? "bg-foreground" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-lg bg-card border-2 border-primary flex items-center justify-center">
                    <selectedQR.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-display font-semibold mb-1">{selectedQR.label}</h3>
            <p className="text-xs text-muted-foreground mb-4">{selectedQR.desc}</p>

            {/* URL Copy */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-muted text-xs mb-4">
              <span className="flex-1 truncate text-left text-muted-foreground">
                auralink.io/bv/{selected}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 w-7 h-7 rounded-lg bg-card border flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-aura-success" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Download Buttons */}
            <div className="flex gap-2">
              {downloadFormats.map((fmt) => (
                <button
                  key={fmt}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Download className="w-3 h-3" />
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 rounded-2xl bg-card border">
            <h4 className="text-sm font-medium mb-3">Scan Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Today</span>
                <span className="font-medium">47 scans</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-medium">312 scans</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">All Time</span>
                <span className="font-medium">{selectedQR.scans.toLocaleString()} scans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QRManagement;
