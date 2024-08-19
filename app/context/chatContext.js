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
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Try } from "expo-router/build/views/Try";
import { Link } from "expo-router";
import { router } from "expo-router";
import { editFirebaseMessage } from "@/app/components/Auth/firebaseAuthMessages/editFirebaseAuthMessage";
import { useAuth } from "./authContext";
import { generateRandomId } from "../../utils/common";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const [allChats, setAllChats] = useState([]);

  const setNewTextQuestion = async (questionObj) => {
    try {
      await setDoc(
        doc(db, "new_question", questionObj.questionId),
        questionObj
      );

      return { success: true };
    } catch (error) {
      console.log("error", error);
      return { success: false };
    }
  };

  const getWaitingQuestions = () => {
    const questionsRef = collection(db, "new_question"); // Get a reference to the collection

    // Attach a listener to the collection
    const unsubscribe = onSnapshot(questionsRef, (querySnapshot) => {
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(questionsData);
    });

    return unsubscribe;
  };

  return (
    <ChatContext.Provider
      value={{
        setNewTextQuestion,
        getWaitingQuestions,
        questions,
        setAllChats,
        allChats,
      }}
    >
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
