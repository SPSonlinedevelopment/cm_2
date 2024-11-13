import React, { useState, useEffect, Children, useRef } from "react";
import { View, Text, Keyboard } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import FadeInView from "@/app/components/Effects/FadeInView";
import LoadingDots from "@/app/components/Loading/LoadingDots";
import { useChatRoom } from "@/app/context/chatRoomContext";

export const SenseTypingIndicator = () => {};

const IsTypingIndicator = ({ text }) => {
  const { chatRoomData } = useChatRoom();
  const [isTyping, setIsTyping] = useState(false);
  const { userDetails } = useAuth();
  const [currentlyTyping, setIsCurrentlyTyping] = useState(false);
  const [prevTextLength, setPrevTextLength] = useState(false);

  const roomCollectionRef = collection(db, "rooms");
  const roomRef = doc(roomCollectionRef, chatRoomData?.roomId);

  const typingTimeoutRef = useRef(null);

  const updateUserTyping = async (currentlyTyping, mode) => {
    const update =
      mode === "mentee"
        ? { menteeIsTyping: currentlyTyping }
        : { mentorIsTyping: currentlyTyping };

    try {
      await updateDoc(roomRef, update);
      console.log("Mentee typing status updated successfully!");
    } catch (error) {
      console.error("Error updating mentee typing status:", error);
    }
  };

  const detectTypingStatus = () => {
    console.log(text.length);

    if (text.length > 0) {
      if (prevTextLength !== text.length) {
        // Clear any previous timeout if text length changes
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        setIsCurrentlyTyping(true);
        updateUserTyping(true, userDetails.mode);
      }

      // Set a new timeout for detecting typing inactivity
      typingTimeoutRef.current = setTimeout(() => {
        updateUserTyping(false, userDetails.mode);
      }, 2000);
    } else {
      updateUserTyping(false, userDetails.mode);
    }

    setPrevTextLength(text.length);
  };

  useEffect(() => {
    detectTypingStatus();
    return () => {
      // Cleanup timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [text]);

  useEffect(() => {
    const unSubMentor = onSnapshot(roomRef, (docSnapshot) => {
      const roomData = docSnapshot.data();

      if (roomData) {
        let isTyping = false;

        if (userDetails?.mode === "mentor" && roomData.menteeIsTyping) {
          isTyping = true;
          console.log("mentor typing");
        } else if (userDetails?.mode === "mentee" && roomData.mentorIsTyping) {
          console.log("mentee typing");
          isTyping = true;
        }

        setIsTyping(isTyping);
      } else {
        console.error("Error retrieving room data");
      }
    });

    // Unsubscribe when the component unmounts
    return () => {
      setIsTyping(false);

      if (unSubMentor) {
        unSubMentor();
      }
    };
  }, []);

  const DisplayTyping = ({ name }) => {
    return (
      <FadeInView>
        <View
          className={`flex flex-row items-center relative p-1 mb-2 mt-1 h-[45px] rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm  
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
      </FadeInView>
    );
  };
  return (
    <View>
      {/* <Text> currently typing {JSON.stringify(currentlyTyping)}</Text>
      <Text> prev length{JSON.stringify(prevTextLength)}</Text>
      <Text> current length{JSON.stringify(text.length)}</Text> */}
      {isTyping && (
        <View className="">
          {userDetails?.mode === "mentee" ? (
            <DisplayTyping name={chatRoomData.mentorName} />
          ) : (
            <DisplayTyping name={chatRoomData.menteeName} />
          )}
        </View>
      )}
    </View>
  );
};

export default IsTypingIndicator;
