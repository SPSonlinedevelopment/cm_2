import { View, Text, Modal, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useChat } from "../../../../context/chatContext";
import IconButton from "@/app/components/Buttons/IconButton";

import { auth } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";

const MessageGeneralModal = ({
  messageObj,
  text,
  type,
  displayModal,
  setDisplayModal,
}) => {
  const { reportInappropriateMessage, deleteSelectedMessage } = useChat();
  const { logOut } = useAuth();

  const [deleteInput, setDeleteInput] = useState("");

  let actionFunc;

  useEffect(() => {
    setDeleteInput("");
  }, []);

  if (type === "delete") {
    actionFunc = deleteSelectedMessage;
  } else if (type === "report") {
    actionFunc = reportInappropriateMessage;
  } else if (type === "logout") {
    actionFunc = async () => {
      try {
        const result = await logOut();
        console.log("res", result);
      } catch (error) {
        console.log(error);
      }
    };
  } else if (type === "deleteAccount") {
    actionFunc = async () => {
      console.log("wanker");
      try {
        await auth.currentUser.delete();
        Alert.alert("Account delete successful");
      } catch (error) {
        console.log(error);
        Alert.alert("Account delete unsuccessful", error);
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

      <View
        className={`absolute bottom-0 w-full bg-white p-3 ${
          type === "deleteAccount" ? "h-[500px]" : "h-[340px]"
        } rounded-xl flex flex-col items-center justify-between`}
      >
        <Text className="text-xl p-3 text-center font-bold">
          {text.headerText}
        </Text>

        <Octicons name="report" size={50} color="red" />
        <View className="w-[90%] mt-3">
          <Text className="text-base font-bold text-black text-center">
            {text.bodyText}

            {deleteInput}
          </Text>

          {type === "deleteAccount" && (
            <ConfirmDeleteAccount setDeleteInput={setDeleteInput} />
          )}
        </View>
        <View className="flex flex-row justify-evenly items-center w-full">
          <IconButton
            disabled={deleteInput !== "Delete" && type === "deleteAccount"}
            textStyles="font-bold"
            containerStyles="p-2 w-[150px] h-[50px]"
            title="Confirm"
            handlePress={async () => {
              actionFunc(messageObj);
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

const ConfirmDeleteAccount = ({ setDeleteInput }) => {
  return (
    <View className="w-full  my-6">
      <Text className="text-base text-center my-2">
        Type "Delete" below if you still you understand and still want to delete
        your account and associated data.
      </Text>
      <TextInput
        onChangeText={setDeleteInput}
        placeholder="Type Delete"
        className="w-full h-14 bg-white shadow rounded-xl my-2 p-2  text-base text-red-600"
      ></TextInput>
    </View>
  );
};
