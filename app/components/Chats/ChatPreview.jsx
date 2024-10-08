import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import ActiveChatroomList from "./ActiveChatroomList";
import GradientNavigation from "../Profile/MenteeProfile/GradientNaviation/GradientNavigation";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import NewQuestionList from "./NewQuestionList";
import SearchChats from "./SearchChats";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CompletedChatList from "./CompletedChatList";

import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const ChatPreview = () => {
  const { userDetails, user } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const { completedChats, allChats } = useChat();

  let searchArr;

  if (completedChats && allChats) {
    searchArr = [...completedChats, ...allChats];
  }

  const navigation = useNavigation();
  if (!user || !userDetails) {
    navigation.navigate("sign-in");
    return;
  }

  // Assuming searchArr is an array of elements with the defined type
  let filteredSearch = searchArr?.filter((item) => {
    const lowercaseSearch = searchInput.toLowerCase();

    return (
      item?.questionSubject?.toLowerCase().includes(lowercaseSearch) ||
      item?.initialMessage?.toLowerCase().includes(lowercaseSearch) ||
      item?.mentorName?.toLowerCase().includes(lowercaseSearch) ||
      item?.menteeName?.toLowerCase().includes(lowercaseSearch) ||
      item?.sessionName?.toLowerCase().includes(lowercaseSearch)
    );
  });

  return (
    <View className="h-full">
      <GradientNavigation />
      <SafeAreaView className=" w-full flex-col  items-center justify-start ">
        <View className=" shadow-md  flex flex-col justify-start items-start w-full  ">
          <Text className="text-xl font-bold">Chats</Text>
          {/* <Text> {userDetails?.uid}</Text>
          <Text> {user?.uid}</Text> */}
        </View>
        <SearchChats
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchArr={searchArr}
        />
        <ScrollView
          contentContainerStyle={{ display: "flex", alignItems: "center" }}
          className="w-full h-full flex"
        >
          {userDetails?.mode === "mentor" && <NewQuestionList />}

          {!searchInput ? (
            <>
              <ActiveChatroomList />
              <CompletedChatList />
            </>
          ) : filteredSearch.length > 0 ? (
            <View>
              <FlatList
                style={{ width: "95%" }}
                data={filteredSearch}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <ChatItem
                    newQuestion={false}
                    activeSession={false}
                    completedSession={true}
                    item={item}
                    index={index}
                    noBorder={filteredSearch.length !== index + 1}
                  />
                )}
              />
            </View>
          ) : (
            <View className="items-center justify-center">
              <Text className="mt-7 text-base font-bold">No results found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatPreview;
