"use client";

import * as React from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getDb, isFirebaseConfigured } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/firestore-collections";

export type AdminRole = "admin" | "editor" | null;

type AuthState = {
  user: User | null;
  role: AdminRole;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isFirebaseConfigured();
  const [user, setUser] = React.useState<User | null>(null);
  const [role, setRole] = React.useState<AdminRole>(null);
  const [loading, setLoading] = React.useState(configured);

  React.useEffect(() => {
    if (!configured) return;
    const unsub = onAuthStateChanged(getFirebaseAuth(), async (u) => {
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(getDb(), COLLECTIONS.users, u.uid));
          const r = snap.exists() ? (snap.data().role as AdminRole) : null;
          setRole(r === "admin" || r === "editor" ? r : null);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [configured]);

  const login = React.useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  }, []);

  const logout = React.useCallback(async () => {
    await signOut(getFirebaseAuth());
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, configured, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
