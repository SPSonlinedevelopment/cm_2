import { View, Text, TouchableOpacity } from "react-native";
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

const ChatItem = ({ item, index, noBorder, newQuestion }) => {
  const { userDetails } = useAuth();
  const [lastMessage, setLastMessage] = useState("");
  const [unReadMessages, setUnreadMessages] = useState(1);

  const navigation = useNavigation();

  const openChatRoom = async () => {
    if (newQuestion) {
      try {
        const result = await CreateRoomIfNotExists(item, userDetails);
        console.log("create room result", result.message);
        if (result.success) {
          setNewRoomCreated(true);
          navigation.navigate("chat-room", {
            item: item,
          });
        }
      } catch (error) {
        console.error("Error creating room:", error);
        // Handle error if needed
      }
    } else {
      navigation.navigate("chat-room", {
        item: item,
      });
    }
  };

  //   const roomRefDoc = doc(roomRef, item?.roomId);

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
      onPress={openChatRoom}
      className={`flex-row h-[90px]  flex  justify-between items-center   py-1   `}
    >
      <View
        className={`flex-row items-center justify-between   h-full w-full rounded-lg  px-2 py-2  
      ${newQuestion ? "bg-purple-300" : ""}
      
      `}
      >
        <Avatar avatarName={item.avatarName} />

        <View
          className={`h-full w-[250px] flex flex-col justify-bertween ${
            noBorder && !newQuestion
              ? "border-t-0 border-l-0 border-r-0 border-b-2 border-neutral-200"
              : ""
          }
          }
        `}
        >
          <View className="flex-row justify-between ">
            {newQuestion ? (
              <>
                <Text
                  style={{ fontSize: 15 }}
                  className={`font-bold text-black-700  ${
                    newQuestion
                      ? "font-extrabold text-black-100"
                      : " text-black-100 font-extrabold"
                  }`}
                >
                  {item?.menteeName}
                </Text>
              </>
            ) : (
              <View
                style={{ fontSize: 12 }}
                className="font-semibold text-neutral-500"
              >
                {userDetails?.mode === "mentor" ? (
                  <Text
                    style={{ fontSize: 12 }}
                    className="font-extrabold text-black-700"
                  >
                    {item?.menteeName}
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

          <Text
            className={`text-neutral-500 text-xs ${
              newQuestion ? "font-extrabold text-black-100" : "font-semibold"
            } `}
          >
            {item?.questionSubject}
          </Text>

          {newQuestion ? (
            <Text className="text-neutral-500 text-xs ">{item?.message}</Text>
          ) : (
            <Text className="text-neutral-500 text-xs ">{dateOfSession}</Text>
          )}
        </View>

        <View className="h-5 w-5  rounded-full flex justify-center items-center bg-orange-400 shadow ">
          <Text className="text-xs text-white ">1</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
