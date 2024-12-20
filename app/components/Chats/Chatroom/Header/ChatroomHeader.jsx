import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
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

  const [findingMentorText, setFindingMentorText] = useState(
    "Looking for a mentor ..."
  );
  const messages = [
    "Still looking, please wait!",
    "Hmm... taking longer than expected, bear with us!",
    "We have let the mentor know you are waiting!",
  ];

  useEffect(() => {
    if (!chatRoomData?.connectedMentor) {
      let count = 0;

      const intervalId = setInterval(() => {
        setFindingMentorText(messages[count]);
        count = (count + 1) % messages.length;
      }, 4000);

      return () => clearInterval(intervalId);
    }
  }, [chatRoomData?.connectedMentor]);

  const ios = Platform.OS === "ios";

  const content = (
    <View className="flex    rounded-t-2xl   bg-white ">
      <View className="flex flex-row items-center justify-between">
        {!chatRoomData?.connectedMentor ? (
          <View className=" flex flex-row items-center w-full justify-between">
            <TouchableOpacity
              className="m-2"
              onPress={() => {
                setDisplayConfirmEndOfSessionModal(true);

                Platform.OS !== "web" &&
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Entypo name="cross" size={34} color="black" />
            </TouchableOpacity>
            <View className="w-[200px]">
              <Text className="text-base text-center  font-semibold">
                {findingMentorText}
              </Text>
            </View>

            <Loading size={80} />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between w-full p-2 ">
            {Platform.OS !== "web" ? (
              <TouchableOpacity
                className="m-2"
                onPress={() => {
                  navigation.navigate("chats", { key: Math.random() });
                }}
              >
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <View className=" "></View>
            )}

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

            <View className="  flex flex-row justify-center items-center">
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

            {!chatRoomData?.sessionCompleted &&
            userDetails.mode === "mentor" ? (
              <TouchableOpacity
                className="m-2"
                onPress={() => {
                  setDisplayConfirmEndOfSessionModal(true);
                }}
              >
                <Entypo name="cross" size={34} color="black" />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  return Platform.OS === "web" ? (
    content
  ) : (
    <SafeAreaView
      className={`bg-white  ${
        Platform.OS === "web" && "border-none rounded-2xl"
      }} w-full ${ios ? "h-[139px]" : ""}  `}
    >
      {content}
    </SafeAreaView>
  );
};

export default ChatroomHeader;
