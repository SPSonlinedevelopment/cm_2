import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

const NewQuestionList = ({ data }) => {
  return (
    <FlatList
      style={{ width: "95%" }}
      data={data}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ChatItem
          newQuestion={true}
          item={item}
          index={index}
          noBorder={data.length !== index + 1}
        />
      )}
    />
  );
};

export default NewQuestionList;
