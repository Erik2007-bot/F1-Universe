// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDexJWE77QvvHDtJE5f3lLvlMrq4dRn45k",
    authDomain: "f1-universe.firebaseapp.com",
    projectId: "f1-universe",
    storageBucket: "f1-universe.firebasestorage.app",
    messagingSenderId: "993881131463",
    appId: "1:993881131463:web:e9064771308537a4b0b1e2",
    measurementId: "G-EEY9LBXSE4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);


