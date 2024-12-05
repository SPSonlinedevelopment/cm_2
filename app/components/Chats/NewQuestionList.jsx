import { FlatList } from "react-native";
import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const NewQuestionList = () => {
  const { getWaitingQuestions, questions } = useChat();

  // useEffect(() => {
  //   const unsubscribe = getWaitingQuestions();
  //   return () => unsubscribe();
  // }, []);

  return (
    <FlatList
      style={{ width: "100%" }}
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
