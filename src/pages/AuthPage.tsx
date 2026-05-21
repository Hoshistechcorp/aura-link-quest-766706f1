import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type Mode = "signin" | "signup";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const initial = (location.state as { mode?: Mode })?.mode || "signin";
  const [mode, setMode] = useState<Mode>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      toast({ title: "Missing fields", description: "Fill in all required fields." });
      return;
    }
    setBusy(true);
    try {
      const user =
        mode === "signin"
          ? await signIn(email, password)
          : await signUp(email, password, name);
      toast({ title: mode === "signin" ? "Welcome back" : "Account created" });
      navigate(user.onboarded ? "/dashboard" : "/onboarding", { replace: true });
    } catch (err) {
      toast({ title: "Something went wrong", description: String(err) });
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full pl-10 pr-3 py-2.5 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-display font-bold text-primary">Meridian Tours</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to your operator account" : "Create your operator account"}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex p-1 rounded-xl bg-muted mb-5">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={inputCls}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                className={inputCls}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                className={inputCls}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition disabled:opacity-60"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center mt-4">
            Demo authentication — credentials are stored locally for prototype purposes.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-6 text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </button>
      </motion.div>
    </div>
  );
};

export default AuthPage;
