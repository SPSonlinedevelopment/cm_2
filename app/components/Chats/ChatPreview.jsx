import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MentorChatList from "./ActiveChatroomList";
import CustomKeyboardView from "../CustomKeyboardView";
import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "@/app/context/chatContext";
import NewQuestionList from "./NewQuestionList";
import SearchChats from "./SearchChats";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ChatPreview = () => {
  const { getWaitingQuestions, questions, setAllChats } = useChat();

  const { userDetails, user } = useAuth();

  const navigation = useNavigation();
  if (!user || !userDetails) {
    navigation.navigate("sign-in");
    return;
  }

  useEffect(() => {
    const unsubscribe = getWaitingQuestions();
    return () => unsubscribe();
  }, []);

  let modeId;

  if (userDetails?.mode === "mentee") {
    modeId = "menteeId";
  } else {
    modeId = "mentorId";
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "rooms"), where(modeId, "==", userDetails?.uid)),
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const roomData = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          console.log("🚀 ~ roomData ~ roomData:", roomData);

          setAllChats((prev) => roomData);
        } else {
          console.log("No rooms found for this mentor/mentee");
        }
      },
      (error) => {
        console.error("Error listening for rooms:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [userDetails]);

  return (
    <View className="h-full">
      <GradientNavigation />
      <SafeAreaView className=" w-full flex-col  items-center justify-start">
        <View className=" shadow-md  flex flex-col justify-start items-start w-full ">
          <Text className="text-xl font-bold">Chats</Text>
          <Text> {userDetails?.uid}</Text>
          <Text> {user?.uid}</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ display: "flex", alignItems: "center" }}
          className="w-full h-full  flex "
        >
          <SearchChats />
          {userDetails?.mode === "mentor" && (
            <NewQuestionList data={questions} />
          )}

          <MentorChatList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatPreview;
