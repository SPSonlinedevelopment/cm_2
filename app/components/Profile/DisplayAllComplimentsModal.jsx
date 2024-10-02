import { View, Text, Modal } from "react-native";
import React from "react";
import ExitButton from "../Buttons/ExitButton";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "@/app/context/authContext";
import Avatar from "./Avatar";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplayAllComplimentsModal = ({
  displayAllComplimentsModal,
  setDisplayAllComplimentsModal,
  data,
}) => {
  const { userDetails } = useAuth();

  return (
    <Modal animationType="slide" visible={displayAllComplimentsModal}>
      <ExitButton toggleDisplay={setDisplayAllComplimentsModal} />

      <SafeAreaView className="flex items-center justify-start mt-20">
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Avatar avatarName={userDetails.avatarName} />
          <Text className="text-lg font-semibold">
            {userDetails?.firstName}
          </Text>

          <View className="flex w-full justify-start">
            <Text className="text-lg font-bold ml-3 text-start  ">
              Compliments
            </Text>
          </View>
          {data}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default DisplayAllComplimentsModal;
