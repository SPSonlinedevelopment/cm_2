import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ActiveChatroomList from "./ActiveChatroomList";
import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import NewQuestionList from "./NewQuestionList";
import SearchChats from "./SearchChats";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CompletedChatList from "./CompletedChatList";
import FadeInView from "../Effects/FadeInView";

const ChatPreview = () => {
  const { userDetails, user } = useAuth();

  const navigation = useNavigation();
  if (!user || !userDetails) {
    navigation.navigate("sign-in");
    return;
  }

  return (
    <View className="h-full">
      <GradientNavigation />
      <SafeAreaView className=" w-full flex-col  items-center justify-start">
        <View className=" shadow-md  flex flex-col justify-start items-start w-full ">
          <Text className="text-xl font-bold">Chats</Text>
          {/* <Text> {userDetails?.uid}</Text>
          <Text> {user?.uid}</Text> */}
        </View>

        <ScrollView
          contentContainerStyle={{ display: "flex", alignItems: "center" }}
          className="w-full h-full  flex "
        >
          <SearchChats />

          {userDetails?.mode === "mentor" && <NewQuestionList />}
          <ActiveChatroomList />
          <CompletedChatList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatPreview;
