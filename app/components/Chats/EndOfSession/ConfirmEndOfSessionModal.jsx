import { View, Text, Modal, Button } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";

const ConfirmEndOfSessionModal = ({
  setDisplyConfirmEndOfSessionModal,
  setDisplayMentorFeedback,
}) => {
  return (
    <Modal className="bg-black-100 " animationType="fade">
      <View className="flex-1  justify-center items-center">
        <View className=" bg-purple opacity-100 p-3 rounded-xl flex flex-col items-center justify-between">
          <Text className="text-base text-white">
            Are you sure you want to leave chatroom?
          </Text>
          <IconButton
            containerStyles="p-2 w-[200px]"
            title="Confirm"
            handlePress={() => {
              setDisplyConfirmEndOfSessionModal(false);
              setDisplayMentorFeedback(true);
            }}
          />
          <IconButton
            containerStyles="p-2 w-[200px]"
            title="Cancel"
            handlePress={() => setDisplyConfirmEndOfSessionModal(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmEndOfSessionModal;
