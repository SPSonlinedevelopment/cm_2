import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import SearchChats from "./SearchChats";

const MentorChatList = ({ data }) => {
  return (
    <View className="flex w-full h-full flex-col justify-center  items-center">
      <SearchChats />
      <FlatList
        style={{ width: "90%" }}
        data={data}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            index={index}
            noBorder={data.length !== index + 1}
          />
        )}
      />
    </View>
  );
};

export default MentorChatList;
