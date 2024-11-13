import { View, TouchableOpacity, TextInput, Alert, Text } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSendTextMessageToChatroom } from "../../SendData/SendTexts/handleSendTextMessageToChatroom";
import { pickImage } from "@/utils/imagePicker";
import ImageMessageCaption from "../../SendData/SendImages/ImageMessageCaption";
import { screenProfanities } from "@/utils/common";
import { useChatRoom } from "@/app/context/chatRoomContext";

const SelectEmojiBtn = ({ setDisplayEmojiSelector }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setDisplayEmojiSelector((prev) => !prev);
      }}
    >
      <Text>😊</Text>
    </TouchableOpacity>
  );
};

const MessageInput = React.memo(
  ({
    scrollToEnd,
    replyState,
    setReplyState,
    setDisplayEmojiSelector,
    text,
    setText,
    inputRef,
    isSendingImage,
    setIsSendingImage,
  }) => {
    const { userDetails } = useAuth();
    const { chatRoomData } = useChatRoom();
    const [TextInputFocused, setTextInputFocused] = useState(false);
    const [inputFieldEmpty, setInputFieldEmpty] = useState(false);
    const [image, setImage] = useState({});
    const [displayImageCaptionModal, setDisplayImageCaptionModal] =
      useState(false);

    const [isSendingMessage, setIsSendingMessage] = useState(false);

    const handlePickImage = async () => {
      try {
        const imagePicked = await pickImage();
        setImage(imagePicked);
        setDisplayImageCaptionModal(true);
      } catch (error) {
        console.log(error);
      }
    };

    // handle sending a message
    const handleSendMessage = async () => {
      setIsSendingMessage(true);
      const hasProfanities = screenProfanities(text);
      if (hasProfanities) {
        setIsSendingMessage(false);
        return Alert.alert("text shows inappropriate text");
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
          Alert.alert("error");
        } finally {
          setIsSendingMessage(false);
          setDisplayEmojiSelector(false);
        }
      }
    };

    return (
      <View
        style={{}}
        className={`${
          TextInputFocused ? "pb-[0px] " : "pb-[10px]"
        }  shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center  `}
      >
        <Text>{JSON.stringify(isSendingMessage)}</Text>
        {displayImageCaptionModal && (
          <ImageMessageCaption
            isSendingImage={isSendingImage}
            setIsSendingImage={setIsSendingImage}
            image={image}
            setDisplayImageCaptionModal={setDisplayImageCaptionModal}
          />
        )}

        <View className="flex-row justify-around  items-center  w-full  p-2    ">
          <TouchableOpacity
            onPress={() => handlePickImage()}
            className="bh-neutral-200    flex items-center justify-center rounded-full  pr-[10px] "
          >
            <Ionicons name="add-outline" size={20} color="black" />
          </TouchableOpacity>

          <SelectEmojiBtn setDisplayEmojiSelector={setDisplayEmojiSelector} />
          <TextInput
            value={text}
            ref={inputRef}
            onFocus={() => setTextInputFocused(!TextInputFocused)}
            onBlur={() => setTextInputFocused(!TextInputFocused)}
            onChangeText={(value) => {
              setText(value);
            }}
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: 4,
              borderRadius: "20%",
            }}
            className="flex-1 m-1 mr-3 text-base  p-2 items-center justify-center"
            multiline={true}
            numberOfLines={10}
            placeholder="type message ..."
          />

          {!inputFieldEmpty && (
            <TouchableOpacity
              disabled={isSendingMessage}
              onPress={handleSendMessage}
              className="bh-neutral-200  h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600 pr-[2px]"
            >
              <Feather name="send" color="white" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default MessageInput;
