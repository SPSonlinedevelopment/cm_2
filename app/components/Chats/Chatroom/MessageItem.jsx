import { View, Text, Image } from "react-native";
import React from "react";
import { useAuth } from "@/app/context/authContext";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ message }) => {
  console.log("🚀 ~ MessageItem ~ message:", message?.imageUrl);
  const { userDetails } = useAuth();

  let imageDetails = "flex items-start mb-1 ml-3 rounded-xl justify-center";

  const image = (
    <View className={`h-[200px] w-[200px] ${imageDetails}  `}>
      <Image
        style={{
          aspectRatio: 1,
          // Setting the aspect ratio to 1 will maintain the image's original aspect ratio
          resizeMode: "cover", // This will make sure the image fits inside the container while h
        }}
        className=" h-full w-full rounded-xl "
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/cm-2-5562e.appspot.com/o/images%2FlkzblUiznTUlA39EibMVPizeUXm1%2F1724165474367.jpg?alt=media&token=57fef034-d81b-4736-bdfb-c0b2e04bdf9e",
        }}
      />
    </View>
  );

  if (message?.userId === userDetails?.uid) {
    // my messagea

    if (message.imageUrl) {
      return image;
    } else
      return (
        <View className="flex-row justify-end mb-1 mr-3">
          <View style={{ width: wp(80) }}>
            <View className="flex self-end  relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl  bg-orange-200  shadow">
              <Text style={{ fontSize: hp(1.9) }}>{message?.text} </Text>
              <View className="h-3 w-2   absolute bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl   bg-orange-200  " />
            </View>
          </View>
        </View>
      );
  } else {
    // Their message

    if (message.imageUrl) {
      return image;
    } else {
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
  }
};
export default MessageItem;
