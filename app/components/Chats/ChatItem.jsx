import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../Profile/Avatar";

const ChatItem = ({ item, index, noBorder }) => {
  const openChatRoom = () => {};

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row h-[90px]  flex  justify-between items-center   py-1   `}
    >
      <View className="flex-row items-center justify-between  h-full w-full ">
        <Avatar avatarName={item.avatarName} />

        <View
          className={`h-full w-[280px] flex flex-col justify-between    ${
            noBorder
              ? " border border-l-0  border-r-0 border-t-0 border-b-neutral border-b-neutral-200 pb-1"
              : " "
          }
        `}
        >
          <View className="flex-row justify-between ">
            <Text
              style={{ fontSize: 15 }}
              className="font-semibold text-neutral-500"
            >
              {item?.chatName}
            </Text>
            <Text className="text-xs text-neutral-500">{item?.date}</Text>
          </View>

          <Text className="text-neutral-500 text-xs ">{item?.parterName}</Text>

          <Text className="text-neutral-500 text-xs ">{item?.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
