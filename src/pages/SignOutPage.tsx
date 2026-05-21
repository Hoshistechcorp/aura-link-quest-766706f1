import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Compass, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import coastImg from "@/assets/auth-coast.jpg";

const SignOutPage = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const goodbyeName = user?.name?.split(" ")[0];

  useEffect(() => {
    // Ensure session is cleared
    signOut();
  }, [signOut]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-6">
      {/* Background image */}
      <img
        src={coastImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", duration: 0.7 }}
          className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 backdrop-blur"
        >
          <Compass className="w-8 h-8 text-primary" />
        </motion.div>

        <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
          See you soon
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4 leading-tight">
          {goodbyeName ? `Safe travels, ${goodbyeName}.` : "Safe travels."}
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          You've been signed out. The world is still waiting — come back any time to keep building memorable journeys.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/auth", { state: { mode: "signin" } })}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <LogIn className="w-4 h-4" />
            Sign back in
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border bg-card hover:bg-muted transition text-sm font-medium w-full sm:w-auto"
          >
            Back to home
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground mt-10">
          Meridian Tours · Tour Operator & Destination Management
        </p>
      </motion.div>
    </div>
  );
};

export default SignOutPage;
