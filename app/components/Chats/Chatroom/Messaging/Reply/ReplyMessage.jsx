import { View, Text } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const ReplyMessage = ({ userId, message, thisUsersMessage }) => {
  return (
    <View
      className={`flex-row  pb-2 w-full  shadow   flex ${
        thisUsersMessage ? "justify-end " : "justify-start "
      } `}
    >
      <View
        className={` rounded-xl ${
          thisUsersMessage
            ? "bg-orange-200 self-end   mr-2   "
            : "bg-purple-700 self-start ml-2  "
        }`}
      >
        <View>
          <View
            className={`flex  relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow  ${
              thisUsersMessage
                ? "bg-orange-300 self-end    "
                : "bg-purple self-start  "
            }   `}
          >
            <View className=" flex flex-row items-center  ">
              <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[30px] w-[30px]  m-1.5">
                <Entypo name="reply" size={20} color="white" />
              </View>

              <Text
                className={`text-base font-bold  ${
                  thisUsersMessage ? "" : "text-white"
                } `}
              >
                {message.reply.originalMessageSenderId === userId
                  ? "You"
                  : message.userName}
              </Text>
            </View>

            <Text
              className={` ${thisUsersMessage ? "" : "text-white"} text-base`}
            >
              {" "}
              {message.reply.originalMessage}
            </Text>
          </View>
        </View>

        <View className="p-2">
          <Text
            className={` ${thisUsersMessage ? "" : "text-white"} text-base`}
          >
            {message.text}
          </Text>
        </View>

        <View
          className={`h-3 w-2   absolute    ${
            thisUsersMessage
              ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
              : "bg-purple-700  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
          }`}
        />
      </View>
    </View>
  );
};

export default ReplyMessage;
