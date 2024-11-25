import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../../Profile/EditProfile/Avatar/Avatar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../../Loading/LoadingSpinner";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useChatRoom } from "@/app/context/chatRoomContext";

const ChatroomHeader = ({ setDisplayConfirmEndOfSessionModal }) => {
  const { userDetails } = useAuth();
  const { chatRoomData } = useChatRoom();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white h-[130px] w-full ">
      <View className="flex  shadow ">
        <View className="flex flex-row items-center justify-between">
          {!chatRoomData?.connectedMentor ? (
            <View className=" flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                className="m-2"
                onPress={() => {
                  setDisplayConfirmEndOfSessionModal(true);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Entypo name="cross" size={34} color="black" />
              </TouchableOpacity>
              <Text className="text-base font-semibold">
                Looking for a mentor ...
              </Text>
              <Loading size={80} />
            </View>
          ) : (
            <View className="flex flex-row items-center justify-between w-full p-2 ">
              <TouchableOpacity
                className="m-2"
                onPress={() => {
                  navigation.navigate("chats", { key: Math.random() });
                }}
              >
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>

              {/* {chatRoomData?.sessionCompleted &&
                userDetails?.mode === "mentee" && (
                  <TouchableOpacity
                    className="m-2"
                    onPress={() => {
                      navigation.navigate("chats", { key: Math.random() });
                    }}
                  >
                    <Ionicons name="chevron-back" size={24} color="black" />
                  </TouchableOpacity>
                )} */}

              {!chatRoomData.connectedMentor && (
                <TouchableOpacity
                  className="m-2"
                  onPress={() => {
                    navigation.navigate("chats", { key: Math.random() });
                  }}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
              )}

              <View className=" flex flex-row justify-center items-center">
                <Avatar
                  avatarName={
                    userDetails?.mode === "mentee"
                      ? chatRoomData?.mentorAvatar
                      : chatRoomData?.menteeAvatar
                  }
                />
                <View className="flex flex-col items-center">
                  {userDetails?.mode === "mentee" ? (
                    <Text className="text-lg p-2 text-black">
                      {chatRoomData?.mentorName}
                    </Text>
                  ) : (
                    <Text className="text-lg p-2 text-black">
                      {chatRoomData?.menteeName}
                    </Text>
                  )}
                </View>
              </View>
              {/* <TouchableOpacity
                className="m-2"
                onPress={() => {
                  setDisplayPDFModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="export-variant"
                  size={24}
                  color="black"
                />
              </TouchableOpacity> */}

              <View></View>
              {!chatRoomData?.sessionCompleted &&
                userDetails.mode === "mentor" && (
                  <TouchableOpacity
                    className="m-2"
                    onPress={() => {
                      setDisplayConfirmEndOfSessionModal(true);
                    }}
                  >
                    <Entypo name="cross" size={34} color="black" />
                  </TouchableOpacity>
                )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatroomHeader;