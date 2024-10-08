import { View, TouchableOpacity, TextInput, Alert, Text } from "react-native";
import React, { useState, useRef } from "react";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSendTextMessageToChatroom } from "../SendData/SendTexts/handleSendTextMessageToChatroom";
import { pickImage } from "@/utils/imagePicker";
import ImageMessageCaption from "../SendData/SendImages/ImageMessageCaption";
import { screenProfanities } from "@/utils/common";
import { ScrollView } from "react-native-gesture-handler";

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
    item,
    scrollToEnd,
    isReply,
    setDisplayShowReplyBar,
    replyMessage,
    setDisplayEmojiSelector,
    text,
    setText,
    inputRef,
  }) => {
    const { userDetails } = useAuth();
    const [TextInputFocused, setTextInputFocused] = useState(false);
    const [inputFieldEmpty, setInputFieldEmpty] = useState(false);
    const [image, setImage] = useState({});
    const [displayImageCaptionModal, setDisplayImageCaptionModal] =
      useState(false);

    const handlePickImage = async () => {
      try {
        const imagePicked = await pickImage();
        setImage(imagePicked.assets[0].uri);
        setDisplayImageCaptionModal(true);
      } catch (error) {
        console.log(error);
      }
    };

    // handle sending a message
    const handleSendMessage = async () => {
      const hasProfanities = screenProfanities(text);
      if (hasProfanities) {
        return Alert.alert("text shows inappropriate text");
      } else {
        setDisplayShowReplyBar(false);
        try {
          await handleSendTextMessageToChatroom(
            item,
            text,
            inputRef,
            userDetails,
            isReply,
            replyMessage
          );
          setText("");
          scrollToEnd();
          setDisplayEmojiSelector(false);
        } catch (error) {
          console.log("🚀 ~ handleSendMessage ~ error:", error);
        }
      }
    };

    return (
      <View
        style={{}}
        className={`${
          TextInputFocused ? "pb-[0px]" : "pb-[20px]"
        }  shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center  `}
      >
        {/* <Text>{JSON.stringify(replyMessage)}</Text> */}
        {displayImageCaptionModal && (
          <ImageMessageCaption
            item={item}
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
