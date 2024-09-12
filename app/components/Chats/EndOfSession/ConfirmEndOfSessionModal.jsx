import { View, Text, Modal, Button, Alert } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Timestamp } from "firebase/firestore";

const ConfirmEndOfSessionModal = ({
  setDisplyConfirmEndOfSessionModal,
  setDisplayMentorFeedback,
  roomId,
}) => {
  const handleConfirmEndSession = async () => {
    const roomRef = doc(db, "rooms", roomId);

    try {
      await updateDoc(roomRef, {
        sessionCompleted: true,
        sessionCompletedAt: Timestamp.now(),
      });

      console.log("updated Update completed at for room");
    } catch (error) {
      console.log("error updating room completed status", error);
    }
  };

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
              handleConfirmEndSession();
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
