import { View, TouchableOpacity, TextInput, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import sendImageQuestionObjToFirebaseNewQuestion from "../SendData/SendImages/sendImageQuestionObjToFirebaseNewQuestion";
import { handleSendTextMessageToChatroom } from "../SendData/SendTexts/handleSendTextMessageToChatroom";
import { pickImage } from "@/utils/imagePicker";
import createBlob from "../SendData/SendImages/createBlob";
import ImageMessageCaption from "../SendData/SendImages/ImageMessageCaption";

const MessageInput = React.memo(
  ({ item, scrollToEnd, isReply, setDisplayShowReplyBar, replyMessage }) => {
    const { userDetails } = useAuth();
    const [TextInputFocused, setTextInputFocused] = useState(false);
    const [inputFieldEmpty, setInputFieldEmpty] = useState(false);
    const [image, setImage] = useState({});
    const [displayImageCaptionModal, setDisplayImageCaptionModal] =
      useState(false);

    const textRef = useRef(null);
    const inputRef = useRef(null);

    const handleChangeText = () => {
      // if (inputFieldEmpty) {
      //   // setInputFieldEmpty(false);
      // }
    };

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
      setDisplayShowReplyBar(false);
      try {
        await handleSendTextMessageToChatroom(
          item,
          textRef,
          inputRef,
          userDetails,
          isReply,
          replyMessage
        );

        scrollToEnd();
      } catch (error) {
        console.log("🚀 ~ handleSendMessage ~ error:", error);
      }
    };

    return (
      <View
        style={{}}
        className={`${
          TextInputFocused ? "pb-[0px]" : "pb-[20px]"
        }  shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center `}
      >
        {/* <Text>{JSON.stringify(replyMessage)}</Text> */}
        {displayImageCaptionModal && (
          <ImageMessageCaption
            item={item}
            image={image}
            setDisplayImageCaptionModal={setDisplayImageCaptionModal}
          />
        )}

        <View className="flex-row justify-around  items-center  w-full  p-2   ">
          <TouchableOpacity
            onPress={() => handlePickImage()}
            className="bh-neutral-200    flex items-center justify-center rounded-full  pr-[10px]"
          >
            <Ionicons name="add-outline" size={hp(3.5)} color="black" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            onFocus={() => setTextInputFocused(!TextInputFocused)}
            onBlur={() => setTextInputFocused(!TextInputFocused)}
            onChangeText={(value) => {
              (textRef.current = value), handleChangeText();
            }}
            style={{
              fontSize: hp(2),
              backgroundColor: "white",
              display: "flex",
              padding: 4,
              borderRadius: "20%",
            }}
            className="flex-1 m-1 mr-3  p-2 items-center justify-center"
            multiline={true}
            numberOfLines={10}
            placeholder="type message ..."
          />

          {!inputFieldEmpty && (
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bh-neutral-200  h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600 pr-[2px]"
            >
              <Feather name="send" color="white" size={hp(2.7)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default MessageInput;
