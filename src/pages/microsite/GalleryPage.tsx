import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const photos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  likes: Math.floor(Math.random() * 200) + 10,
  height: [140, 180, 160, 200, 150, 170, 190, 145, 175, 155, 185, 165][i],
}));

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Travel Gallery</h1>
        <span className="text-xs text-muted-foreground ml-auto">1,248 photos</span>
      </div>

      <div className="mx-4 mt-4 p-3 rounded-2xl bg-aura-warning/10 border border-aura-warning/20 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-aura-warning" />
        <span className="text-sm font-medium">Top Contributor: @travel_sarah</span>
        <span className="text-xs text-muted-foreground ml-auto">42 photos</span>
      </div>

      <div className="px-4 mt-4 columns-3 gap-2 space-y-2">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="relative rounded-xl overflow-hidden bg-muted break-inside-avoid"
            style={{ height: photo.height }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <Heart className="w-3 h-3 text-background fill-background" />
              <span className="text-xs text-background font-medium">{photo.likes}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default GalleryPage;
