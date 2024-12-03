import { View, Text, Modal, Alert, TextInput, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useChat } from "../../../../context/chatContext";
import IconButton from "@/app/components/Buttons/IconButton";
import { auth } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import CustomKeyboardView from "@/app/components/CustomKeyboardView";
import switchMode from "@/services/switchMode";

const MessageGeneralModal = ({
  messageObj,
  text,
  type,
  displayModal,
  setDisplayModal,
}) => {
  const { reportInappropriateMessage, deleteSelectedMessage } = useChat();
  const { logOut, userDetails } = useAuth();

  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    if (type === "deleteAccount") setDeleteInput("");
  }, [type, displayModal]);

  const handleDeleteAccount = async () => {
    try {
      await auth.currentUser.delete();
      Alert.alert("Account delete successful");
    } catch (error) {
      Alert.alert(
        "Account delete unsuccessful",
        error.message || error.toString()
      );
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      Alert.alert("Logout unsuccessful", error.message || error.toString());
    }
  };

  const actionMap = {
    delete: deleteSelectedMessage,
    report: reportInappropriateMessage,
    logout: handleLogOut,
    deleteAccount: handleDeleteAccount,
    switchMode: () => switchMode(userDetails),
  };

  const handleConfirm = async () => {
    closeAndReset();
    const action = actionMap[type];
    if (action) await action(messageObj);
  };

  const closeAndReset = () => {
    setDisplayModal(false);
    setDeleteInput("");
  };

  const renderConfirmDeleteAccount = () => (
    <ConfirmDeleteAccount setDeleteInput={setDeleteInput} />
  );

  return (
    <Modal
      testID="message_general_modal"
      transparent
      className=""
      visible={displayModal}
      animationType="fade"
    >
      <View className=" h-full w-full absolute bg-black-100 opacity-40 flex justify-center items-end " />

      <View className="w-full h-full flex items-center justify-center">
        <View
          className={` max-w-[500px] rounded-2xl p-2 m-4 bg-white  flex justify-between items-center ${
            type === "deleteAccount" ? "h-[500px]" : "h-[340px]"
          } `}
        >
          <Text className="text-xl p-3 text-center font-bold">
            {text.headerText}
          </Text>
          <Octicons name="report" size={50} color="red" />
          <View className="w-[90%] mt-3">
            <Text className="text-base font-bold text-black text-center">
              {text.bodyText}
            </Text>

            {type === "deleteAccount" && (
              <ConfirmDeleteAccount setDeleteInput={setDeleteInput} />
            )}
          </View>
          <View className="flex flex-row justify-between items-center w-full ">
            <IconButton
              disabled={
                deleteInput.trim() !== "Delete" && type === "deleteAccount"
              }
              textStyles="font-bold"
              containerStyles="p-2 m-3 w-[150px] h-[50px]"
              title="Confirm"
              handlePress={handleConfirm}
            />
            <IconButton
              textStyles="font-bold text-orange"
              containerStyles="p-2 m-3 w-[150px] h-[50px] bg-transparent border border-orange-300"
              title="Cancel"
              handlePress={closeAndReset}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MessageGeneralModal;

export const ConfirmDeleteAccount = ({ setDeleteInput }) => {
  return (
    <View className="w-full flex justify-center items-center">
      <Text className="text-base text-center my-2">
        Type "Delete" below if you still you understand and still want to delete
        your account and associated data.
      </Text>
      <TextInput
        onChangeText={setDeleteInput}
        placeholder="Type Delete"
        className="w-full w-[300px] h-14 bg-white shadow rounded-xl my-2 p-2  text-base text-red-600"
      ></TextInput>
    </View>
  );
};
