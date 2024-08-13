import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({
  // currentUser,

  message,
}) => {
  // console.log("🚀 ~ message:", message);
  // if (currentUser?.userId == message?.userId) {
  //   // my message

  //   return (
  //     <View className="flex-row justify-end mb-3 mr-3">
  //       <View style={{ width: wp(80) }}>
  //         <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
  //           <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // } else {
  // Friend message
  return (
    <View style={{ width: wp(80) }} className="ml-3 mb-1">
      <View
        className={`flex self-start p-3 px-4 rounded-tl-xl rounded-tr-xl rounded-bl-md rounded-br-xl  shadow-sm  ${
          message.senderName === "Collet owl" ? "bg-purple " : "bg-white"
        } `}
      >
        <Text
          className={`${
            message.senderName === "Collet owl" ? "text-white " : ""
          }`}
          style={{ fontSize: hp(1.9) }}
        >
          {message?.text}
        </Text>
      </View>
    </View>
  );
};

export default MessageItem;
