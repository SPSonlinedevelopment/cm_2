import { View, Text, FlatList, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const MentorChatList = () => {
  const { allChats } = useChat();

  return (
    <FlatList
      style={{ width: "95%" }}
      data={allChats}
      // contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ChatItem
          newQuestion={false}
          item={item}
          index={index}
          noBorder={allChats.length !== index + 1}
        />
      )}
    />
  );
};

export default MentorChatList;
