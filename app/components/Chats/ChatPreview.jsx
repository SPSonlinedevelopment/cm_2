import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MentorChatList from "./MentorChatList";
import CustomKeyboardView from "../CustomKeyboardView";

import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "@/app/context/chatContext";
import NewQuestionList from "./NewQuestionList";
import { SearchBar } from "react-native-screens";
import SearchChats from "./SearchChats";
import {
  setDoc,
  Timestamp,
  doc,
  FieldValue,
  updateDoc,
  addDoc,
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
  arrayUnion,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ChatPreview = () => {
  const { getWaitingQuestions, questions } = useChat();
  const [roomDetails, setroomDetails] = useState([]);
  // console.log("🚀 ~ ChatPreview ~ questions:", questions);

  const { userDetails } = useAuth();
  // console.log("🚀 ~ ChatPreview ~ userDetails:", userDetails);

  useEffect(() => {
    const unsubscribe = getWaitingQuestions(); // Start listening for changes

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (userDetails?.uid) {
          const q = query(
            collection(db, "rooms"),
            where("mentorId", "==", userDetails?.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const roomData = querySnapshot.docs.map((doc) => {
              return doc.data();
            });
            setroomDetails((prev) => roomData);
          } else {
            console.log("No rooms found for this mentor");
          }
        } else {
          console.log("User details not available");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [userDetails]);

  const data = [
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

        {/* <Text>{JSON.stringify(roomDetails)}</Text> */}

        <MentorChatList data={roomDetails} />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default ChatPreview;
