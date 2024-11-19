import React, { useState, useEffect, memo } from "react";
import { View, Text } from "react-native";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import LoadingDots from "@/app/components/Loading/LoadingDots";
import { useChatRoom } from "@/app/context/chatRoomContext";

const roomCollectionRef = collection(db, "rooms");

const IsTypingIndicator = () => {
  const { chatRoomData } = useChatRoom();
  const [isTyping, setIsTyping] = useState(false);
  const { userDetails } = useAuth();
  const { mode } = userDetails || {};
  const { mentorName, menteeName } = chatRoomData || {};

  useEffect(() => {
    if (!chatRoomData?.roomId) {
      console.error("Room ID is missing");
      return;
    }

    const roomRef = doc(roomCollectionRef, chatRoomData.roomId);
    const unsubscribe = onSnapshot(
      roomRef,
      (docSnapshot) => {
        const roomData = docSnapshot.data();

        if (roomData) {
          const isUserTyping =
            (mode === "mentor" && roomData.menteeIsTyping) ||
            (mode === "mentee" && roomData.mentorIsTyping);
          setIsTyping(isUserTyping);
        } else {
          console.error("Room data is missing or invalid");
        }
      },
      (error) => {
        console.error("Error fetching room data:", error);
      }
    );

    return () => {
      unsubscribe();
      setIsTyping(false); // Reset state on unmount
    };
  }, [chatRoomData?.roomId, mode]);

  const typingName = mode === "mentee" ? mentorName : menteeName;

  return isTyping ? <DisplayTyping name={typingName} /> : null;
};

export default IsTypingIndicator;

const DisplayTyping = memo(({ name }) => (
  <View
    testID="is_typing_indicator"
    className="flex flex-row items-center absolute bottom-[75px] p-1 mb-2 mt-1 h-[45px] 
               rounded-xl shadow-sm bg-white self-start ml-3"
  >
    <Text className="text-base">{name} is Typing</Text>
    <LoadingDots size={70} />
    <View className="h-3 w-2 absolute bg-white bottom-0 rotate-[30deg] left-[-2px] rounded-br-xl" />
  </View>
));
