import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const CompletedChatList = ({ setCompletedSessionWeb, setRoomIdWeb }) => {
  const { completedChats } = useChat();

  if (!completedChats?.length) {
    return (
      <View className="mt-[300px] ">
        <Text className=" text-lg  font-bold">No completed chats </Text>
      </View>
    );
  } else
    return (
      <List
        setCompletedSessionWeb={setCompletedSessionWeb}
        setRoomIdWeb={setRoomIdWeb}
        completedChats={completedChats}
      ></List>
    );
};

export default CompletedChatList;

const List = React.memo(
  ({ setRoomIdWeb, setCompletedSessionWeb, completedChats }) => {
    return (
      <FlatList
        nestedScrollEnabled
        style={{ width: "100%" }}
        data={completedChats}
        keyExtractor={(item) => item.roomId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            setCompletedSessionWeb={setCompletedSessionWeb}
            setRoomIdWeb={setRoomIdWeb}
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
  }
);
