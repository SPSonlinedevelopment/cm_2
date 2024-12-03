import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useRef } from "react";
import * as Haptics from "expo-haptics";

const MessageText = ({
  text,
  thisUsersMessage,
  time,
  handleSelectedMessage,
}) => {
  const messageRef = useRef(null);

  const data = (
    <View
      className={`flex-row  mb-1 mt-1  w-full z-50  flex ${
        thisUsersMessage ? "justify-end" : "justify-start "
      } `}
    >
      <TouchableOpacity
        ref={messageRef}
        delayPressIn={400}
        onLongPress={() => {
          handleSelectedMessage(messageRef);

          Platform.OS !== "web" &&
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        className={` relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl  max-w-[320px] rounded-br-xl shadow   ${
          thisUsersMessage
            ? "bg-orange-200 self-end  mr-3  "
            : "bg-purple self-start  ml-3"
        }   `}
      >
        <Text className={` ${thisUsersMessage ? "" : "text-white"} text-base`}>
          {text}{" "}
        </Text>

        {time && (
          <View className="flex items-end mt-1">
            <Text
              className={`text-xs ${thisUsersMessage ? "" : "text-white"}  `}
            >
              {time}
            </Text>
          </View>
        )}

        <View
          className={`h-3 w-2   absolute    ${
            thisUsersMessage
              ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
              : "bg-purple   bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
          }`}
        />
      </TouchableOpacity>
    </View>
  );

  return data;
};

export default MessageText;
