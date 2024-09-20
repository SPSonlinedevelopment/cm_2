import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const NewQuestionList = () => {
  const { getWaitingQuestions, questions } = useChat();
  console.log("🚀 ~ NewQuestionList ~ questions:", questions);

  useEffect(() => {
    const unsubscribe = getWaitingQuestions();
    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      style={{ width: "95%" }}
      data={questions}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ChatItem
          newQuestion={true}
          item={item}
          index={index}
          noBorder={questions.length !== index + 1}
        />
      )}
    />
  );
};

export default NewQuestionList;
