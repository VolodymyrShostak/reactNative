import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyASSTzq5iJEx4NVYkGBciZYOq9cfy5pUHo",
  authDomain: "hw-project-8978b.firebaseapp.com",
  projectId: "hw-project-8978b",
  storageBucket: "hw-project-8978b.appspot.com",
  messagingSenderId: "560259819740",
  appId: "1:560259819740:web:d0e1ba93d11b97c977ec19",
  measurementId: "G-1M41S755ZB",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
