import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const CompletedChatList = () => {
  const { completedChats } = useChat();

  if (!completedChats?.length) {
    return (
      <View className="mt-[300px] ">
        <Text className=" text-lg  font-bold">No completed chats </Text>
      </View>
    );
  } else return <List completedChats={completedChats}></List>;
};

export default CompletedChatList;

const List = React.memo(({ completedChats }) => {
  return (
    <FlatList
      style={{ width: "95%" }}
      data={completedChats}
      keyExtractor={(item) => item.roomId}
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
});
