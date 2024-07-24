import { createContext, useState, useEffect, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  collection,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Try } from "expo-router/build/views/Try";
import { Link } from "expo-router";
import { router } from "expo-router";
import { editFirebaseMessage } from "@/app/components/Auth/firebaseAuthMessages/editFirebaseAuthMessage";
import { useAuth } from "./authContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useAuth();

  const setNewTextQuestion = async (questionObj) => {
    try {
      await setDoc(doc(db, "new_question", user?.uid), questionObj);
      return { success: true };
    } catch (error) {
      console.log("error", error);
      return { success: false };
    }
  };

  return (
    <ChatContext.Provider value={{ setNewTextQuestion }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const value = useContext(ChatContext);

  if (!value) {
    throw new Error("use Chat must be wrapped in a inside Chat Provider");
  }
  return value;
};
