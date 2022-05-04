import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../utils/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  signInWithGoogle: async () => {},
  createUserWithEmailAndPassword: async () => {},
  sendPasswordResetEmail: async () => {},
  signOut: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);