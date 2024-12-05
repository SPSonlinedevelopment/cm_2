import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import FadeInView from "@/app/components/Effects/FadeInView";
import Ionicons from "@expo/vector-icons/Ionicons";

const MessageText = ({
  text,
  thisUsersMessage,
  time,
  handleSelectedMessage,
}) => {
  const messageRef = useRef(null);

  const [isMouseInside, setIsMouseInside] = useState(false);

  const data = (
    <View
      className={`flex-row  mb-1 mt-1  w-full z-50  flex ${
        thisUsersMessage ? "justify-end" : "justify-start "
      } `}
    >
      <TouchableOpacity
        onMouseEnter={() => {
          setIsMouseInside(true);
        }}
        onMouseLeave={() => {
          setIsMouseInside(false);
        }}
        ref={messageRef}
        delayPressIn={400}
        onLongPress={() => {
          handleSelectedMessage(messageRef);

          Platform.OS !== "web" &&
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        className={` relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl  ${
          Platform.OS === "web" ? "max-w-[70%]" : "max-w-[320px]"
        } rounded-br-xl shadow   ${
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

        {isMouseInside && Platform.OS === "web" && (
          <FadeInView
            duration={0}
            containerStyles="flex absolute top-0 right-0 bg-white m-1 rounded-2xl p-1 shadow"
          >
            <TouchableOpacity className=" rotate-[-90deg]" onPress={() => {}}>
              <Ionicons name="chevron-back" size={15} color="grey" />
            </TouchableOpacity>
          </FadeInView>
        )}
      </TouchableOpacity>
    </View>
  );

  return data;
};

export default MessageText;
