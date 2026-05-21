import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, Compass, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import coastImg from "@/assets/auth-coast.jpg";
import templeImg from "@/assets/auth-temple.jpg";
import mountainImg from "@/assets/auth-mountain.jpg";
import cityImg from "@/assets/auth-city.jpg";
import beachImg from "@/assets/auth-beach.jpg";

type Mode = "signin" | "signup";

const slides = [
  { img: coastImg, place: "Honolulu", country: "Hawaii", quote: "Where the Pacific meets the city skyline." },
  { img: templeImg, place: "Siem Reap", country: "Cambodia", quote: "Ancient temples awaken at first light." },
  { img: mountainImg, place: "Dolomites", country: "Italy", quote: "Alpenglow on snow-dusted peaks." },
  { img: cityImg, place: "Tuscany", country: "Italy", quote: "Lantern-lit streets of an old town evening." },
  { img: beachImg, place: "Bora Bora", country: "French Polynesia", quote: "Crystalline lagoons and overwater retreats." },
];

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
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

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
    "w-full pl-11 pr-3 py-3 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition";

  const current = slides[slide];

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* LEFT — Form */}
      <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-8 lg:py-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 self-start group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg text-primary">Meridian Tours</span>
        </button>

        <div className="flex-1 flex items-center justify-center py-10">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md"
          >
            <div className="mb-7">
              <span className="inline-block text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
                {mode === "signin" ? "Welcome back" : "Get started"}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-2">
                {mode === "signin" ? "Sign in to plan the next journey." : "Create your destination account."}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === "signin"
                  ? "Manage attractions, events, partners and traveler experiences from one home."
                  : "Join thousands of operators powering modern tourism with Meridian."}
              </p>
            </div>

            <div className="inline-flex p-1 rounded-full bg-muted mb-6">
              {(["signin", "signup"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <AnimatePresence initial={false}>
                {mode === "signup" && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative overflow-hidden"
                  >
                    <UserIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      className={inputCls}
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  className={inputCls}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="password"
                  className={inputCls}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {mode === "signin" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-primary/20"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {mode === "signin" ? "Sign in" : "Create account"}
                {!busy && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={() => toast({ title: "Demo mode", description: "Connect a backend to enable Google sign-in." })}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border bg-card hover:bg-muted transition text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Continue with Google
            </button>

            <p className="text-[11px] text-muted-foreground text-center mt-6">
              Demo authentication — accounts are stored locally for prototype use.
            </p>
          </motion.div>
        </div>

        <div className="text-[11px] text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} Meridian Tours</span>
          <div className="flex gap-4">
            <a className="hover:text-foreground" href="#">Privacy</a>
            <a className="hover:text-foreground" href="#">Terms</a>
          </div>
        </div>
      </div>

      {/* RIGHT — Imagery */}
      <div className="relative hidden lg:block overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={current.img}
            src={current.img}
            alt={`${current.place}, ${current.country}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />

        {/* Top label */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live destinations · 142 cities
        </div>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.place}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 mb-3">
                <MapPin className="w-3 h-3" /> {current.country}
              </div>
              <h2 className="font-display text-5xl xl:text-6xl font-bold leading-none mb-4">
                {current.place}
              </h2>
              <p className="text-base text-white/90 max-w-md leading-relaxed">
                {current.quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="h-1 rounded-full overflow-hidden bg-white/25 transition-all"
                style={{ width: i === slide ? 40 : 16 }}
                aria-label={`Show slide ${i + 1}`}
              >
                {i === slide && (
                  <motion.div
                    key={slide}
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.4, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
