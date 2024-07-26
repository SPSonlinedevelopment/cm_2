import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessagesList = ({ messages, currentUser, scrollViewRef }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            currentUser={currentUser}
            message={message}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessagesList;
