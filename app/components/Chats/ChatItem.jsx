import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "../Profile/Avatar";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import { useAuth } from "@/app/context/authContext";
import CreateRoomIfNotExists from "./SendData/CreateRoomIfNotExists";
import { getObjectAsyncStorage } from "../../../utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { roomRef } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import ChatPreviewModal from "../Chats/ChatPreviewModal";

const ChatItem = ({
  item,
  index,
  noBorder,
  newQuestion,
  completedSession,
  activeSession,
}) => {
  console.log("🚀 ~ item1234:", item);
  console.log("🚀 ~ newQuestion:", newQuestion);
  // console.log("🚀 ~ item123:", item);
  const { userDetails } = useAuth();
  const [lastMessage, setLastMessage] = useState("");
  const [unReadMessages, setUnreadMessages] = useState(1);

  const [displayPreview, setDisplayPreview] = useState(false);

  const navigation = useNavigation();

  const openChatRoom = async () => {
    if (newQuestion) {
      setDisplayPreview(true);
    } else {
      navigation.navigate("chat-room", {
        roomId: item?.id,
        completedSession: false,
      });
    }
  };

  // const roomRefDoc = doc(roomRef, item?.roomId);

  //   useEffect(() => {
  // let unsub

  // unsub = onSnapshot(roomRefDoc, (docSnapshot) => {
  //   const roomData = docSnapshot.data()

  //   const unreadMessages = roomData.
  //   if()
  // })

  //   }, []);

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

  const dateOfSession = convertFirebaseTimestampToDate(item?.createdAt);
  return (
    <TouchableOpacity
      delayLongPress={100}
      delayPressIn={100}
      onPress={() => openChatRoom()}
      className={`flex-row h-[80px] flex   justify-between items-center    my-0.5 rounded-xl${
        noBorder && !newQuestion
          ? "border-t-0 border-l-0 border-r-0 border-b-2 border-neutral-200"
          : ""
      }  `}
    >
      <ChatPreviewModal
        roomId={item?.id}
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

        <Text>{item.roomId}</Text>

        <View
          className={`h-full w-[80%] mx-4 flex flex-col justify-between 
          }
        `}
        >
          <View className="flex-row justify-between ">
            {newQuestion ? (
              <View>
                <Text
                  className="text-white font-bold text-lg
"
                >
                  New Question
                </Text>
                <Text
                  style={{ fontSize: 15 }}
                  className={` text-white font-bold `}
                >
                  {item?.menteeName} -{" "}
                  {item?.questionSubject && (
                    <Text
                      className={`text-neutral-500 text-xs ${
                        newQuestion
                          ? "font-bold text-white"
                          : " text-black font-bold"
                      } `}
                    >
                      {item?.questionSubject}
                    </Text>
                  )}
                </Text>
              </View>
            ) : (
              <View
                style={{ fontSize: 12 }}
                className="font-semibold text-black-200"
              >
                {userDetails?.mode === "mentor" ? (
                  <Text
                    style={{ fontSize: 12 }}
                    className="font-extrabold text-black-700"
                  >
                    {item?.menteeName} -{" "}
                    {item?.questionSubject && (
                      <Text
                        className={`text-neutral-500 text-xs ${
                          newQuestion
                            ? "font-bold text-white"
                            : " text-black font-bold"
                        } `}
                      >
                        {item?.questionSubject}
                      </Text>
                    )}
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 12 }}
                    className="font-semibold text-neutral-500"
                  >
                    {item?.mentorName}
                  </Text>
                )}
              </View>
            )}
          </View>

          {lastMessage && (
            <View className="mt-1 max-h-8">
              <Text className="  text-neutral-500 text-xs">{lastMessage}</Text>
            </View>
          )}

          {newQuestion ? (
            <Text className="text-neutral-500 text-xs ">{item?.message}</Text>
          ) : (
            <Text className="text-neutral-500 text-xs ">{dateOfSession}</Text>
          )}
        </View>

        <View className="h-5 w-5  rounded-full flex justify-center items-center bg-orange-400 shadow "></View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
