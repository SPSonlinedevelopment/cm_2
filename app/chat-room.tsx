import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import CustomKeyboardView from "./components/CustomKeyboardView";
import { StatusBar } from "expo-status-bar";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoom = () => {
  return (
    <CustomKeyboardView>
      <View className="w-full h-full flex-col justify-between bg-slate-200">
        <ChatroomHeader user={{}} router={router} />

        <View
          style={{}}
          className=" bg-white flex items-center justify-center "
        >
          <View className="flex-row justify-between bg-white border  w-[300px] border-neutral-300 rounded-full ">
            <TextInput
              //   multiline={true}
              //   numberOfLines={10}
              style={{ fontSize: hp(2) }}
              //   className="flex-1  w-full   "
              placeholder="type message ..."
            />
            <TouchableOpacity
              //   onPress={handleSendMessage}
              className="bh-neutral-200 p-2 mr-[1px]  rounded-full"
            >
              <Feather name="send" color="#737373" size={hp(2.7)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
