import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDexJWE77QvvHDtJE5f3lLvlMrq4dRn45k",
    authDomain: "f1-universe.firebaseapp.com",
    projectId: "f1-universe",
    storageBucket: "f1-universe.firebasestorage.app",
    messagingSenderId: "993881131463",
    appId: "1:993881131463:web:e9064771308537a4b0b1e2",
    measurementId: "G-EEY9LBXSE4"
};

// Inicializar la app y la base de datos
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

