import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, ArrowLeft, Compass, MapPin, ShieldCheck, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import coastImg from "@/assets/auth-coast.jpg";
import templeImg from "@/assets/auth-temple.jpg";
import mountainImg from "@/assets/auth-mountain.jpg";
import cityImg from "@/assets/auth-city.jpg";
import beachImg from "@/assets/auth-beach.jpg";

type Mode = "signin" | "signup";
type Step =
  | "signin"
  | "signup"
  | "signup-otp"
  | "forgot-email"
  | "forgot-otp"
  | "forgot-reset"
  | "forgot-done";

const DEMO_OTP = "123456";

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
  const [step, setStep] = useState<Step>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const mode: Mode = step === "signup" || step === "signup-otp" ? "signup" : "signin";

  const inputCls =
    "w-full pl-11 pr-3 py-3 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition";

  const sendOtp = () => {
    toast({
      title: "Verification code sent",
      description: `We sent a 6-digit code to ${email}. For this demo, use ${DEMO_OTP}.`,
    });
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Enter your email and password." });
      return;
    }
    setBusy(true);
    try {
      const user = await signIn(email, password);
      toast({ title: "Welcome back" });
      navigate(user.onboarded ? "/dashboard" : "/onboarding", { replace: true });
    } catch (err) {
      toast({ title: "Something went wrong", description: String(err) });
    } finally {
      setBusy(false);
    }
  };

  const handleSignupStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast({ title: "Missing fields", description: "Fill in all required fields." });
      return;
    }
    setOtp("");
    sendOtp();
    setStep("signup-otp");
  };

  const handleSignupVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Enter the 6-digit code" });
      return;
    }
    if (otp !== DEMO_OTP) {
      toast({ title: "Invalid code", description: `Demo code is ${DEMO_OTP}.` });
      return;
    }
    setBusy(true);
    try {
      const user = await signUp(email, password, name);
      toast({ title: "Email verified", description: "Account created." });
      navigate(user.onboarded ? "/dashboard" : "/onboarding", { replace: true });
    } catch (err) {
      toast({ title: "Something went wrong", description: String(err) });
    } finally {
      setBusy(false);
    }
  };

  const handleForgotEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Enter your email" });
      return;
    }
    setOtp("");
    sendOtp();
    setStep("forgot-otp");
  };

  const handleForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Enter the 6-digit code" });
      return;
    }
    if (otp !== DEMO_OTP) {
      toast({ title: "Invalid code", description: `Demo code is ${DEMO_OTP}.` });
      return;
    }
    setStep("forgot-reset");
  };

  const handleForgotReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters." });
      return;
    }
    setStep("forgot-done");
  };

  const current = slides[slide];

  const headingFor = () => {
    switch (step) {
      case "signin": return { eyebrow: "Welcome back", title: "Sign in to plan the next journey.", sub: "Manage attractions, events, partners and traveler experiences from one home." };
      case "signup": return { eyebrow: "Get started", title: "Create your destination account.", sub: "Join thousands of operators powering modern tourism with Meridian." };
      case "signup-otp": return { eyebrow: "Verify email", title: "Confirm it's really you.", sub: `Enter the 6-digit code we sent to ${email}.` };
      case "forgot-email": return { eyebrow: "Reset password", title: "Forgot your password?", sub: "Enter your email and we'll send a verification code." };
      case "forgot-otp": return { eyebrow: "Verify identity", title: "Check your inbox.", sub: `Enter the 6-digit code we sent to ${email}.` };
      case "forgot-reset": return { eyebrow: "Almost there", title: "Set a new password.", sub: "Choose a strong password you haven't used before." };
      case "forgot-done": return { eyebrow: "All set", title: "Password updated.", sub: "You can now sign in with your new password." };
    }
  };
  const h = headingFor();

  const Tabs = () => (
    <div className="inline-flex p-1 rounded-full bg-muted mb-6">
      {(["signin", "signup"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => { setStep(m); setOtp(""); }}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
          }`}
        >
          {m === "signin" ? "Sign in" : "Sign up"}
        </button>
      ))}
    </div>
  );

  const SubmitBtn = ({ label, loading }: { label: string; loading?: boolean }) => (
    <button
      type="submit"
      disabled={busy || loading}
      className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-primary/20"
    >
      {(busy || loading) ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {label}
      {!(busy || loading) && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );

  const BackLink = ({ to, label }: { to: Step; label: string }) => (
    <button
      type="button"
      onClick={() => { setStep(to); setOtp(""); }}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> {label}
    </button>
  );

  const OtpField = () => (
    <div className="flex flex-col items-center gap-3 py-2">
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <button
        type="button"
        onClick={sendOtp}
        className="text-xs text-muted-foreground hover:text-primary"
      >
        Didn't get it? Resend code
      </button>
    </div>
  );

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
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md"
          >
            <div className="mb-7">
              <span className="inline-block text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
                {h.eyebrow}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-2">
                {h.title}
              </h1>
              <p className="text-sm text-muted-foreground">{h.sub}</p>
            </div>

            {(step === "signin" || step === "signup") && <Tabs />}

            {step === "signin" && (
              <form onSubmit={handleSignin} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="email" className={inputCls} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="password" className={inputCls} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setStep("forgot-email")} className="text-xs text-muted-foreground hover:text-primary">
                    Forgot password?
                  </button>
                </div>
                <SubmitBtn label="Sign in" />
              </form>
            )}

            {step === "signup" && (
              <form onSubmit={handleSignupStart} className="space-y-3">
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input className={inputCls} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="email" className={inputCls} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="password" className={inputCls} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <SubmitBtn label="Send verification code" />
              </form>
            )}

            {step === "signup-otp" && (
              <form onSubmit={handleSignupVerify} className="space-y-5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">Verify your email</div>
                    <div className="text-muted-foreground">Demo code: <span className="font-mono">{DEMO_OTP}</span></div>
                  </div>
                </div>
                <OtpField />
                <SubmitBtn label="Verify & create account" />
                <div className="flex justify-center">
                  <BackLink to="signup" label="Back to details" />
                </div>
              </form>
            )}

            {step === "forgot-email" && (
              <form onSubmit={handleForgotEmail} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="email" className={inputCls} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <SubmitBtn label="Send reset code" />
                <div className="flex justify-center">
                  <BackLink to="signin" label="Back to sign in" />
                </div>
              </form>
            )}

            {step === "forgot-otp" && (
              <form onSubmit={handleForgotOtp} className="space-y-5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">Enter reset code</div>
                    <div className="text-muted-foreground">Demo code: <span className="font-mono">{DEMO_OTP}</span></div>
                  </div>
                </div>
                <OtpField />
                <SubmitBtn label="Verify code" />
                <div className="flex justify-center">
                  <BackLink to="forgot-email" label="Use a different email" />
                </div>
              </form>
            )}

            {step === "forgot-reset" && (
              <form onSubmit={handleForgotReset} className="space-y-3">
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="password" className={inputCls} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <SubmitBtn label="Update password" />
              </form>
            )}

            {step === "forgot-done" && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">Password updated</div>
                    <div className="text-muted-foreground">You can sign in with your new password.</div>
                  </div>
                </div>
                <button
                  onClick={() => { setStep("signin"); setPassword(""); setNewPassword(""); setOtp(""); }}
                  className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-primary/20"
                >
                  Continue to sign in
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            )}

            {(step === "signin" || step === "signup") && (
              <>
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
              </>
            )}

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

        <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live destinations · 142 cities
        </div>

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
