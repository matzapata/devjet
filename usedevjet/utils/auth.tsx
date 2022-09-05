import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({
  supabase,
  children,
}: {
  supabase: SupabaseClient;
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const activeSession = supabase.auth.session();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    return () => authListener?.unsubscribe();
  }, [supabase.auth]);

  const signOut = () => supabase.auth.signOut();
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else router.push("/");
  };
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else router.push("/auth/login");
    setLoading(false);
  };
  const recoverPassword = async (email: string) => {
    setLoading(true);
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else
      router.push({
        pathname: "/auth/login",
        query: { recover: true },
      });
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        error,
        loading,
        signOut,
        signIn,
        signUp,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
