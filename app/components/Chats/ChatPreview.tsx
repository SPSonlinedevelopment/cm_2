import { View, Text } from "react-native";
import React, { useEffect } from "react";
import MentorChatList from "./MentorChatList";
import CustomKeyboardView from "../CustomKeyboardView";

import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "@/app/context/chatContext";
import NewQuestionList from "./NewQuestionList";
import { SearchBar } from "react-native-screens";
import SearchChats from "./SearchChats";

const ChatPreview = () => {
  const { getWaitingQuestions, questions } = useChat();
  console.log("🚀 ~ ChatPreview ~ questions:", questions);

  const { userDetails } = useAuth();
  console.log("🚀 ~ ChatPreview ~ userDetails:", userDetails);

  useEffect(() => {
    const unsubscribe = getWaitingQuestions(); // Start listening for changes

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const data: any = [
    {
      chatName: "Chemistry Equations",
      date: "23/04/1988",
      duration: "12mins",
      parterName: "John",
      //   avatarName: "Colin",
    },
    {
      chatName: "Maths Equations",
      date: "33/01/1988",
      duration: "22mins",
      parterName: "John",
      avatarName: "Janet",
    },
    {
      chatName: "Physiocs Equations",
      date: "33/01/1988",
      duration: "22mins",
      parterName: "Fred",
      avatarName: "Stuart",
    },
    {
      chatName: "Physiocs Equations",
      date: "33/01/1988",
      duration: "22mins",
      parterName: "Fred",
      avatarName: "Ben",
    },
  ];

  let chatlistData;

  if (!data.length) {
    chatlistData = [
      {
        chatName: "Welcome",
        date: "23/04/1988",
        duration: "12mins",
        parterName: "Collet Owl",
      },
    ];
  } else {
    chatlistData = data;
  }

  return (
    <CustomKeyboardView>
      <GradientNavigation />
      <SafeAreaView className="flex-1 h-full w-full flex flex-col  items-center justify-start">
        <View className=" flex flex-col justify-start items-start w-full p-3">
          <Text className="text-xl font-bold">Chats</Text>
        </View>

        <SearchChats />
        <View className="h-[20px] w-full"></View>
        {userDetails?.mode === "mentor" && <NewQuestionList data={questions} />}

        <MentorChatList data={chatlistData} />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default ChatPreview;
