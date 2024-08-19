import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../Profile/Avatar";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import { useAuth } from "@/app/context/authContext";

const ChatItem = ({ item, index, noBorder, newQuestion }) => {
  const { userDetails } = useAuth();

  const navigation = useNavigation();
  const openChatRoom = () => {
    navigation.navigate("chat-room", {
      isNewQuestion: newQuestion,
      item: item,
    });
  };

  const dateOfSession = convertFirebaseTimestampToDate(item?.createdAt);

  return (
    <TouchableOpacity
      delayLongPress={100}
      delayPressIn={100}
      onPress={openChatRoom}
      className={`flex-row h-[90px]  flex  justify-between items-center   py-1   `}
    >
      <View
        className={`flex-row items-center justify-between  h-full w-full rounded-lg px-2 py-2  
      ${newQuestion ? "bg-purple-300" : ""}
      
      `}
      >
        <Avatar avatarName={item.avatarName} />

        <View
          className={`h-full w-[280px] flex flex-col justify-between  ${
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
                  className={`font-semibold text-neutral-500  ${
                    newQuestion
                      ? "font-extrabold text-black-100"
                      : "font-semibold"
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
                    className="font-semibold text-neutral-500"
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
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
