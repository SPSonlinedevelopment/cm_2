import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../Profile/EditProfile/Avatar/Avatar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../Loading/LoadingSpinner";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChatroomHeader = ({
  chatRoomData,
  setDisplyConfirmEndOfSessionModal,
}) => {
  const { userDetails } = useAuth();
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
                  setDisplyConfirmEndOfSessionModal(true);
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
              {userDetails.mode === "mentor" && (
                <TouchableOpacity
                  className="m-2"
                  onPress={() => {
                    navigation.navigate("chats", { key: Math.random() });
                  }}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
              )}
              {chatRoomData?.sessionCompleted &&
                userDetails?.mode === "mentee" && (
                  <TouchableOpacity
                    className="m-2"
                    onPress={() => {
                      navigation.navigate("chats", { key: Math.random() });
                    }}
                  >
                    <Ionicons name="chevron-back" size={24} color="black" />
                  </TouchableOpacity>
                )}

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
                    mentor: {chatRoomData?.mentorName}
                  </Text>
                ) : (
                  <Text className="text-lg p-2 text-black">
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
