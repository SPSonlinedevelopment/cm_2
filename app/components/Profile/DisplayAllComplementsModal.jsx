import { View, Text, Modal } from "react-native";
import React from "react";
import ExitButton from "../Buttons/ExitButton";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "@/app/context/authContext";
import Avatar from "./EditProfile/Avatar/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplayAllComplementsModal = ({
  displayAllComplementsModal,
  setDisplayAllComplementsModal,
  data,
}) => {
  const { userDetails } = useAuth();

  return (
    <Modal animationType="slide" visible={displayAllComplementsModal}>
      <ExitButton toggleDisplay={setDisplayAllComplementsModal} />

      <SafeAreaView className="flex items-center justify-start pt-6 ">
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <View className="h-20 w-full " />
          <View className="flex flex-row items-center">
            <Avatar avatarName={userDetails.avatarName} />
            <Text className="text-lg font-semibold p-4">
              {userDetails?.firstName}
            </Text>
          </View>

          <View className="flex w-full justify-start">
            <Text className="text-lg font-bold ml-3 text-start  ">
              Complements
            </Text>
          </View>
          {data}
          <View className="h-20 w-full " />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default DisplayAllComplementsModal;
