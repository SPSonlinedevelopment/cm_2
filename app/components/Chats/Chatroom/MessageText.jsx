import { View, Text } from "react-native";
import React from "react";

const MessageText = ({ text, thisUsersMessage, time }) => {
  return (
    <View
      className={`flex-row  mb-1 mt-1  w-full  flex ${
        thisUsersMessage ? "justify-end" : "justify-start "
      } `}
    >
      <View
        className={`flex relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm  ${
          thisUsersMessage
            ? "bg-orange-200 self-end  mr-3  "
            : "bg-white self-start  ml-3"
        }   `}
      >
        <Text className="text-base">{text} </Text>

        {time && (
          <View className="flex items-end mt-1">
            <Text className="text-xs ">
              {/* {time.hours}:{time.minutes} {time.period} */}
              {time}
            </Text>
          </View>
        )}

        <View
          className={`h-3 w-2   absolute    ${
            thisUsersMessage
              ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
              : "bg-white  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
          }`}
        />
      </View>
    </View>
  );
};

export default MessageText;
