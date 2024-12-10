// allows for styling on web
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

import { Text, View, Button, Alert, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import IndexQuestionInput from "./components/Home/IndexQuestionInput";
import { AuthContextProvider } from "./context/authContext";
import HomeNavButtons from "./components/Home/HomeNavButtons/HomeNavButtons";
import { ChatContextProvider } from "./context/chatContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./context/authContext";
import { useChat } from "./context/chatContext";
import DisplayImageModal from "@/app/components/Home/DisplayImageModal";
import { Timestamp } from "firebase/firestore";
import { ref } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";
import { screenProfanities } from "@/utils/common";
import Profile from "./profile";
import { getObjectAsyncStorage } from "@/utils/common";
import {
  detectInnapropriateImageContent,
  deleteImagesWithFace,
} from "./safeguarding/detectInappropriateImages";

import { CreateRoomIfNotExists } from "../services/CreateRoomIfNotExists";

import { sendImageToFirebaseStorageGetDownloadUrl } from "../services/sendImages/sendImageToFirebaseStorageGetDownloadUrl";

import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

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
  const [menuVisible, setMenuVisible] = useState(false);

  const [isConnected, setIsConnected] = useState(true);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": Montserrat_400Regular,
    "Montserrat-Bold": Montserrat_700Bold,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection and try again.");
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, [isConnected]);

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

  if (!permission.granted && Platform.OS !== "web") {
    return (
      <View className="h-full bg-purple flex flex-col  items-center justify-center">
        <Text className="text-xl text-center text-white">
          We need your permission to show the camera
        </Text>

        <IconButton
          containerStyles="h=[60px] w-[330px] py-3 "
          textStyles="text-base"
          handlePress={requestPermission}
          title="Grant Permission"
        />
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

  // const handleSendQuestion = async () => {
  //   setIsLoading(true);

  //   /// detect inappropriate text if message provided

  //   if (text.length && screenProfanities(text)) {
  //     handleCleanup();
  //     return;
  //   }

  //   const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

  //   /// if image save image to google cloud storage

  //   let url = image
  //     ? await sendImageToFirebaseStorageGetDownloadUrl(image, storageRef)
  //     : "";

  //   try {
  //     if (await deleteImagesWithFace(storageRef)) {
  //       handleCleanup();
  //       return;
  //     }

  //     if (await detectInnapropriateImageContent(storageRef)) {
  //       handleCleanup();
  //       return;
  //     }

  //     const roomId = generateRandomId();

  //     // Prepare the question object
  //     const newQuestionObj = createQuestionObject(url, roomId);

  //     // Set new question in Firebase
  //     const result = await setNewTextQuestion(newQuestionObj);

  //     if (result.success) {
  //       await CreateRoomIfNotExists(newQuestionObj);

  //       navigation.navigate("chat-room", {
  //         roomId: roomId,
  //         completedSession: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ handleSendQuestion ~ error:", error);
  //   } finally {
  //     // Cleanup and reset state
  //     handleCleanup();
  //   }
  // };

  const handleSendQuestion = async () => {
    setIsLoading(true);

    /// detect inappropriate text if message provided
    if (text.length && screenProfanities(text)) {
      handleCleanup();
      return;
    }

    const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

    /// if image save image to google cloud storage
    let url = "";
    if (image) {
      try {
        url = image
          ? await sendImageToFirebaseStorageGetDownloadUrl(image, storageRef)
          : "";

        if (await deleteImagesWithFace(storageRef)) {
          handleCleanup();
          return;
        }

        if (await detectInnapropriateImageContent(storageRef)) {
          handleCleanup();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const roomId = generateRandomId();

      // Prepare the question object
      const newQuestionObj = createQuestionObject(url, roomId);
      console.log("🚀 ~ handleSendQuestion ~ newQuestionObj:", newQuestionObj);

      // Set new question in Firebase
      const result = await setNewTextQuestion(newQuestionObj);
      console.log("🚀 ~ handleSendQuestion ~ result:", result);

      if (result.success) {
        // Wrap CreateRoomIfNotExists inside a separate function and call it
        await handleCreateRoom(newQuestionObj);

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

  // Async function to handle room creation
  const handleCreateRoom = async (newQuestionObj) => {
    try {
      const roomResult = await CreateRoomIfNotExists(
        newQuestionObj,
        userDetails
      );
      console.log("Room creation result:", roomResult);
    } catch (error) {
      console.log("Error creating room:", error);
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
          <View className="h-full w-full relative">
            {openDisplayImageModal && (
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
            )}
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
                <View className="flex flex-row justify-center items-center  z-40 bottom-[-30%]">
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
                  setDisplaySubjectSelection={setDisplaySubjectSelection}
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
        {userDetails?.mode === "mentee" ? menteeIndex : <Profile />}
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;

export const MenuButton = ({ handlePress }) => {
  return (
    <IconButton
      handlePress={handlePress}
      icon={<Entypo name="menu" size={24} color="black" />}
      containerStyles="  z-100 absolute right-[20px] top-[20px]"
      title="menu"
    />
  );
};
