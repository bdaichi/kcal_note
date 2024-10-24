import { initializeApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

let auth: Auth;
let firestore: Firestore;

const initializeFirebase = () => {
  try {
    if (typeof window !== "undefined" && !getApps().length) {
      initializeApp(firebaseConfig);
    }
    auth = getAuth();
    firestore = getFirestore();
  } catch (error) {
    console.error(error);
  }
};

export { initializeFirebase, auth, firestore };
