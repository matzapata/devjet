// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID
}

const firebaseAuthErrorList = {
        "auth/email-already-in-use": "Email already in use",
        "auth/invalid-email": "Invalid email",
        "auth/wrong-password": "Wrong password",
        "auth/popup-blocked": "Popup blocked",
        "auth/user-not-found": "User not found",
        "auth/user-disabled": "User disabled",
        "auth/weak-password": "Weak password",
}

// Initialize Firebase
let firebaseApp
if (typeof window != undefined && getApps().length < 1) {
    firebaseApp = initializeApp(firebaseConfig);
}

export { firebaseApp, firebaseAuthErrorList }