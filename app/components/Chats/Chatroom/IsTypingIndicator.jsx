import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Keyboard } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import LoadingDots from "../../Loading/LoadingDots";
import UserDetails from "@/app/user-details";
import FadeInView from "../../Effects/FadeInView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IsTypingIndicator = ({ item, scrollToEnd }) => {
  const [isTyping, setIsTyping] = useState(false);
  // const [mentorIsTyping, setMentorIsTyping] = useState(false);
  const { userDetails } = useAuth();

  const roomCollectionRef = collection(db, "rooms");
  const roomRef = doc(roomCollectionRef, item?.roomId);

  useEffect(() => {
    console.log("snapshot load");
    let unSubMentor; // Declare unSubMentor outside the useEffect callback

    unSubMentor = onSnapshot(roomRef, (docSnapshot) => {
      const roomData = docSnapshot.data();

      if (roomData) {
        console.log(
          "🚀 ~ unSubMentor=onSnapshot ~ roomData:",
          roomData.menteeIsTyping
        );

        let isTyping = false;

        if (userDetails?.mode === "mentor" && roomData.menteeIsTyping) {
          isTyping = true;
          console.log("mentor typing");
        } else if (userDetails?.mode === "mentee" && roomData.mentorIsTyping) {
          console.log("mentee typing");
          isTyping = true;
        }
        scrollToEnd();
        setIsTyping(isTyping);
      } else {
        console.error("Error retrieving room data");
      }
    });

    // Unsubscribe when the component unmounts
    return () => {
      if (unSubMentor) {
        unSubMentor();
      }
    };
  }, []);
  // Remember to unsubscribe from the listener when you no longer need it
  // For example, when the user leaves the room:
  // unsubscribe();

  useEffect(() => {
    const updateUserTyping = async (isTyping, mode) => {
      const update =
        mode === "mentee"
          ? { menteeIsTyping: isTyping }
          : { mentorIsTyping: isTyping };

      try {
        await updateDoc(roomRef, update);
        console.log("Mentee typing status updated successfully!");
      } catch (error) {
        console.error("Error updating mentee typing status:", error);
      }
    };

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        updateUserTyping(true, userDetails?.mode);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        updateUserTyping(false, userDetails?.mode);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();

      updateUserTyping(false, userDetails?.mode);
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
      {isTyping && (
        <View className="">
          {userDetails?.mode === "mentee" ? (
            <DisplayTyping name={item.mentorName} />
          ) : (
            <DisplayTyping name={item.menteeName} />
          )}
        </View>
      )}
    </View>
  );
};

export default IsTypingIndicator;
