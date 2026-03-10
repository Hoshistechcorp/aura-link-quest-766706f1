import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import BottomBrandBar from "./BottomBrandBar";

interface Props {
  title: string;
  children: ReactNode;
}

const DestinationSubPage = ({ title, children }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display font-bold text-lg">{title}</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-5">
        {children}
      </motion.div>
      <BottomBrandBar />
    </div>
  );
};

export default DestinationSubPage;
