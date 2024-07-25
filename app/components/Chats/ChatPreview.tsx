import { View, Text } from "react-native";
import React from "react";
import MentorChatList from "./MentorChatList";
import CustomKeyboardView from "../CustomKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";

const ChatPreview = () => {
  const data: any = [
    // {
    //   chatName: "Chemistry Equations",
    //   date: "23/04/1988",
    //   duration: "12mins",
    //   parterName: "John",
    //   //   avatarName: "Colin",
    // },
    // {
    //   chatName: "Maths Equations",
    //   date: "33/01/1988",
    //   duration: "22mins",
    //   parterName: "John",
    //   avatarName: "Janet",
    // },
    // {
    //   chatName: "Physiocs Equations",
    //   date: "33/01/1988",
    //   duration: "22mins",
    //   parterName: "Fred",
    //   avatarName: "Stuart",
    // },
    // {
    //   chatName: "Physiocs Equations",
    //   date: "33/01/1988",
    //   duration: "22mins",
    //   parterName: "Fred",
    //   avatarName: "Ben",
    // },
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
      <SafeAreaView className="flex-1 w-full flex flex-col  items-center justify-start">
        <Text>ChatPreview</Text>

        <MentorChatList data={chatlistData} />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default ChatPreview;
