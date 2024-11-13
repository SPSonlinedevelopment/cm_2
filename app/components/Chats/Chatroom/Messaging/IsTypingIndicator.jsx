import React, { useState, useEffect, Children, useRef } from "react";
import { View, Text, Keyboard } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import LoadingDots from "@/app/components/Loading/LoadingDots";
import { useChatRoom } from "@/app/context/chatRoomContext";
// import { useKeyboardAndScrollConfig } from "../../../../chat-room";

const roomCollectionRef = collection(db, "rooms");

const IsTypingIndicator = () => {
  const { chatRoomData } = useChatRoom();
  const [isTyping, setIsTyping] = useState(false);
  const { userDetails } = useAuth();
  const roomRef = doc(roomCollectionRef, chatRoomData?.roomId);
  const { mode } = userDetails || {};
  const { mentorName, menteeName } = chatRoomData || {};

  useEffect(() => {
    const unSubMentor = onSnapshot(roomRef, (docSnapshot) => {
      const roomData = docSnapshot.data();

      if (roomData) {
        const isUserTyping =
          (mode === "mentor" && roomData.menteeIsTyping) ||
          (mode === "mentee" && roomData.mentorIsTyping);

        setIsTyping(isUserTyping);
      } else {
        console.error("Error retrieving room data");
      }
    });

    // Unsubscribe when the component unmounts
    return () => {
      setIsTyping(false);

      unSubMentor && unSubMentor();
    };
  }, []);

  return (
    isTyping && (
      <DisplayTyping name={mode === "mentee" ? mentorName : menteeName} />
    )
  );
};

export default IsTypingIndicator;

const DisplayTyping = ({ name }) => {
  return (
    <View
      testID="is_typing_indicator"
      className={`flex  flex-row items-center absolute b bottom-[75px] p-1 mb-2 mt-1 h-[45px] rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm  
           bg-white self-start  ml-3
      `}
    >
      <Text className="text-base "> {name} is Typing</Text>
      <LoadingDots size={70} />
      <View
        className={`h-3 w-2   absolute  
            bg-white  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl  `}
      />
    </View>
  );
};
