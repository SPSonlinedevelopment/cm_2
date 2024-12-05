import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  useWindowDimensions,
} from "react-native";
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
import Ionicons from "@expo/vector-icons/Ionicons";

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

  const [isMouseInside, setIsMouseInside] = useState(false);
  const { width } = useWindowDimensions();

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
    <View duration={Platform.OS === "web" ? 0 : 400}>
      <ChatPreviewModal
        roomId={item?.roomId}
        message={item}
        displayPreview={displayPreview}
        setDisplayPreview={setDisplayPreview}
      />

      <TouchableOpacity
        onMouseEnter={() => {
          setIsMouseInside(true);
        }}
        onMouseLeave={() => {
          setIsMouseInside(false);
        }}
        delayLongPress={100}
        delayPressIn={100}
        onPress={openChatRoom}
        className={`flex-row w-full h-[76px]  pr-2  ${
          Platform.OS === "web" ? "h-[76px]" : "h-[76px]"
        }  items-center my-0.5   rounded-xl ${
          noBorder && !newQuestion
            ? "border-t-0 border-l-0 border-r-0  border-b-2 border-neutral-200"
            : ""
        }

   ${isMouseInside && "bg-[#F0F2F5] "}
       
        ${
          newQuestion
            ? isMouseInside
              ? "bg-purple-900" // When newQuestion and isMouseInside are true
              : "bg-purple-600" // When only newQuestion is true
            : activeSession
            ? isMouseInside
              ? "bg-orange-200" // When activeSession and isMouseInside are true
              : "bg-orange-100" // When only activeSession is true
            : "" // Default case
        }

   


        
        `}
      >
        <View className="h-full w-full flex flex-row rounded-lg px-2 py-2">
          {userDetails.mode === "mentor" && newQuestion && (
            <Avatar avatarName={item.menteeAvatarName} />
          )}

          {!newQuestion && userDetails.mode === "mentee" && (
            <Avatar avatarName={item.mentorAvatar} />
          )}

          {!newQuestion && userDetails.mode === "mentor" && (
            <Avatar avatarName={item.menteeAvatar} />
          )}

          <View className="h-full w-[80%] mx-4 flex flex-col justify-between relative">
            {newQuestion && (
              <Text className="text-white font-bold">New Question</Text>
            )}
            <View className="flex-row justify-between items-center ">
              <Text
                className={`font-extrabold text-base ${
                  newQuestion ? "text-white" : "text-black-200"
                }`}
              >
                {userDetails.mode === "mentor"
                  ? item?.menteeName
                  : item?.mentorName}
              </Text>

              {item?.questionSubject && Platform.OS !== "web" && (
                <Text
                  className={`text-xs mr-3 ${
                    newQuestion ? "font-bold  text-white" : "text-neutral-500"
                  }`}
                >
                  {item?.questionSubject}
                </Text>
              )}

              {item.sessionName && (
                <Text className="text-xs mx-2 text-neutral-500">
                  {item.sessionName}
                </Text>
              )}

              {width > 800 && Platform.OS === "web" ? (
                <DateToDayConverter
                  newQuestion={newQuestion}
                  timestamp={item.createdAt}
                />
              ) : Platform.OS !== "web" ? (
                <DateToDayConverter
                  newQuestion={newQuestion}
                  timestamp={item.createdAt}
                />
              ) : null}
            </View>

            {!newQuestion ? (
              <FadeInView containerStyles="truncate">
                <Text className="truncate  text-neutral-500  text-xs">
                  {lastMessage}
                </Text>
              </FadeInView>
            ) : (
              <FadeInView>
                <Text className="text-xs truncate text-white">
                  {item?.initialMessage}
                </Text>
              </FadeInView>
            )}

            {isMouseInside && Platform.OS === "web" && (
              <FadeInView containerStyles="flex absolute bottom-0 right-0">
                <TouchableOpacity
                  className=" rotate-[-90deg]"
                  onPress={() => {}}
                >
                  <Ionicons name="chevron-back" size={20} color="grey" />
                </TouchableOpacity>
              </FadeInView>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatItem;
