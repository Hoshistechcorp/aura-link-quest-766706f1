import { useState } from "react";
import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Camera, Upload, Heart, TrendingUp, Crown, Image } from "lucide-react";

import imgBeltline from "@/assets/photo-beltline.jpg";
import imgOlympic from "@/assets/photo-olympic.jpg";

const trendingPhotos = [
  { img: imgBeltline, caption: "Autumn on the BeltLine 🍂", likes: 342, user: "Sarah M." },
  { img: imgOlympic, caption: "Centennial Park fountain ⛲", likes: 289, user: "James K." },
  { img: imgBeltline, caption: "Street art vibes 🎨", likes: 215, user: "Nina P." },
  { img: imgOlympic, caption: "Skyline views 🌆", likes: 198, user: "Elena R." },
  { img: imgBeltline, caption: "Morning walk ATL 🌅", likes: 176, user: "Marcus D." },
  { img: imgOlympic, caption: "Park life ☀️", likes: 154, user: "Ava T." },
];

const topContributors = [
  { name: "Sarah M.", photos: 47, likes: 2340, rank: 1 },
  { name: "James K.", photos: 38, likes: 1890, rank: 2 },
  { name: "Nina P.", photos: 31, likes: 1560, rank: 3 },
  { name: "Elena R.", photos: 28, likes: 1420, rank: 4 },
  { name: "Marcus D.", photos: 24, likes: 1180, rank: 5 },
];

const PhotoMemoriesPage = () => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (i: number) => setLiked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <DestinationSubPage title="Photo Memories">
      {/* Upload CTA */}
      <div className="text-center py-6 mb-6 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Camera className="w-7 h-7 text-primary" />
        </div>
        <h2 className="font-display text-lg font-bold mb-1">Share Your Atlanta Moments</h2>
        <p className="text-xs text-muted-foreground mb-4 max-w-xs mx-auto">
          Powered by PicPop — upload your travel photos and see what others are sharing.
        </p>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity">
          <Upload className="w-4 h-4" /> Upload Photos
        </button>
      </div>

      {/* Trending Photos */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold">Trending Photos</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trendingPhotos.map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-card border shadow-sm">
              <div className="relative aspect-square">
                <img src={p.img} alt={p.caption} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-[11px] text-white font-medium truncate">{p.caption}</p>
                </div>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{p.user}</span>
                <button onClick={() => toggleLike(i)} className="flex items-center gap-1 text-[11px]">
                  <Heart className={`w-3.5 h-3.5 ${liked[i] ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                  <span className="text-muted-foreground">{liked[i] ? p.likes + 1 : p.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-aura-warning" />
          <h3 className="font-display font-semibold">Top Contributors</h3>
        </div>
        <div className="space-y-2">
          {topContributors.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-card border">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                c.rank === 1 ? "bg-aura-warning/20 text-aura-warning" :
                c.rank === 2 ? "bg-muted text-muted-foreground" :
                c.rank === 3 ? "bg-secondary/20 text-secondary" :
                "bg-muted text-muted-foreground"
              }`}>
                {c.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.photos} photos · {c.likes.toLocaleString()} likes</div>
              </div>
              <Image className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          <Heart className="w-3 h-3 inline" /> 1,247 photos shared by visitors
        </p>
      </div>
    </DestinationSubPage>
  );
};

export default PhotoMemoriesPage;
