import { View, Text, Modal } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import IconButton from "@/app/components/Buttons/IconButton";
// import { useChat } from "@/app/context/chatContext";
import { useChat } from "../../../../context/chatContext";

const ReportMessageModal = ({
  setDisplayReportMessageModal,
  displayReportMessageModal,
  messageObj,
}) => {
  const { reportInappropriateMessage } = useChat();

  return (
    <Modal
      transparent
      className="flex items-center w-full bg-opacity-50 justify-center"
      visible={displayReportMessageModal}
      animationType="fade"
    >
      <View className="h-full w-full bg-black opacity-40"></View>

      <View className="absolute bottom-0 w-full bg-white p-3 h-[340px] rounded-xl flex flex-col items-center justify-between">
        <Text className="text-xl p-3 text-center font-bold">
          Report Message?
        </Text>

        <Octicons name="report" size={50} color="red" />
        <View className="w-[90%] mt-3">
          <Text className="text-base text-black text-center">
            This message will be forwarded to the Collet Mentoring Team and
            investigated. The sender will not be notified.
          </Text>
        </View>
        <View className="flex flex-row justify-evenly items-center w-full">
          <IconButton
            textStyles="font-bold"
            containerStyles="p-2 w-[150px] h-[50px]"
            title="Confirm"
            handlePress={async () => {
              await reportInappropriateMessage(messageObj);
              setDisplayReportMessageModal(false);
            }}
          />
          <IconButton
            textStyles="font-bold text-orange"
            containerStyles="p-2 w-[150px] h-[50px] bg-transparent border border-orange-300"
            title="Cancel"
            handlePress={() => {
              setDisplayReportMessageModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ReportMessageModal;
