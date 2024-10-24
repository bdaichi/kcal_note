"use client";

import { auth, initializeFirebase } from "@/services/firebaseService";
import { fetchUser } from "@/services/userService";
import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

type AuthContextState = {
  currentUser: User | null;
  token: string;
  reloadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  token: "",
  reloadUser: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const reloadUser = async () => {
    const user = await fetchUser(token);
    setCurrentUser(user);
  };

  useEffect(() => {
    initializeFirebase();
    const unsubscribed = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userToken = await firebaseUser.getIdToken();
        const user = await fetchUser(userToken);
        setCurrentUser(user);
        setToken(userToken);
      }
    });
    return () => {
      unsubscribed();
    };
  }, [setCurrentUser, setToken]);
  return (
    <AuthContext.Provider value={{ currentUser, token, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
