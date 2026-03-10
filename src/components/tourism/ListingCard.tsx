import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ListingCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  priceLabel: string;
  description: string;
  tags?: string[];
  linkPrefix: string;
  index?: number;
}

const ListingCard = ({
  id, name, image, category, neighborhood, rating, reviewCount, priceLabel, description, tags, linkPrefix, index = 0,
}: ListingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`${linkPrefix}/${id}`} className="listing-card block group">
        <div className="aspect-[4/3] overflow-hidden relative">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">{category}</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[11px] font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-base leading-tight">{name}</h3>
            <span className="text-sm font-semibold text-secondary shrink-0">{priceLabel}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {neighborhood}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-secondary text-secondary" />
              {rating} ({reviewCount.toLocaleString()})
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
