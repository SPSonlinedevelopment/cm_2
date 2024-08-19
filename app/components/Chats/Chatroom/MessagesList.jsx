import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessagesList = ({ messages, scrollViewRef }) => {
  return (
    <FlatList
      data={messages}
      style={{ width: "95%" }}
      ref={scrollViewRef}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{ paddingTop: -40 }}
      renderItem={({ item, index }) => (
        <MessageItem message={item} key={index} />
      )}
    ></FlatList>
  );
};

export default MessagesList;
