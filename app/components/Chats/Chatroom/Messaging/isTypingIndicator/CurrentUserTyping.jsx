import React, { useEffect, useRef } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { useChatRoom } from "@/app/context/chatRoomContext";

const TYPING_TIMEOUT = 1500;

const CurrentUserTyping = ({ text }) => {
  const { chatRoomData } = useChatRoom();
  const { userDetails } = useAuth();

  const typingTimeoutRef = useRef(null);
  const prevTextLength = useRef(0);

  const roomCollectionRef = collection(db, "rooms");
  const roomRef = doc(roomCollectionRef, chatRoomData?.roomId);

  const updateUserTyping = async (currentlyTyping, mode) => {
    const fieldToUpdate =
      userDetails?.mode === "mentee" ? "menteeIsTyping" : "mentorIsTyping";
    const updateData = { [fieldToUpdate]: currentlyTyping };

    try {
      await updateDoc(roomRef, updateData);
    } catch (error) {
      console.error("Error updating mentee typing status:", error);
    }
  };

  const startTypingTimeout = () => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(
      () => updateUserTyping(false),
      TYPING_TIMEOUT
    );
  };

  const detectTypingStatus = () => {
    if (text.length === 0) {
      clearTimeout(typingTimeoutRef.current);
      updateUserTyping(false);
    } else if (text.length !== prevTextLength.current) {
      updateUserTyping(true);
      startTypingTimeout();
    }
    prevTextLength.current = text.length;
  };

  useEffect(() => {
    detectTypingStatus();
    return () => clearTimeout(typingTimeoutRef.current);
  }, [text]);

  return null;
};
export default CurrentUserTyping;
