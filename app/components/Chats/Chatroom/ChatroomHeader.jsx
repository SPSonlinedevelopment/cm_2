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
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "../../Buttons/IconButton";

const ChatroomHeader = ({
  chatRoomData,
  setDisplyConfirmEndOfSessionModal,
}) => {
  const { userDetails } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white h-[130px]">
      <View className=" flex flex-row items-center justify-around gap-4 e  shadow ">
        <TouchableOpacity
          className="ml-2"
          onPress={() => {
            navigation.navigate("chats", { key: Math.random() });
          }}
        >
          <Entypo name="chevron-left" size={hp(4)} color="black" />
        </TouchableOpacity>

        <View className="flex flex-row items-center ">
          <Avatar
            avatarName={
              userDetails?.mode === "mentee"
                ? chatRoomData?.mentorAvatar
                : chatRoomData?.menteeAvatar
            }
          />
          <View className=" flex flex-col  items-center">
            <View className="flex flex-col items-center  ">
              {userDetails?.mode === "mentee" ? (
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-base p-2 text-black"
                >
                  mentor: {chatRoomData?.mentorName}
                </Text>
              ) : (
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-base p-2 text-black"
                >
                  mentee: {chatRoomData?.menteeName}
                </Text>
              )}
            </View>

            <View>
              <Text>{chatRoomData?.roomId}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="m-2" onPress={() => {}}>
          <MaterialCommunityIcons
            name="export-variant"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        {!chatRoomData?.sessionCompleted && userDetails.mode === "mentor" && (
          <TouchableOpacity
            className="m-2"
            onPress={() => {
              setDisplyConfirmEndOfSessionModal(true);
            }}
          >
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatroomHeader;
