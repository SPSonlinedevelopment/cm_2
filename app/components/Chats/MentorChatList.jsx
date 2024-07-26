import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

const MentorChatList = ({ data }) => {
  return (
    <FlatList
      style={{ width: "95%" }}
      data={data}
      // contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ChatItem
          newQuestion={false}
          item={item}
          index={index}
          noBorder={data.length !== index + 1}
        />
      )}
    />
  );
};

export default MentorChatList;
