"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { demoUser, isDemoActive } from "@/lib/demo-user";
import { 
  getSavedWalletSession, 
  createWalletUser, 
  clearWalletSession, 
  onWalletSessionChange 
} from "@/lib/wallet-auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async () => {} });

export const useAuth = () => useContext(AuthContext);

function getInitialAuthState(): { user: User | null; loading: boolean } {
  // Keep SSR and first client paint identical to avoid hydration mismatch.
  // Demo / Firebase auth resolve in useEffect below.
  return { user: null, loading: true };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getInitialAuthState().user);
  const [loading, setLoading] = useState(() => getInitialAuthState().loading);

  useEffect(() => {
    if (isDemoActive()) {
      setUser(demoUser);
      setLoading(false);
      return;
    }

    const savedWallet = getSavedWalletSession();
    if (savedWallet) {
      setUser(createWalletUser(savedWallet.address));
      setLoading(false);
    }

    const unsubscribeFirebase = onAuthStateChanged(auth, (currentUser) => {
      // Only set Firebase user if no wallet session is active
      if (!getSavedWalletSession()) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    const unsubscribeWallet = onWalletSessionChange((walletSession) => {
      if (walletSession) {
        setUser(createWalletUser(walletSession.address));
      } else {
        setUser(auth.currentUser);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeFirebase();
      unsubscribeWallet();
    };
  }, []);

  const logout = async () => {
    clearWalletSession();
    if (isDemoActive()) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
