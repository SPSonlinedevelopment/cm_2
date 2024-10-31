import { Text, View, Button, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import IndexQuestionInput from "./components/Home/IndexQuestionInput";
import { AuthContextProvider } from "./context/authContext";

import HomeNavButtons from "./components/HomeNavButtons/HomeNavButtons";
import { ChatContextProvider } from "./context/chatContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./context/authContext";
import { useChat } from "./context/chatContext";

import DisplayImageModal from "../app/components/Home/DisplayImageModal";
import { Timestamp } from "firebase/firestore";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";
import CreateRoomIfNotExists from "./components/Chats/SendData/CreateRoomIfNotExists";
import { screenProfanities } from "@/utils/common";
import Profile from "./profile";
import { getObjectAsyncStorage } from "@/utils/common";
import {
  detectInnapropriateImageContent,
  deleteImagesWithFace,
} from "./safeguarding/detectInappropriateImages";
import { sendImageToFirebaseStorageGetDownloadUrl } from "./components/Chats/SendData/SendImages/sendImageToFirebaseStorageGetDownloadUrl";

const RootLayout = () => {
  const { user, userDetails } = useAuth();
  const { setNewTextQuestion } = useChat();
  const [permission, requestPermission] = useCameraPermissions();
  const [isSavingtoCloudStorage, setIsSavingtoCloudStorage] = useState(false);
  const [openDisplayImageModal, setOpenDisplayImageModal] = useState(false);
  const [displaySubjectSelection, setDisplaySubjectSelection] = useState(false);
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  // const [imageFromMediaLib, setImageFromMediaLib] = useState(null);
  const [displayQuestionInput, setDisplayQuestionInput] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [mode, setMode] = useState(null); // State to hold the mode

  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const handleKeyboardButtonPressed = () => {
    setDisplayQuestionInput(true);
  };

  const getMode = async () => {
    const fetchedMode = await getObjectAsyncStorage("mode");
    setMode(fetchedMode); // Update the state with the fetched mode
  };

  useEffect(() => {
    getMode(); // Call the asynchronous function when the component mounts
  }, []);

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

  const saveImageToDevice = async () => {
    if (!image) return;

    try {
      // Request media library permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      // Save the image to the device's media library
      await MediaLibrary.createAssetAsync(image);
      alert("Saved to device");

      console.log("Picture saved");
    } catch (error) {
      console.log("Error saving image:", error);
    }
  };

  const handleCleanup = () => {
    setImage(null);
    setOpenDisplayImageModal(false);
    setIsLoading(false);
    setText("");
    setDisplayQuestionInput(false);
  };

  // Helper function to create a question object
  const createQuestionObject = (url, roomId) => ({
    imageUrl: url,
    menteeId: userDetails?.uid || "",
    menteeName: userDetails?.firstName || "",
    menteeAvatarName: userDetails?.avatarName,
    initialMessage: text || "",
    questionSubject: selectedSubject || "",
    createdAt: Timestamp.fromDate(new Date()),
    roomId: roomId,
  });

  const handleSendQuestion = async () => {
    setIsLoading(true);

    /// detect inappropriate text if message provided

    if (text.length && screenProfanities(text)) {
      handleCleanup();
      return;
    }

    const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

    /// if image save image to google cloud storage

    let url = image
      ? await sendImageToFirebaseStorageGetDownloadUrl(image, storageRef)
      : "";

    try {
      if (await deleteImagesWithFace(storageRef)) {
        handleCleanup();
        return;
      }

      if (await detectInnapropriateImageContent(storageRef)) {
        handleCleanup();
        return;
      }

      const roomId = generateRandomId();

      // Prepare the question object
      const newQuestionObj = createQuestionObject(url, roomId);

      // Set new question in Firebase
      const result = await setNewTextQuestion(newQuestionObj);

      if (result.success) {
        await CreateRoomIfNotExists(newQuestionObj);

        navigation.navigate("chat-room", {
          roomId: roomId,
          completedSession: false,
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleSendQuestion ~ error:", error);
    } finally {
      // Cleanup and reset state
      handleCleanup();
    }
  };

  const menteeIndex = (
    <AuthContextProvider>
      <ChatContextProvider>
        {displayQuestionInput ? (
          <IndexQuestionInput
            setDisplaySubjectSelection={setDisplaySubjectSelection}
            displaySubjectSelection={displaySubjectSelection}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            loading={loading}
            handleSendQuestion={handleSendQuestion}
            text={text}
            setText={setText}
            toggleDisplayInput={setDisplayQuestionInput}
          />
        ) : (
          <View className="h-full w-full bg-red relative">
            <DisplayImageModal
              saveImageToDevice={saveImageToDevice}
              loading={loading}
              setDisplaySubjectSelection={setDisplaySubjectSelection}
              displaySubjectSelection={displaySubjectSelection}
              setSelectedSubject={setSelectedSubject}
              selectedSubject={selectedSubject}
              onClose={onClose}
              openDisplayImageModal={openDisplayImageModal}
              image={image}
              handleSendQuestion={handleSendQuestion}
            />

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
                <HomeNavButtons
                  setOpenDisplayImageModal={setOpenDisplayImageModal}
                  // setDisplaySubjectSelection={setDisplaySubjectSelection}
                  setImage={setImage}
                />
              </View>
            </CameraView>
          </View>
        )}
      </ChatContextProvider>
    </AuthContextProvider>
  );

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        {mode === "mentee" ? menteeIndex : <Profile />}
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
