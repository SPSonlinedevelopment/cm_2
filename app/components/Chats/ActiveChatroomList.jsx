import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const ActiveChatroomList = ({ setCompletedSessionWeb, setRoomIdWeb }) => {
  const { allChats } = useChat();

  if (!allChats.length) {
    return (
      <View className=" flex justify-around h-[100px]   items-center">
        <Text className=" text-lg  font-bold">No live chatrooms </Text>
      </View>
    );
  } else
    return (
      <FlatList
        nestedScrollEnabled
        style={{ width: "95%" }}
        data={allChats}
        keyExtractor={(item) => item.roomId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            setCompletedSessionWeb={setCompletedSessionWeb}
            setRoomIdWeb={setRoomIdWeb}
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
