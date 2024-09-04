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
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/context/authContext";
import IsTypingIndictator from "./IsTypingIndicator";

const ChatroomHeader = ({ item }) => {
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  return (
    <View className=" h-[135px] flex flex-row items-end justify-between gap-4 bg-white pb-2 shadow ">
      <TouchableOpacity
        className="ml-2"
        onPress={() => navigation.navigate("chats", { key: Math.random() })}
      >
        <Entypo name="chevron-left" size={hp(4)} color="black" />
      </TouchableOpacity>
      <View className="flex flex-row items-center ">
        <Avatar />

        <View className="flex flex-col items-center  ">
          {userDetails?.mode === "mentee" ? (
            <Text
              style={{ fontSize: hp(2) }}
              className=" text-base p-2 text-black"
            >
              mentor: {item?.item.mentorName}
            </Text>
          ) : (
            <Text
              style={{ fontSize: hp(2) }}
              className=" text-base p-2 text-black"
            >
              mentee: {item?.item.menteeName}
            </Text>
          )}
          <View>
            <IsTypingIndictator roomId={item.roomId} isTyping={isTyping} />
          </View>
        </View>

        <View>
          <Text>{item?.item.roomId}</Text>
        </View>
      </View>

      <TouchableOpacity className="m-2" onPress={() => {}}>
        <MaterialCommunityIcons name="export-variant" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatroomHeader;
