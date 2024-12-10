import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";
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
import LoadedImage from "./Chatroom/Messaging/LoadedImage";
import FadeInView from "../Effects/FadeInView";
import NavHeaderBar from "../Navigation/NavHeaderBar";

import ChatItem from "./ChatItem";
import { useChat } from "@/app/context/chatContext";

const ChatPreview = ({ setCompletedSessionWeb, setRoomIdWeb }) => {
  const { userDetails, user } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const { completedChats, allChats } = useChat();

  const { width } = useWindowDimensions();

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

  const content = (
    <View className="flex w-full h-full items-center  rounded-2xl  bg-white  ">
      <View className="flex flex-row justify-start mt-2">
        <Text className="text-2xl font-bold ml-2">Chats</Text>
      </View>

      <SearchChats
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchArr={searchArr}
      />
      <ScrollView
        showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-full h-full flex"
      >
        {!searchInput ? (
          <View className="w-full flex items-center p-2 ">
            {userDetails?.mode === "mentor" && (
              <NewQuestionList
                setCompletedSessionWeb={setCompletedSessionWeb}
                setRoomIdWeb={setRoomIdWeb}
              />
            )}
            <ActiveChatroomList
              setCompletedSessionWeb={setCompletedSessionWeb}
              setRoomIdWeb={setRoomIdWeb}
            />
            <CompletedChatList
              setCompletedSessionWeb={setCompletedSessionWeb}
              setRoomIdWeb={setRoomIdWeb}
            />
            <Image
              className="   rounded-full h-[210px] w-[210px] my-[40px] opacity-25"
              source={require("../../../assets/images/CMlogo.png")}
            />
          </View>
        ) : filteredSearch.length > 0 ? (
          <View className="w-full p-2">
            <FlatList
              nestedScrollEnabled
              style={{ width: "100%" }}
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
          <View className="  mt-20 flex flex-col justify-center items-center w-full h-full ">
            <Text className="text-base font-bold">No results found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View
      className={`flex-col bg-white h-full  items-center justify-start shadow rounded-2xl   ${
        Platform.OS === "web" && width < 900
          ? " w-[50%]"
          : Platform.OS === "web"
          ? " w-[30%]"
          : "w-full"
      } `}
    >
      {Platform.OS === "web" ? (
        content
      ) : (
        <SafeAreaView>
          {content}
          {width > 500 ? <NavHeaderBar /> : <GradientNavigation />}
        </SafeAreaView>
      )}
    </View>
  );
};

export default ChatPreview;
