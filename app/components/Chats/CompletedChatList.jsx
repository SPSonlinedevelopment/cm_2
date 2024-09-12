import { View, Text, FlatList, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";

const CompletedChatList = () => {
  const { userDetails } = useAuth();
  const [completedChats, setCompletedChats] = useState([]);
  const modeId = userDetails?.mode === "mentee" ? "menteeId" : "mentorId";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "completed_sessions"),
        where(modeId, "==", userDetails?.uid)
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
        console.error("Error listening for rooms:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [userDetails]);

  if (!completedChats.length) {
    return (
      <View className="mt-[300px] ">
        <Text className="text-purple text-lg"> No Chatrooms yet! </Text>
      </View>
    );
  } else
    return (
      <FlatList
        style={{ width: "95%" }}
        data={completedChats}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            newQuestion={false}
            activeSession={false}
            completedSession={true}
            item={item}
            index={index}
            noBorder={completedChats.length !== index + 1}
          />
        )}
      />
    );
};

export default CompletedChatList;
