import { View, TouchableOpacity, TextInput, Alert, Text } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSendTextMessageToChatroom } from "../../SendData/SendTexts/handleSendTextMessageToChatroom";
import { screenProfanities } from "@/utils/common";
import { useChatRoom } from "@/app/context/chatRoomContext";
import SelectEmojiButton from "./SelectEmojiButton";
import FadeInView from "@/app/components/Effects/FadeInView";
import OpenCameraButton from "../TakePhoto/OpenCameraButton";
import TakePhotoModal from "../TakePhoto/TakePhotoModal";
import IconButton from "@/app/components/Buttons/IconButton";

const MessageInput = React.memo(
  ({
    handlePickImage,
    replyState,
    setReplyState,
    setDisplayEmojiSelector,
    text,
    setText,
    inputRef,
    image,
    setImage,
    setDisplayImageCaptionModal,
  }) => {
    const { userDetails } = useAuth();
    const { chatRoomData } = useChatRoom();
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [inputIsEmpty, setInputIsEmpty] = useState(true);
    const [displayTakePhotoModal, setDisplayTakePhotoModal] = useState(false);

    const handleSendMessage = async () => {
      setIsSendingMessage(true);
      const hasProfanities = screenProfanities(text);
      if (hasProfanities) {
        setIsSendingMessage(false);
        setText("");
      } else {
        setReplyState((prev) => ({
          ...prev,
          displayShowReplyBar: false,
        }));

        try {
          if (replyState.displayShowReplyBar) {
            let type = "reply";
            await handleSendTextMessageToChatroom(
              chatRoomData.roomId,
              text,
              userDetails,
              type,
              replyState.replyMessage,
              replyState.replyRecipientId
            );

            setReplyState((prev) => ({
              ...prev,
              displayShowReplyBar: false,
              replyMessage: "",
              replyRecipientName: "",
              replyRecipientId: "",
            }));
          } else {
            let type = "";
            await handleSendTextMessageToChatroom(
              chatRoomData.roomId,
              text,
              userDetails,
              type
            );
          }
          setText("");
        } catch (error) {
          Alert.alert("error sending message");
        } finally {
          setIsSendingMessage(false);
          setDisplayEmojiSelector(false);
        }
      }
    };

    return (
      <View
        testID="message_input"
        className="shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center"
      >
        <View className="flex-row justify-around  items-center  w-full  p-2 pb-4    ">
          <View className="h-[55px]  w-[70px]   flex-row justify-center items-center">
            <TouchableOpacity
              testID="image_picker_button"
              onPress={() => handlePickImage()}
              className="bh-neutral-200    flex items-center justify-center rounded-full  pr-[10px] "
            >
              <Ionicons name="add-outline" size={25} color="black" />
            </TouchableOpacity>
            <SelectEmojiButton
              testID="emoji_button"
              setDisplayEmojiSelector={setDisplayEmojiSelector}
            />
          </View>
          <TextInput
            testID="text_message_input"
            value={text}
            ref={inputRef}
            onChangeText={(value) => {
              setText(value);
              if (value.length > 0) {
                setInputIsEmpty(false);
              } else {
                setInputIsEmpty(true);
              }
            }}
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: 3,
            }}
            className="flex-1  mr-1 text-base rounded-full  p-2 items-center justify-center"
            multiline={true}
            numberOfLines={10}
            placeholder="type message ..."
          />

          <TakePhotoModal
            displayTakePhotoModal={displayTakePhotoModal}
            setDisplayImageCaptionModal={setDisplayImageCaptionModal}
            setImage={setImage}
            setDisplayTakePhotoModal={setDisplayTakePhotoModal}
          />
          <View className="h-[55px] w-[50px]  flex justify-center items-center">
            {text.length > 0 ? (
              <SendMessageButton
                disabled={isSendingMessage}
                handlePress={handleSendMessage}
              />
            ) : (
              <OpenCameraButton
                setDisplayTakePhotoModal={setDisplayTakePhotoModal}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
);

export default MessageInput;

const SendMessageButton = ({ handlePress, disabled }) => {
  return (
    <FadeInView duration={200}>
      <IconButton
        icon={<Feather name="send" color="white" size={20} />}
        iconContainerStyles="right-[1.5px]"
        containerStyles="bh-neutral-200  h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600"
        disabled={disabled}
        handlePress={handlePress}
      />
    </FadeInView>
  );
};
