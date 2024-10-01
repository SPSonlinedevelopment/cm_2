import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "../Profile/Avatar";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import { useAuth } from "@/app/context/authContext";
import CreateRoomIfNotExists from "./SendData/CreateRoomIfNotExists";
import { getObjectAsyncStorage } from "../../../utils/common";
import DateToDayConverter from "./DateToDayConverter";

import ChatPreviewModal from "../Chats/ChatPreviewModal";

const ChatItem = ({
  item,
  noBorder,
  newQuestion,
  completedSession,
  activeSession,
}) => {
  const { userDetails } = useAuth();
  const [lastMessage, setLastMessage] = useState("");
  const [displayPreview, setDisplayPreview] = useState(false);
  const navigation = useNavigation();

  const openChatRoom = async () => {
    if (newQuestion) {
      setDisplayPreview(true);
    } else {
      navigation.navigate("chat-room", {
        roomId: item?.roomId,
        completedSession: completedSession,
      });
    }
  };

  useEffect(() => {
    const getDataFromAsyncStore = async () => {
      try {
        const result = await getObjectAsyncStorage(item?.roomId);
        setLastMessage(result);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromAsyncStore();
  }, []);

  return (
    <TouchableOpacity
      delayLongPress={100}
      delayPressIn={100}
      onPress={() => openChatRoom()}
      className={`flex-row h-[76px] flex   justify-between items-center    my-0.5 rounded-xl${
        noBorder && !newQuestion
          ? "border-t-0 border-l-0 border-r-0 border-b-2 border-neutral-200"
          : ""
      }  `}
    >
      <ChatPreviewModal
        roomId={item?.roomId}
        message={item}
        displayPreview={displayPreview}
        setDisplayPreview={setDisplayPreview}
      />

      <View
        className={`flex-row items-center justify-between   h-full w-full rounded-lg  px-2 py-2  
      ${newQuestion ? "bg-purple-600" : activeSession ? "bg-orange-200" : ""}
      
      `}
      >
        {newQuestion && userDetails.mode === "mentor" && (
          <Avatar avatarName={item.menteeAvatarName} />
        )}

        {!newQuestion && userDetails.mode === "mentee" && (
          <Avatar avatarName={item.mentorAvatar} />
        )}

        {!newQuestion && userDetails.mode === "mentor" && (
          <Avatar avatarName={item.menteeAvatar} />
        )}

        {/* <Text>{item.roomId}</Text> */}

        <View
          className={`h-full w-[80%] mx-4 flex flex-col justify-between 
          }
        `}
        >
          <View className="flex-row justify-between ">
            <View className="font-semibold  w-full flex flex-row justify-between items-center text-base text-black-200">
              {userDetails?.mode === "mentor" ? (
                <Text
                  className={`font-extrabold text-base ${
                    newQuestion ? "text-white" : "text-black-200"
                  } `}
                >
                  {item?.menteeName}
                </Text>
              ) : (
                <Text className="font-extrabold text-base text-black-200">
                  {item?.mentorName}
                </Text>
              )}

              {item?.questionSubject && (
                <Text
                  className={`text-neutral-300  text-xs ${
                    newQuestion ? "font-bold text-white" : "text-neutral-500"
                  } `}
                >
                  {item?.questionSubject} {" "}
                  {item.sessionName && (
                    <Text className=" text-xs ">{item.sessionName}</Text>
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
          </View>

          {lastMessage && !newQuestion && (
            <View className=" w-full ">
              <Text className="  truncate text-neutral-500 text-sm whitespace-nowrap">
                {lastMessage}
              </Text>
            </View>
          )}

          {newQuestion && (
            <View>
              <Text className=" text-sm  text-white  text-ellipsis">
                {item?.initialMessage}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
