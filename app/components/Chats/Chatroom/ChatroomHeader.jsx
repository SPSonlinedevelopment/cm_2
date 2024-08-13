import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "../../Profile/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatroomHeader = ({ user, router }) => {
  return (
    <View className=" h-[135px] flex flex-row items-end justify-between gap-4 bg-white pb-2 shadow ">
      <TouchableOpacity className="m-2" onPress={() => router?.back()}>
        <Entypo name="chevron-left" size={hp(4)} color="black" />
      </TouchableOpacity>

      <View className="flex flex-row items-center ">
        <Avatar />
        <Text style={{ fontSize: hp(2) }} className=" text-base p-2 text-black">
          {/* {user.item.menteeName} */}
        </Text>
      </View>

      <TouchableOpacity className="m-2" onPress={() => {}}>
        <MaterialCommunityIcons name="export-variant" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatroomHeader;
