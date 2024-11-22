import { View, Text } from "react-native";
import React from "react";
import IconButton from "@/app/components/Buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";
import FadeInView from "@/app/components/Effects/FadeInView";

const OpenCameraButton = ({ setDisplayTakePhotoModal }) => {
  return (
    <FadeInView duration={200}>
      <IconButton
        iconContainerStyles="bg-purple  h-[35px] w-[35px]  flex items-center justify-center rounded-full  "
        icon={<AntDesign name="camera" size={20} color="white" />}
        handlePress={() => setDisplayTakePhotoModal(true)}
      />
    </FadeInView>
  );
};

export default OpenCameraButton;
