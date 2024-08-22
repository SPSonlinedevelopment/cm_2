import { Text, View, Button, Modal, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import IndexQuestionInput from "./components/IndexQuestionInput";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeNavButtons from "./components/HomeNavButtons/HomeNavButtons";
import { ChatContextProvider } from "./context/chatContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./context/authContext";
import { useChat } from "./context/chatContext";
import { Image } from "expo-image";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";

const RootLayout = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSavingtoStorage, setIsSavingtoStorage] = useState(false);

  const [openDisplayImageModal, setOpenDisplayImageModal] = useState(false);

  const cameraRef = useRef(null);

  const { user, userDetails } = useAuth();
  const { setNewTextQuestion } = useChat();

  const [image, setImage] = useState(null);
  const [imageFromMediaLib, setImageFromMediaLib] = useState(null);
  const [displayQuestionInput, setDisplayQuestionInput] = useState(false);

  const handleKeyboardButtonPressed = () => {
    setDisplayQuestionInput(true);
  };
  const navigation = useNavigation();
  useEffect(() => {});

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  console.log("image, ", image);
  if (!permission.granted) {
    return (
      <View className="h-full bg-purple flex flex-col  items-center justify-between">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    setOpenDisplayImageModal(true);
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log("🚀 ~ takePicture ~ data:", data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClose = () => {
    setOpenDisplayImageModal(false);
    setImage(null);
  };

  const saveImage = async () => {
    console.log("function ");
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("picture saved");
        setImage(null);
        console.log("picture saved ");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // this function is used in messageInput and needs to extracted to as isolated reusable function as too large
  const handleSend = async () => {
    try {
      setIsSavingtoStorage(true);
      const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

      if (!image) {
        throw new Error("Image is missing");
      }

      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File download URL:", downloadURL);

      handleSendQuestion(downloadURL);
      setIsSavingtoStorage(false);
      setImage(null);
      setOpenDisplayImageModal(false);
      navigation.navigate("chats");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsSavingtoStorage(false);
    }
  };
  // this function is used  messageInput and needs to extracted to as isolated reusable function as too large
  const handleSendQuestion = async (url) => {
    try {
      console.log("🚀 ~ handleSendQuestion ~ url:", url);

      const newquestionObj = {
        imageUrl: url,
        menteeId: userDetails?.uid || "",
        menteeName: userDetails?.firstName || "",
        initialMessage: "",
        questionSubject: "",
        Timestamp: new Date(),
        questionId: generateRandomId(),
      };

      const result = await setNewTextQuestion(newquestionObj);
      console.log(result);
    } catch (error) {
      console.error("Error setting new text question:", error);
    }
  };

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        {displayQuestionInput ? (
          <IndexQuestionInput toggleDisplayInput={setDisplayQuestionInput} />
        ) : (
          <View className="h-full w-full bg-red relative">
            <Modal
              className=""
              visible={openDisplayImageModal}
              animationType="slide"
            >
              <View className="h-full w-full bg-zinc-600 flex items-center justify-between ">
                <IconButton
                  containerStyles="h-[50px] w-[50px] bg-white absolute z-20 left-4 top-10"
                  handlePress={() => {
                    onClose();
                  }}
                  icon={<Entypo name="cross" size={34} color="black" />}
                />
                <View className="h-10 w-10"></View>
                {image ? (
                  <Image
                    className="h-[80%] w-[100%]"
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

                <View className="flex flex-row items-center justify-end w-full mr-10">
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

            <CameraView
              facing={"back"}
              className="bg-purple flex flex-col items-center justify-between"
              style={{ height: "100%" }}
              ref={cameraRef}
            >
              <View className="flex flex-col items-center justify-between h-[100%]">
                <View className="flex flex-col items-center">
                  <View className="flex flex-col justify-center pt-10">
                    <Text className="text-white pt-5 text-xl font-bold">
                      Hello there 👋
                    </Text>
                  </View>
                  <View className="w-[80%] flex justify-center items-center">
                    <Text className="mt-4 text-white text-2xl font-bold text-center">
                      What do you need help with?
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-center items-center relative z-40 bottom-[-280px]">
                  <View className="h-[80px] w-[80px]" />
                  <IconButton
                    icon={<AntDesign name="camera" size={35} color="white" />}
                    containerStyles="h-[80px] w-[80px]"
                    handlePress={() => {
                      takePicture();
                    }}
                  />
                  <IconButton
                    icon={<Entypo name="keyboard" size={24} color="black" />}
                    containerStyles="h-[60px] w-[60px] bg-white m-3"
                    handlePress={() => {
                      handleKeyboardButtonPressed();
                    }}
                  />
                </View>
                <HomeNavButtons setImage={setImage} />
              </View>
            </CameraView>
          </View>
        )}
      </ChatContextProvider>
    </AuthContextProvider>
  );
};
export default RootLayout;
