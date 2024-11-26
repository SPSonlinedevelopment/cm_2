import {
  View,
  Text,
  Modal,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import IconButton from "../Buttons/IconButton";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ExitButton from "../Buttons/ExitButton";
import SubjectSelection from "./SubjectSelection";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FadeInView from "../Effects/FadeInView";

const DisplayImageModal = ({
  openDisplayImageModal,
  setDisplaySubjectSelection,
  displaySubjectSelection,
  image,
  saveImageToDevice,
  handleSendQuestion,
  onClose,
  selectedSubject,
  setSelectedSubject,
  loading,
}) => {
  // handleSend();
  // console.log("pressed send button");
  const isIos = Platform.OS === "ios";

  return (
    <FadeInView
      className=""
      visible={openDisplayImageModal}
      animationType="slide"
    >
      <View
        className={`h-full w-full flex items-center justify-between ${
          isIos ? "bg-black" : "bg-white"
        } `}
      >
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
            setDisplaySubjectSelection={setDisplaySubjectSelection}
            displaySubjectSelection={displaySubjectSelection}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            handleSendQuestion={handleSendQuestion}
          />

          <IconButton
            iconContainerStyles="p-2"
            containerStyles="flex flex-row-reverse  px-4 w-[100px] h-[50px] absolute bottom-2 left-3"
            icon={<FontAwesome name="save" size={24} color="white" />}
            handlePress={() => saveImageToDevice()}
            title="Save"
          />
          <IconButton
            containerStyles="flex flex-row-reverse  px-4 w-[100px] h-[50px] absolute bottom-2 right-3"
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
    </FadeInView>
  );
};

export default DisplayImageModal;
