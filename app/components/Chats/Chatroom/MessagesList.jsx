import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";
import { Image } from "expo-image";

const MessagesList = ({ messages, scrollViewRef }) => {
  return (
    <FlatList
      data={messages}
      style={{ width: "95%" }}
      ref={scrollViewRef}
      keyExtractor={(item) => item.messageId}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <MessageItem message={item} key={index} />
      )}
    ></FlatList>
  );
};

export default MessagesList;
