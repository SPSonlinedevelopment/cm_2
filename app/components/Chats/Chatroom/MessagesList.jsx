import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessagesList = ({ messages, currentUser, scrollViewRef }) => {
  // console.log("🚀 ~ MessagesList ~ messages:", messages);

  return (
    <ScrollView
      // ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages &&
        Array.isArray(messages) &&
        messages.map((message, index) => {
          return <MessageItem message={message} key={index} />;
        })}
    </ScrollView>
  );
};

export default MessagesList;
