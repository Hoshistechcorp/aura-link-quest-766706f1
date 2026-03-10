import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AuraCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  delay?: number;
  color?: string;
}

const AuraCard = ({ icon: Icon, title, subtitle, onClick, delay = 0, color }: AuraCardProps) => {
  return (
    <motion.div
      className="aura-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.96 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color ? `${color}15` : 'hsl(var(--primary) / 0.1)' }}
      >
        <Icon className="w-5 h-5" style={{ color: color || 'hsl(var(--primary))' }} />
      </div>
      <span className="aura-card-title">{title}</span>
      {subtitle && <span className="aura-card-desc">{subtitle}</span>}
    </motion.div>
  );
};

export default AuraCard;
