import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ChatRoomContext = createContext();

export const ChatRoomProvider = ({ roomId, completedSession, children }) => {
  const chatRoomData = getChatRoomData(roomId, completedSession);

  return (
    <ChatRoomContext.Provider
      value={{
        chatRoomData,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoom = () => useContext(ChatRoomContext);

export const getChatRoomData = (roomId, completedSession) => {
  const [chatRoomData, setChatRoomData] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const docRef = doc(
      db,
      !completedSession ? "rooms" : "completed_sessions",
      roomId
    );

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setChatRoomData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [roomId, completedSession]);

  return chatRoomData;
};

export default getChatRoomData;
