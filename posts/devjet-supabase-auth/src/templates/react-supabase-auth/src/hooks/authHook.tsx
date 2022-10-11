import React, { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "utils/supabase";
import { User, UserCredentials, UserAttributes } from "@supabase/supabase-js";

export interface SupabaseSignInOptions {
  redirectTo?: string | undefined;
  data?: object | undefined;
  captchaToken?: string | undefined;
}

// create a context for authentication
const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // get session data if there is an active session
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        setEvent(event);

        if (event == "PASSWORD_RECOVERY") {
          const newPassword = prompt(
            "What would you like your new password to be?"
          );
          if (newPassword === null) {
            alert("There was an error updating your password.");
          } else {
            const { data, error } = await supabase.auth.update({
              password: newPassword,
            });

            if (data) alert("Password updated successfully!");
            if (error) alert("There was an error updating your password.");
          }
        }
      }
    );

    // cleanup the useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // create signUp, signIn, signOut functions
  const value = {
    signUp: async (
      userCredentials: UserCredentials,
      options: SupabaseSignInOptions | undefined
    ) => {
      const { error } = await supabase.auth.signUp(userCredentials, options);
      if (error) setErrorMessage(error.message);
      return error;
    },
    signIn: async (
      userCredentials: UserCredentials,
      options: SupabaseSignInOptions | undefined
    ) => {
      const { error } = await supabase.auth.signIn(userCredentials, options);
      if (error) setErrorMessage(error.message);
      return error;
    },
    signInWithEmail: async (
      email: string,
      options: SupabaseSignInOptions | undefined
    ) => {
      const { error } = await supabase.auth.signIn({ email }, options);
      if (error) setErrorMessage(error.message);
      return error;
    },
    resetPasswordForEmail: async (email: string) => {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) setErrorMessage(error.message);
      return error;
    },
    updatePassword: async (password: string) => {
      const { error } = await supabase.auth.update({ password });
      if (error) setErrorMessage(error.message);
      return error;
    },
    updateUser: (attributes: UserAttributes) =>
      supabase.auth.update(attributes),
    signOut: () => supabase.auth.signOut(),
    errorMessage,
    loading,
    event,
    user,
  };

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};