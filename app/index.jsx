import { Pressable, Text, View, StyleSheet, Image, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { StatusBar } from "expo-status-bar";
import CustomButton from "./components/Buttons/CustomButton";
import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import IndexQuestionInput from "./components/IndexQuestionInput";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeNavButtons from "./components/HomeNavButtons/HomeNavButtons";
import UserDetails from "./user-details";
import CustomKeyboardView from "./components/CustomKeyboardView";
import VerifyEmail from "./verify-email";
import Chats from "./chats";
import { ChatContextProvider } from "./context/chatContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./context/authContext";
import { useChat } from "./context/chatContext";
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

  // const [mediaLibPermissions, setMediaLibPermissions] =
  //   MediaLibrary.requestPermissionsAsync();
  // const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const { user, userDetails } = useAuth();
  const { setNewTextQuestion } = useChat();

  const [image, setImage] = useState(null);

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

  const handleSend = async () => {
    try {
      setIsSavingtoStorage(true);
      const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

      if (!image) {
        throw new Error("Image is missing");
      }

      const response = await fetch(image);
      const blob = await response.blob();

      console.log(blob);

      // const newFile = new File([blob], `test1.jpeg`, {
      //   type: "image/jpeg",
      // });
      await uploadBytesResumable(storageRef, blob);

      console.log("File uploaded successfully!");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("File download URL:", downloadURL);
      handleSendQuestion(downloadURL);
      setIsSavingtoStorage(false);
      setImage(null);

      navigation.navigate("chats");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsSavingtoStorage(false);
    }
  };

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

  // const handleSend = async () => {
  //   setIsSavingtoStorage(true);
  //   const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

  //   try {
  //     // 1. Convert the image URI to a Blob
  //     const response = await fetch(image);
  //     const blob = await response.blob();

  //     console.log(blob);
  //     const uploadTask = uploadBytes(storageRef, blob);
  //     await uploadTask;
  //     console.log("File uploaded successfully!");
  //     const downloadURL = await getDownloadURL(storageRef);
  //     // handleSendQuestion(downloadURL);
  //     console.log("File download URL:", downloadURL);
  //     setIsSavingtoStorage(false);
  //     setImage(null);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }

  //   navigation.navigate("chats");
  // };

  // const handleSendQuestion = async (url) => {
  //   console.log("🚀 ~ handleSendQuestion ~ url:", url);

  //   const newquestionObj = {
  //     imageUrl: url,
  //     menteeId: userDetails?.uid || "",
  //     menteeName: userDetails?.firstName || "",
  //     initialMessage: "",
  //     questionSubject: "",
  //     Timestamp: new Date(),
  //     questionId: generateRandomId(),
  //   };

  //   try {
  //     const result = await setNewTextQuestion(newquestionObj);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  let display;

  if (!image) {
    display = (
      <AuthContextProvider>
        <ChatContextProvider>
          {displayQuestionInput ? (
            <IndexQuestionInput toggleDisplayInput={setDisplayQuestionInput} />
          ) : (
            <CameraView
              facing={"back"}
              className="bg-purple flex flex-col items-center justify-between"
              style={{ height: "100%" }}
              ref={cameraRef}
            >
              <View className="flex flex-col items-center justify-between  h-[100%]  ">
                <View className="flex flex-col items-center ">
                  <View className="flex flex-col justify-center pt-10 ">
                    <Text className="text-white pt-5 text-xl font-bold">
                      Hello there 👋
                    </Text>
                  </View>

                  <View className="w-[80%] flex justify-center items-center ">
                    <Text className="mt-4 text-white text-2xl font-bold text-center">
                      What do you need help with?
                    </Text>
                  </View>
                </View>

                {/* // camera and keyboard icon buttons  */}

                <View className="flex flex-row justify-center items-center relative z-40 bottom-[-280px]">
                  <View className=" h-[80] w-[80]"></View>
                  <IconButton
                    icon={<AntDesign name="camera" size={35} color="white" />}
                    containerStyles="h-[80] w-[80]"
                    handlePress={() => {
                      takePicture();
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {uploadProgress > 0 && (
                      <Text>Upload Progress: {uploadProgress.toFixed(0)}%</Text>
                    )}
                  </View>

                  <IconButton
                    icon={<Entypo name="keyboard" size={24} color="black" />}
                    containerStyles="h-[60] w-[60] bg-white m-3"
                    handlePress={() => {
                      handleKeyboardButtonPressed();
                    }}
                  />
                </View>

                <HomeNavButtons />
              </View>
            </CameraView>
          )}
        </ChatContextProvider>
      </AuthContextProvider>
    );
  } else {
    display = (
      <SafeAreaView className="h-full w-full flex items-center bg-white">
        <Image
          className="h-[80%] w-[100%]"
          style={{
            aspectRatio: 1, // Setting the aspect ratio to 1 will maintain the image's original aspect ratio
            resizeMode: "contain", // This will make sure the image fits inside the container while maintaining the aspect ratio
            // width: "100%", // You can adjust the width here as needed
            // height: , // This allows the height to be calculated based on the aspect ratio and width
          }}
          source={{ uri: image }}
        />
        <View className="flex flex-row items-center justify-evenly w-full">
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="camera-retake"
                size={30}
                color="white"
              />
            }
            handlePress={() => setImage(null)}
            containerStyles="h-[60px] w-[100px] bg-orange flex items-center justify-center  "
            title="retake"
          ></IconButton>
          <IconButton
            isLoading={isSavingtoStorage}
            containerStyles="h-[60px] w-[100px] bg-orange "
            icon={<FontAwesome name="send" size={24} color="white" />}
            handlePress={() => {
              // saveImage();

              handleSend();

              console.log("pressed send buttonn");
            }}
            title="Send"
          ></IconButton>
        </View>
      </SafeAreaView>
    );
  }

  return display;
};

export default RootLayout;
