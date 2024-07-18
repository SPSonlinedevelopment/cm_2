// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWWZZKYEhhxfZlkH-DXf1wXwiGCG09nGI",
  authDomain: "cm-2-5562e.firebaseapp.com",
  projectId: "cm-2-5562e",
  storageBucket: "cm-2-5562e.appspot.com",
  messagingSenderId: "329342163484",
  appId: "1:329342163484:web:d9ef0db1eede6e69f1ddd9",
  measurementId: "G-CYLJBVHWE6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const mentorsRef = collection(db, "mentors");
export const menteesRef = collection(db, "mentees");
export const roomRef = collection(db, "rooms");
export const usersRef = collection(db, "users");
