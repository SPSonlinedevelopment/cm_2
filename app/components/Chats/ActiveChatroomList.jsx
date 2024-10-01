import { View, Text, FlatList, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";

const ActiveChatroomList = () => {
  const { allChats } = useChat();

  if (!allChats.length) {
    return <Text className=" text-lg  font-bold">No Live Chatrooms </Text>;
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
