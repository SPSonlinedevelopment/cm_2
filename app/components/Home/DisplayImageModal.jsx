import { View, Text, Modal, Image, ActivityIndicator } from "react-native";
import IconButton from "../Buttons/IconButton";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ExitButton from "../Buttons/ExitButton";
import SubjectSelection from "./SubjectSelection";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const DisplayImageModal = ({
  openDisplayImageModal,
  setDisplaySubjectSelection,
  displaySubjectSelection,
  image,
  isSavingtoStorage,
  handleSendQuestion,
  onClose,
  selectedSubject,
  setSelectedSubject,
  loading,
}) => {
  // handleSend();
  // console.log("pressed send button");
  return (
    <Modal className="" visible={openDisplayImageModal} animationType="slide">
      <View className="h-full w-full bg-zinc-600 flex items-center justify-between ">
        <ExitButton
          toggleDisplay={() => {
            onClose();
          }}
        />

        {image ? (
          <Image
            className="h-[100%] w-[100%]"
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
            loading={loading}
            displaySubjectSelection={displaySubjectSelection}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            handleSendQuestion={handleSendQuestion}
          />
          <IconButton
            containerStyles="flex flex-row-reverse  px-4 w-[100px] h-[50px] absolute bottom-2 right-2"
            icon={
              <MaterialIcons name="navigate-next" size={24} color="white" />
            }
            handlePress={() => {
              setDisplaySubjectSelection(true);
            }}
            title="Next"
          />
        </View>
      </View>
    </Modal>
  );
};

export default DisplayImageModal;
