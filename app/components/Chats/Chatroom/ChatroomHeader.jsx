import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "../../Profile/Avatar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/context/authContext";
import IsTypingIndictator from "./IsTypingIndicator";
import { SafeAreaView } from "react-native-safe-area-context";
import FindingMentor from "../../Effects/FindingMentor";
import LoadingDots from "../../Loading/LoadingDots";
import Loading from "../../Loading/LoadingSpinner";

const ChatroomHeader = ({
  chatRoomData,
  setDisplyConfirmEndOfSessionModal,
}) => {
  console.log("🚀 ~ chatRoomData123:", chatRoomData);
  const { userDetails } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white h-[130px]">
      <View className="flex flex-row items-center justify-around gap-4 shadow">
        <View className="flex flex-row items-center">
          {!chatRoomData?.connectedMentor ? (
            <View className=" flex flex-row items-center w-full justify-center">
              <Text className="text-base font-semibold">
                Looking for a mentor ...
              </Text>
              <Loading size={80} />
            </View>
          ) : (
            <View className="flex flex-row items-center">
              <TouchableOpacity
                className="ml-2"
                onPress={() => {
                  navigation.navigate("chats", { key: Math.random() });
                }}
              >
                <Entypo name="chevron-left" size={hp(4)} color="black" />
              </TouchableOpacity>
              <Avatar
                avatarName={
                  userDetails?.mode === "mentee"
                    ? chatRoomData?.mentorAvatar
                    : chatRoomData?.menteeAvatar
                }
              />
              <View className="flex flex-col items-center">
                {userDetails?.mode === "mentee" ? (
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="text-base p-2 text-black"
                  >
                    mentor: {chatRoomData?.mentorName}
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="text-base p-2 text-black"
                  >
                    mentee: {chatRoomData?.menteeName}
                  </Text>
                )}
              </View>

              <Text>{chatRoomData?.roomId}</Text>
              <TouchableOpacity className="m-2" onPress={() => {}}>
                <MaterialCommunityIcons
                  name="export-variant"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>

              {!chatRoomData?.sessionCompleted &&
                userDetails.mode === "mentor" && (
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
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatroomHeader;
