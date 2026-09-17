import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAReMQaEL-sxJRXoD8dZaUJ7z-4uOfYtaI",
  authDomain: "com-eh.firebaseapp.com",
  projectId: "com-eh",
  storageBucket: "com-eh.firebasestorage.app",
  messagingSenderId: "422480867630",
  appId: "1:422480867630:web:719f6d436b2c5ee9b24abf",
  measurementId: "G-14TKNVFMF4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
