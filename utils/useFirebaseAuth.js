import { useState, useEffect } from 'react'
import { firebaseApp } from './firebase';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
    sendPasswordResetEmail as fbSendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as fbSignOut,
} from 'firebase/auth'

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(firebaseApp)
    const googleProvider = new GoogleAuthProvider()

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPassword = (email, password) => fbSignInWithEmailAndPassword(auth, email, password);
    const createUserWithEmailAndPassword = (email, password) => fbCreateUserWithEmailAndPassword(auth, email, password);
    const signOut = () => fbSignOut(auth).then(clear);
    const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
    const sendPasswordResetEmail = (email) => fbSendPasswordResetEmail(auth, email);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        var formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signInWithEmailAndPassword,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        signOut
    };
}