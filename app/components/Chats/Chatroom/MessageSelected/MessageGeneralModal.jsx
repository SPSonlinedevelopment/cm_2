import { View, Text, Modal, Alert } from "react-native";
import React, { useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useChat } from "../../../../context/chatContext";
import IconButton from "@/app/components/Buttons/IconButton";
import DeleteUserAccunt from "../../../Profile/Others/DeleteUserAccount";
import firebase from "firebase/app";
import "firebase/auth"; // Import Firebase Authentication
import { app } from "../../../../../firebaseConfig";

// interface MessageGeneralModalProps {
//   messageObj?: any;
//   text: { headerText: string; bodyText: string };
//   type?: string;
//   displayModal: boolean;
//   setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

const MessageGeneralModal = ({
  messageObj,
  text,
  type,
  displayModal,
  setDisplayModal,
}) => {
  const { reportInappropriateMessage, deleteSelectedMessage } = useChat();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let actionFunc;

  if (type === "delete") {
    actionFunc = deleteSelectedMessage;
  } else if (type === "report") {
    actionFunc = reportInappropriateMessage;
  } else if (type === "deleteAccount") {
    actionFunc = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        await app.auth().currentUser.delete();
        Alert.alert("Account delete sucessful");
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
        Alert.alert("Account delete unsucessful");
      } finally {
        setIsLoading(false);
      }
    };
  }

  return (
    <Modal
      transparent
      className="flex items-center w-full bg-opacity-50 justify-center"
      visible={displayModal}
      animationType="fade"
    >
      <View className="h-full w-full bg-black opacity-40"></View>

      <View className="absolute bottom-0 w-full bg-white p-3 h-[340px] rounded-xl flex flex-col items-center justify-between">
        <Text className="text-xl p-3 text-center font-bold">
          {text.headerText}
        </Text>

        {isLoading && <Text>Deleting account...</Text>}
        {errorMessage && <Text>{errorMessage}</Text>}

        <Octicons name="report" size={50} color="red" />
        <View className="w-[90%] mt-3">
          <Text className="text-base text-black text-center">
            {text.bodyText}
          </Text>
        </View>
        <View className="flex flex-row justify-evenly items-center w-full">
          <IconButton
            textStyles="font-bold"
            containerStyles="p-2 w-[150px] h-[50px]"
            title="Confirm"
            handlePress={async () => {
              actionFunc(messageObj);

              if (type === "deleteAccount") {
              } else {
                actionFunc(messageObj);
              }
              setDisplayModal(false);
            }}
          />
          <IconButton
            textStyles="font-bold text-orange"
            containerStyles="p-2 w-[150px] h-[50px] bg-transparent border border-orange-300"
            title="Cancel"
            handlePress={() => {
              setDisplayModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MessageGeneralModal;
