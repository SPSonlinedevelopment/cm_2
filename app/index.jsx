import { Text, View, Button } from "react-native";
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

const RootLayout = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSavingtoStorage, setIsSavingtoStorage] = useState(false);
  const [openDisplayImageModal, setOpenDisplayImageModal] = useState(false);
  const [displaySubjectSelection, setDisplaySubjectSelection] = useState(false);
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);

  const cameraRef = useRef(null);

  const { user, userDetails } = useAuth();

  const { setNewTextQuestion } = useChat();
  const [image, setImage] = useState(null);
  const [imageFromMediaLib, setImageFromMediaLib] = useState(null);
  const [displayQuestionInput, setDisplayQuestionInput] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("");
  const { getCompletedChats, getChatrooms } = useChat();

  const handleKeyboardButtonPressed = () => {
    setDisplayQuestionInput(true);
  };
  const navigation = useNavigation();

  useEffect(() => {
    if (userDetails) {
      const unsubscribeChatrooms = getChatrooms();
      const unsubscribeCompletedChats = getCompletedChats();

      return () => {
        unsubscribeChatrooms();
        unsubscribeCompletedChats();
      };
    }
  }, [userDetails]);

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

  // const saveImage = async () => {
  //   console.log("function ");
  //   if (image) {
  //     try {
  //       await MediaLibrary.createAssetAsync(image);
  //       alert("picture saved");
  //       setImage(null);
  //       console.log("picture saved ");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleSendQuestion = async () => {
    setIsLoading(true);
    if (text.length) {
      const hasProfanities = screenProfanities(text);
      if (hasProfanities) {
        setIsLoading(false);
        return Alert.alert("text shows inappropriate text");
      }
    }

    let url;
    if (image) {
      url = await handleSaveImageToStorageGetUrl();
    }

    console.log("selectedSubject22", selectedSubject);
    const roomId = generateRandomId();

    const newQuestionObj = {
      imageUrl: url || "",
      menteeId: userDetails?.uid || "",
      menteeName: userDetails?.firstName || "",
      menteeAvatarName: userDetails?.avatarName,
      initialMessage: text || "",
      questionSubject: selectedSubject || "",
      createdAt: Timestamp.fromDate(new Date()),
      roomId: roomId,
    };

    try {
      // set new question in firebase

      const result = await setNewTextQuestion(newQuestionObj);
      console.log("setNewTextQuestion", result);

      if (result.success) {
        const createRoom = await CreateRoomIfNotExists(newQuestionObj);

        console.log("createRoom", createRoom);
      }

      navigation.navigate("chat-room", {
        roomId: roomId,
        completedSession: false,
      });
    } catch (error) {
      console.log(error);
    }

    setImage(null);
    setOpenDisplayImageModal(false);
    setIsLoading(false);
    setText("");
  };

  // this function is used in messageInput and needs to extracted to as isolated reusable function as too large
  const handleSaveImageToStorageGetUrl = async () => {
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

      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsSavingtoStorage(false);
    }
  };

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        {displayQuestionInput ? (
          <IndexQuestionInput
            loading={loading}
            handleSendQuestion={handleSendQuestion}
            text={text}
            setText={setText}
            toggleDisplayInput={setDisplayQuestionInput}
          />
        ) : (
          <View className="h-full w-full bg-red relative">
            <DisplayImageModal
              loading={loading}
              setDisplaySubjectSelection={setDisplaySubjectSelection}
              displaySubjectSelection={displaySubjectSelection}
              setSelectedSubject={setSelectedSubject}
              selectedSubject={selectedSubject}
              onClose={onClose}
              openDisplayImageModal={openDisplayImageModal}
              image={image}
              isSavingtoStorage={isSavingtoStorage}
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
