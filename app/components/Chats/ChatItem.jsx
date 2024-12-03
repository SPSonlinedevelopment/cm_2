import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "../Profile/EditProfile/Avatar/Avatar";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import { useAuth } from "@/app/context/authContext";

import { getObjectAsyncStorage } from "../../../utils/common";
import DateToDayConverter from "./DateToDayConverter";

import ChatPreviewModal from "../Chats/ChatPreviewModal";
import FadeInView from "../Effects/FadeInView";

const ChatItem = ({
  item,
  noBorder,
  newQuestion,
  completedSession,
  activeSession,
  setCompletedSessionWeb,
  setRoomIdWeb,
}) => {
  const { userDetails } = useAuth();
  const [lastMessage, setLastMessage] = useState("");

  const [displayPreview, setDisplayPreview] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const fetchLastMessage = async () => {
      try {
        const result = await getObjectAsyncStorage(item?.roomId);
        if (isMounted) {
          setLastMessage(result || "No messages");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching last message:", error);
          setLastMessage("Error fetching message");
        }
      }
    };
    fetchLastMessage();

    return () => {
      isMounted = false; // Cleanup function to avoid setting state on unmounted component
    };
  }, [item?.roomId]); // Re-run only if item.roomId changes

  const openChatRoom = () => {
    if (Platform.OS !== "web") {
      if (newQuestion) {
        setDisplayPreview(true);
      } else {
        navigation.navigate("chat-room", {
          roomId: item?.roomId,
          completedSession: completedSession,
        });
      }
    } else {
      setRoomIdWeb(item?.roomId);
      setCompletedSessionWeb(completedSession);
    }
  };

  return (
    <FadeInView duration={600}>
      <TouchableOpacity
        delayLongPress={100}
        delayPressIn={100}
        onPress={openChatRoom}
        className={`flex-row h-[76px] flex justify-between items-center my-0.5 rounded-xl ${
          noBorder && !newQuestion
            ? "border-t-0 border-l-0 border-r-0 border-b-2 border-neutral-200"
            : ""
        }`}
      >
        <ChatPreviewModal
          roomId={item?.roomId}
          message={item}
          displayPreview={displayPreview}
          setDisplayPreview={setDisplayPreview}
        />

        <View
          className={`flex-row items-center justify-between h-full w-full rounded-lg px-2 py-2 ${
            newQuestion ? "bg-purple-600" : activeSession ? "bg-orange-200" : ""
          }`}
        >
          {userDetails.mode === "mentor" && newQuestion && (
            <Avatar avatarName={item.menteeAvatarName} />
          )}

          {!newQuestion && userDetails.mode === "mentee" && (
            <Avatar avatarName={item.mentorAvatar} />
          )}

          {!newQuestion && userDetails.mode === "mentor" && (
            <Avatar avatarName={item.menteeAvatar} />
          )}

          <View className="h-full w-[80%] mx-4 flex flex-col justify-between">
            <View className="flex-row justify-between">
              <Text
                className={`font-extrabold text-base ${
                  newQuestion ? "text-white" : "text-black-200"
                }`}
              >
                {userDetails.mode === "mentor"
                  ? item?.menteeName
                  : item?.mentorName}
              </Text>

              {item?.questionSubject && (
                <Text
                  className={`text-xs ${
                    newQuestion ? "font-bold text-white" : "text-neutral-500"
                  }`}
                >
                  {item?.questionSubject}{" "}
                  {item.sessionName && (
                    <Text className="text-xs">{item.sessionName}</Text>
                  )}
                </Text>
              )}

              {newQuestion && (
                <Text className="text-white font-bold">New Question</Text>
              )}

              <DateToDayConverter
                newQuestion={newQuestion}
                timestamp={item.createdAt}
              />
            </View>

            {!newQuestion ? (
              <FadeInView duration={0}>
                <Text className="truncate  text-neutral-500 text-sm">
                  {lastMessage}
                </Text>
              </FadeInView>
            ) : (
              <FadeInView duration={0}>
                <Text className="text-sm text-white">
                  {item?.initialMessage}
                </Text>
              </FadeInView>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </FadeInView>
  );
};

export default ChatItem;
