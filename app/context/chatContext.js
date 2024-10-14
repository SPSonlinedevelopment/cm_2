import { createContext, useState, useContext } from "react";

import {
  doc,
  setDoc,
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "./authContext";
import { Alert } from "react-native";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { userDetails } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [completedChats, setCompletedChats] = useState([]);

  const modeId = userDetails?.mode === "mentee" ? "menteeId" : "mentorId";

  const setNewTextQuestion = async (newQuestionObj) => {
    try {
      await setDoc(
        doc(db, "new_questions", newQuestionObj.roomId),
        newQuestionObj
      );
      console.log("sucessfully created new Question");
      return { success: true };
    } catch (error) {
      console.log("error", error);
      return { success: false };
    }
  };

  const reportInappropriateMessage = async (messageObj) => {
    try {
      await setDoc(
        doc(db, "reported_messages", messageObj.message.messageId),
        messageObj
      );
      Alert.alert("Message reported successfully");
      return { success: true };
    } catch (error) {
      console.log(error);
      Alert.alert("Error reporting message");
      return { success: false };
    }
  };

  const deleteSelectedMessage = (messageObj) => {
    try {
      const messageRef = doc(
        db,
        "rooms",
        messageObj.roomId,
        "messages",
        messageObj.message.messageId
      );
      deleteDoc(messageRef);
      Alert.alert("Message deleted successfully");
      return { success: true };
    } catch (error) {
      console.log("🚀 ~ deleteSelectedMessage ~ error:", error);
      Alert.alert("Error deleting messages");
      return { success: false };
    }
  };

  const getCompletedChats = () => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "completed_sessions"),
        where(modeId, "==", userDetails?.uid),
        orderBy("createdAt", "desc")
      ),
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const sessionData = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setCompletedChats((prev) => sessionData);
        } else {
          console.log("No completed sessions found for this mentor/mentee");
        }
      },
      (error) => {
        console.error("cant find completed chats", error);
      }
    );
    return unsubscribe;
  };

  const getChatrooms = () => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "rooms"),
        where(modeId, "==", userDetails?.uid),
        orderBy("createdAt", "desc")
      ),

      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const roomData = querySnapshot.docs.map((doc) => {
            return doc.data();
          });

          setAllChats((prev) => roomData);
        } else {
          setAllChats([]);
          console.log("No rooms found for this mentor/mentee");
        }
      },
      (error) => {
        console.error("Error listening for rooms:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  };

  const getWaitingQuestions = () => {
    // Attach a listener to the collection
    const unsubscribe = onSnapshot(
      query(collection(db, "new_questions"), orderBy("createdAt", "desc")),
      (querySnapshot) => {
        const questionsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setQuestions(questionsData);
      }
    );

    return unsubscribe;
  };

  return (
    <ChatContext.Provider
      value={{
        setNewTextQuestion,
        getWaitingQuestions,
        questions,
        getChatrooms,
        setAllChats,
        allChats,
        getCompletedChats,
        completedChats,
        reportInappropriateMessage,
        deleteSelectedMessage,
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
