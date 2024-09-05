import { View, Text, Modal, Button } from "react-native";
import React from "react";

const ConfirmEndOfSessionModal = ({ setDisplyConfirmEndOfSessionModal }) => {
  const handleConfirm = () => {};

  return (
    <Modal animationType="fade" className="h-[600px]">
      <View className="flex-1 justify-center items-center">
        <View className=" h-full w-full opacity-50 flex-1 justify-center items-center">
          <View className=" bg-purple opacity-100">
            <Text>Are you sure you want to confirm?</Text>
            <Button title="Confirm" onPress={handleConfirm} />
            <Button
              title="Cancel"
              onPress={() => setDisplyConfirmEndOfSessionModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmEndOfSessionModal;
