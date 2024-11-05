import { View, Text, Modal, ScrollView } from "react-native";
import React from "react";
import ExitButton from "../../Buttons/ExitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";
import { AchievementListView } from "./Achievements";
import CustomKeyboardView from "../../CustomKeyboardView";

const AchievementsModal = ({
  setDisplayAchievementsModal,
  displayAchievementsModal,
}) => {
  const { userDetails } = useAuth();

  return (
    <Modal animationType="slide" visible={displayAchievementsModal}>
      <SafeAreaView className="flex items-center justify-start ">
        <ExitButton toggleDisplay={setDisplayAchievementsModal} />
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <View className="h-[100px] w-full" />

          <View className="flex flex-row justify-between items-center">
            <Avatar avatarName={userDetails?.avatarName} />
            <Text className="text-lg font-semibold m-4">
              {userDetails?.firstName}
            </Text>
          </View>

          <View className="flex w-full justify-start">
            <Text className="text-lg font-bold ml-3 text-start  ">
              Achievements
            </Text>
          </View>

          <AchievementListView displayDescription={true} />
          <View className="h-[100px] w-full " />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AchievementsModal;
