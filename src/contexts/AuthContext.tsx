import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AccountType = "creator" | "operator" | "enterprise" | "destination";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  accountType?: AccountType;
  organization?: string;
  city?: string;
  avatar?: string;
  onboarded: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (email: string, password: string, name: string) => Promise<AuthUser>;
  signOut: () => void;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const STORAGE_KEY = "meridian-auth-user";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const signIn = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const existing = localStorage.getItem(STORAGE_KEY);
    let u: AuthUser;
    if (existing) {
      const parsed = JSON.parse(existing) as AuthUser;
      u = parsed.email === email ? parsed : { ...parsed, email };
    } else {
      u = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0],
        onboarded: false,
      };
    }
    persist(u);
    return u;
  };

  const signUp = async (email: string, _password: string, name: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const u: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name,
      onboarded: false,
    };
    persist(u);
    return u;
  };

  const signOut = () => persist(null);

  const updateUser = (patch: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
