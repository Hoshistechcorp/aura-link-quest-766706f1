import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const ActionButton = ({ icon: Icon, label, onClick }: ActionButtonProps) => {
  return (
    <button className="aura-action-btn" onClick={onClick}>
      <span className="icon-wrap">
        <Icon className="w-4 h-4" />
      </span>
      <span className="text-muted-foreground">{label}</span>
    </button>
  );
};

export default ActionButton;
