import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";
import { Image } from "expo-image";

const MessagesList = ({ messages, scrollViewRef, userId }) => {
  console.log("🚀 ~ MessagesList ~ messages:", messages);

  return (
    <ScrollView ref={scrollViewRef}>
      {messages.map((message) => {
        return (
          <MessageItem
            message={message}
            key={message.messageId}
            userId={userId}
          ></MessageItem>
        );
      })}
    </ScrollView>
  );
};

export default MessagesList;

{
  /* <FlatList
data={messages}
style={{ width: "100%" }}
ref={scrollViewRef}
keyExtractor={(item) => item.messageId}
showsVerticalScrollIndicator={false}
renderItem={({ item }) => (
  <MessageItem message={item} key={item.messageId} userId={userId} />
)}
></FlatList> */
}
