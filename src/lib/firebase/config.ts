
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNZ24nGLJXvB6Yug4zgEf8svSuBsuGga0",
  authDomain: "social-return.firebaseapp.com",
  projectId: "social-return",
  storageBucket: "social-return.appspot.com",
  messagingSenderId: "878372074615",
  appId: "1:878372074615:web:ad79fa96b91e9111208272",
  measurementId: "G-H47XDH2LLH"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);