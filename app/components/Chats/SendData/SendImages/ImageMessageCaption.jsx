import {
  View,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";

import { Feather } from "@expo/vector-icons";

import { sendImageToFirebaseStorageGetDownloadUrl } from "../../../../../services/sendImages/sendImageToFirebaseStorageGetDownloadUrl";

import { handleSendImageMessageToChatroom } from "../../../../../services/sendImages/handleSendImageMessageToChatroom";

import { useAuth } from "@/app/context/authContext";
import {
  detectInnapropriateImageContent,
  deleteImagesWithFace,
} from "@/app/safeguarding/detectInappropriateImages";
import { ref } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { screenProfanities } from "@/utils/common";
import { useChatRoom } from "@/app/context/chatRoomContext";
import ExitButton from "@/app/components/Buttons/ExitButton";
import FadeInView from "@/app/components/Effects/FadeInView";

const ImageMessageCaption = ({
  setDisplayImageCaptionModal,
  image,
  setIsSendingImage,
}) => {
  const { chatRoomData } = useChatRoom();
  const { userDetails, user } = useAuth();

  const ios = Platform.OS == "ios";
  const [inputFieldEmpty, setInputFieldEmpty] = useState(false);

  const inputRef = useRef(null);
  const textRef = useRef(null);

  const handleChangeText = () => {
    if (inputFieldEmpty) {
      setInputFieldEmpty(false);
    }
  };

  const handleSend = async () => {
    setIsSendingImage(true);
    setDisplayImageCaptionModal(false);

    if (screenProfanities(textRef.current)) {
      inputRef.current = "";
      setIsSendingImage(false);

      return;
    }

    const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

    try {
      const downloadUrl = await sendImageToFirebaseStorageGetDownloadUrl(
        image,
        storageRef
      );

      if (await deleteImagesWithFace(storageRef)) return;
      if (await detectInnapropriateImageContent(storageRef)) return;
      setIsSendingImage(false);
      await handleSendImageMessageToChatroom(
        chatRoomData,
        textRef,
        inputRef,
        userDetails,
        downloadUrl
      );
    } catch (error) {
      console.log("🚀 ~ handleSend ~ error:", error);
      Alert.alert("error sending message");
    } finally {
      setIsSendingImage(false);
    }
  };
  return (
    <View className="h-full w-full absolute z-[100] bg-black">
      <FadeInView containerStyles="h-full w-full">
        <KeyboardAvoidingView
          behavior={ios ? "padding" : "height"}
          style={{
            flex: 1,
          }}
          // {...kavConfig}
          contentContainerStyle={{ flex: 1 }}
        >
          <ExitButton
            toggleDisplay={() => setDisplayImageCaptionModal(false)}
          />

          {image ? (
            <Image
              className="h-full w-full"
              source={{ uri: image }}
              resizeMode="contain"
            />
          ) : (
            <ActivityIndicator />
          )}

          <View
            className={`${"pb-[20px]"}  shadow-2xl w-full flex flex-row justify-center absolute bottom-0  items-center `}
          >
            <View className="flex-row justify-around  items-center  w-full  p-2   z-10  ">
              <TextInput
                ref={inputRef}
                // onFocus={() => setTextInputFocused(true)}
                // onBlur={() => setTextInputFocused(false)}
                onChangeText={(value) => {
                  (textRef.current = value), handleChangeText();
                }}
                placeholderTextColor="white"
                style={{
                  display: "flex",
                  padding: 4,
                }}
                className="flex-1 m-1 mr-3 rounded-full bg-black-200 border placeholder-white border-white text-white  text-base p-2 items-center justify-center"
                multiline={true}
                numberOfLines={10}
                placeholder="Add an optional caption ..."
              />
              {!inputFieldEmpty && (
                <TouchableOpacity
                  onPress={() => {
                    handleSend();
                  }}
                  className="bh-neutral-200  text-base h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600 pr-[2px]"
                >
                  <Feather size={20} name="send" color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </FadeInView>
    </View>
  );
};

export default ImageMessageCaption;
