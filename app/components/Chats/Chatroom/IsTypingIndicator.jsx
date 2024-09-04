import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Keyboard } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";

const IsTypingIndicator = ({ roomId }) => {
  const [menteeIsTyping, setMenteeIsTyping] = useState(false);
  const [mentorIsTyping, setMentorIsTyping] = useState(false);
  const { useDetails } = useAuth();

  const roomCollectionRef = collection(db, "rooms");

  // Assuming you have a roomId variable to identify the specific room
  const roomRef = doc(roomCollectionRef, roomId);

  useEffect(() => {
    if (useDetails.mode === "mentor") {
      const unSubMentor = onSnapshot(roomRef, (docSnapshot) => {
        const roomData = docSnapshot.data();
        if (roomData) {
          // Update your frontend based on roomData.menteeIsTyping and roomData.mentorIsTyping
          // For example:

          if (roomData.menteeIsTyping) {
            // Display "Mentee is typing..."

            setMenteeIsTyping(true);
          } else {
            // Hide the "Mentee is typing..." message

            setMenteeIsTyping(false);
          }
          // Similarly, handle roomData.mentorIsTyping

          if (roomData.mentorIsTyping) {
            // Display "Mentee is typing..."

            setMentorIsTyping(true);
          } else {
            // Hide the "Mentee is typing..." message

            setMentorIsTyping(false);
          }
        }
      });

      return () => {
        unSubMentor();
      };
    } else if (useDetails.mode === "mentee") {
      const unSubMentee = onSnapshot(roomRef, (docSnapshot) => {
        const roomData = docSnapshot.data();
        if (roomData) {
          // Update your frontend based on roomData.menteeIsTyping and roomData.mentorIsTyping
          // For example:

          if (roomData.mentorIsTyping) {
            // Display "Mentee is typing..."

            setMenteeIsTyping(true);
          } else {
            // Hide the "Mentee is typing..." message

            setMenteeIsTyping(false);
          }
        }
      });

      return () => {
        unSubMentee();
      };
    }
  }, []);

  // Remember to unsubscribe from the listener when you no longer need it
  // For example, when the user leaves the room:
  // unsubscribe();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsTyping(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsTyping(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return <View>{isTyping && <Text className="text-xs">Typing...</Text>}</View>;
};

export default IsTypingIndicator;
