import { View, Text, Modal, Image, ActivityIndicator } from "react-native";
import IconButton from "../Buttons/IconButton";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ExitButton from "../Buttons/ExitButton";
import SubjectSelection from "./SubjectSelection";

const DisplayImageModal = ({
  openDisplayImageModal,
  image,
  isSavingtoStorage,
  handleSend,
  onClose,
  selectedSubject,
  setSelectedSubject,
}) => {
  return (
    <Modal className="" visible={openDisplayImageModal} animationType="slide">
      <View className="h-full w-full bg-zinc-600 flex items-center justify-between ">
        <ExitButton
          toggleDisplay={() => {
            onClose();
          }}
        />
        <View className="h-10 w-10"></View>
        {image ? (
          <Image
            className="h-[50%] w-[70%]"
            style={{
              resizeMode: "contain",
            }}
            source={{ uri: image }}
          />
        ) : (
          <ActivityIndicator
            className="z-10 flex"
            size="large"
            color="purple"
          />
        )}

        <View className="flex flex-col items-center justify-center w-full">
          <SubjectSelection
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
          <IconButton
            isLoading={isSavingtoStorage}
            containerStyles="h-[60px] w-[100px] bg-orange"
            icon={<FontAwesome name="send" size={24} color="white" />}
            handlePress={() => {
              handleSend();
              console.log("pressed send button");
            }}
            title="Send"
          />
        </View>
      </View>
    </Modal>
  );
};

export default DisplayImageModal;
