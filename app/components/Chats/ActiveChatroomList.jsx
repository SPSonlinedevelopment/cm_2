import { View, Text, FlatList, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import EmptyAnimation from "../Effects/EmptyAnimation";
import IconGeneral from "../IconGeneral";
import Thinking from "../../../assets/icons/Thinking.png";

const ActiveChatroomList = () => {
  const { allChats } = useChat();

  if (!allChats.length) {
    return (
      <View className=" flex justify-around h-[100px]   items-center">
        <Text className=" text-lg  font-bold">No Live Chatrooms </Text>
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
