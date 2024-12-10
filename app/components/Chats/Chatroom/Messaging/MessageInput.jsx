import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSendTextMessageToChatroom } from "../../../../../services/sendTexts/handleSendTextMessageToChatroom";
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

      // need another solution as this doesnt work on web

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
        className={`shadow-2xl   ${
          Platform.OS === "web" ? "mb-[0px]" : "mb-[0px] pb-2"
        }  bg-neutral-200  shadow flex flex-row  items-center`}
      >
        <View
          className={`w-full   flex-row  items-center justify-between  ${
            Platform.OS === "web" ? "mb-[0px] " : ""
          } `}
        >
          <View className=" flex flex-row p-2">
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
            placeholderTextColor={"grey"}
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
              padding: 5,
              borderWidth: 0,
              outline: "none",
            }}
            className={`    ${
              Platform.OS === "web" && "h-[60px]"
            }  flex-1 mr-1 text-base rounded-2xl  w-full p-2  m-3  items-center justify-center `}
            multiline={true}
            numberOfLines={Platform.OS !== "web" ? 2 : 1}
            placeholder="Type message ..."
          />

          
          <View className="h-[55px] w-[50px]  justify-center items-center">
            {Platform.OS !== "web" ? (
              text.length > 0 ? (
                <SendMessageButton
                  disabled={isSendingMessage}
                  handlePress={() => handleSendMessage()}
                />
              ) : (
                <OpenCameraButton
                  setDisplayTakePhotoModal={setDisplayTakePhotoModal}
                />
              )
            ) : null}

            {Platform.OS === "web" && (
              <SendMessageButton
                disabled={isSendingMessage}
                handlePress={() => handleSendMessage()}
              />
            )}
          </View>
        </View>

        <TakePhotoModal
          displayTakePhotoModal={displayTakePhotoModal}
          setDisplayImageCaptionModal={setDisplayImageCaptionModal}
          setImage={setImage}
          setDisplayTakePhotoModal={setDisplayTakePhotoModal}
        />
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
