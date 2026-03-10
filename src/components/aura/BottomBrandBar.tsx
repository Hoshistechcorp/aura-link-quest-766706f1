import { useState } from "react";
import { QrCode, Link as LinkIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BottomBrandBar = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="border-t bg-card px-4 py-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQR(true)}
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Show QR Code"
            >
              <QrCode className="w-5 h-5 text-primary" />
            </button>
            <div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <LinkIcon className="w-3 h-3" />
                <span>meridiantours.com/atlanta</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Powered by <span className="font-display text-primary">Meridian Tours</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-card rounded-3xl p-6 max-w-xs w-full shadow-2xl border relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-4">
                <h3 className="font-display text-lg font-semibold">Scan to Explore</h3>
                <p className="text-xs text-muted-foreground">Point your camera at the QR code to explore Meridian Tours Atlanta</p>

                <div className="mx-auto w-48 h-48 bg-background rounded-2xl border-2 border-primary/20 p-3 flex items-center justify-center">
                  <svg viewBox="0 0 256 256" className="w-full h-full">
                    <rect width="256" height="256" fill="white" />
                    <rect x="16" y="16" width="56" height="56" fill="hsl(var(--primary))" />
                    <rect x="24" y="24" width="40" height="40" fill="white" />
                    <rect x="32" y="32" width="24" height="24" fill="hsl(var(--primary))" />
                    <rect x="184" y="16" width="56" height="56" fill="hsl(var(--primary))" />
                    <rect x="192" y="24" width="40" height="40" fill="white" />
                    <rect x="200" y="32" width="24" height="24" fill="hsl(var(--primary))" />
                    <rect x="16" y="184" width="56" height="56" fill="hsl(var(--primary))" />
                    <rect x="24" y="192" width="40" height="40" fill="white" />
                    <rect x="32" y="200" width="24" height="24" fill="hsl(var(--primary))" />
                    {[
                      [88,16],[96,16],[112,16],[128,16],[144,16],[160,16],
                      [88,24],[120,24],[152,24],
                      [88,32],[96,32],[104,32],[112,32],[128,32],[136,32],[152,32],[160,32],
                      [88,40],[128,40],[160,40],
                      [88,48],[96,48],[112,48],[120,48],[136,48],[144,48],[160,48],
                      [88,56],[128,56],
                      [16,88],[24,88],[32,88],[48,88],[56,88],[88,88],[104,88],[120,88],[136,88],[152,88],[168,88],[184,88],[200,88],[216,88],[232,88],
                      [16,96],[48,96],[72,96],[96,96],[128,96],[160,96],[192,96],[224,96],
                      [24,104],[40,104],[56,104],[80,104],[104,104],[120,104],[144,104],[168,104],[184,104],[208,104],[232,104],
                      [184,184],[200,184],[216,184],[232,184],
                      [184,192],[216,192],
                      [184,200],[192,200],[200,200],[208,200],[224,200],[232,200],
                      [184,208],[224,208],
                      [184,216],[192,216],[200,216],[208,216],[216,216],[224,216],[232,216],
                    ].map(([x, y], i) => (
                      <rect key={i} x={x} y={y} width="8" height="8" fill="hsl(var(--primary))" />
                    ))}
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Meridian Tours — Atlanta</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <LinkIcon className="w-3 h-3" />
                    <span>meridiantours.com/atlanta</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomBrandBar;
