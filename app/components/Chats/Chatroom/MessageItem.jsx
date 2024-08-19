import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/app/context/authContext";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ message }) => {
  const { userDetails } = useAuth();

  if (message?.userId === userDetails?.uid) {
    // my message

    return (
      <View className="flex-row justify-end mb-1 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end  relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl  bg-orange-200  shadow">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
            <View className="h-3 w-2   absolute bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl   bg-orange-200  " />
          </View>
        </View>
      </View>
    );
  } else {
    // Their message
    return (
      <View style={{ width: wp(80) }} className="ml-3 mb-1">
        <View
          className={`flex self-start relative p-3  rounded-tl-xl rounded-tr-xl  rounded-bl-xl rounded-br-xl shadow  ${
            message?.senderName === "Collet owl" ? "bg-purple " : "bg-white"
          } `}
        >
          <Text
            className={`${
              message?.senderName === "Collet owl" ? "text-white " : ""
            }`}
            style={{ fontSize: hp(1.9) }}
          >
            {message?.text}
          </Text>
          {message?.senderName !== "Collet owl" && (
            <View className="h-3 w-2 absolute bottom-0 rotate-[30deg] left-[-2px] rounded-br-xl bg-white"></View>
          )}
        </View>
      </View>
    );
  }
};
export default MessageItem;
