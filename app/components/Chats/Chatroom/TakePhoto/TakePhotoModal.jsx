import { useRef, useState } from "react";
import { View, Text, Modal } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import IconButton from "@/app/components/Buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";
import ExitButton from "@/app/components/Buttons/ExitButton";
import DisplayImageModal from "@/app/components/Home/DisplayImageModal";

const TakePhotoModal = ({
  displayTakePhotoModal,
  setDisplayTakePhotoModal,
  setImage,
  setDisplayImageCaptionModal,
}) => {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const takePicture = async () => {
    if (cameraRef) {
      setDisplayTakePhotoModal(false);

      try {
        const data = await cameraRef.current.takePictureAsync();
        setDisplayImageCaptionModal(true);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="h-full bg-purple flex flex-col  items-center justify-center">
        <Text className="text-xl text-white">
          We need your permission to show the camera
        </Text>

        <IconButton
          containerStyles="h=[60px] w-[370px] py-3 "
          textStyles="text-base"
          handlePress={requestPermission}
          title="Grant Permission"
        />
      </View>
    );
  }

  return (
    <Modal
      animationType="fade"
      visible={displayTakePhotoModal}
      className="w-full h-full"
    >
      <ExitButton
        toggleDisplay={() => {
          setDisplayTakePhotoModal(false);
          setImage(null);
        }}
      />
      <CameraView
        facing={"back"}
        className=" flex flex-col items-center justify-end"
        style={{ height: "100%" }}
        ref={cameraRef}
      >
        <IconButton
          icon={<AntDesign color="white" name="camera" size={35} />}
          containerStyles="h-[80px] w-[80px] bg-white mb-[10%] bg-orange"
          handlePress={() => {
            takePicture();
          }}
        />
      </CameraView>
    </Modal>
  );
};

export default TakePhotoModal;
