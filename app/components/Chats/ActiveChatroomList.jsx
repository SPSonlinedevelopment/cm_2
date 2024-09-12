import { View, Text, FlatList, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";

const ActiveChatroomList = () => {
  const { setAllChats, allChats } = useChat();
  const { userDetails } = useAuth();

  const modeId = userDetails?.mode === "mentee" ? "menteeId" : "mentorId";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "rooms"), where(modeId, "==", userDetails?.uid)),

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
    return () => {
      console.log("unsub");
      unsubscribe();
    };
  }, []);

  if (!allChats.length) {
    return (
      <View className=" ">
        <Text className="text-purple text-lg"> No Live Chatrooms </Text>
      </View>
    );
  } else
    return (
      <FlatList
        style={{ width: "95%" }}
        data={allChats}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            newQuestion={false}
            completedSession={false}
            activeSession={true}
            item={item}
            index={index}
            noBorder={allChats.length !== index + 1}
          />
        )}
      />
    );
};

export default ActiveChatroomList;
