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

const MessageInput = React.memo(
  ({
    handlePickImage,
    replyState,
    setReplyState,
    setDisplayEmojiSelector,
    text,
    setText,
    inputRef,
  }) => {
    const { userDetails } = useAuth();
    const { chatRoomData } = useChatRoom();
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
    const [isSendingMessage, setIsSendingMessage] = useState(false);

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
        style={{}}
        className={`  shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center  `}
      >
        <View className="flex-row justify-around  items-center  w-full  p-2    ">
          <TouchableOpacity
            testID="image_picker_button"
            onPress={() => handlePickImage()}
            className="bh-neutral-200    flex items-center justify-center rounded-full  pr-[10px] "
          >
            <Ionicons name="add-outline" size={20} color="black" />
          </TouchableOpacity>

          <SelectEmojiButton
            testID="emoji_button"
            setDisplayEmojiSelector={setDisplayEmojiSelector}
          />
          <TextInput
            value={text}
            ref={inputRef}
            // onFocus={() => setTextInputFocused(!TextInputFocused)}
            // onBlur={() => setTextInputFocused(!TextInputFocused)}
            onChangeText={(value) => {
              setText(value);
              value.length > 0
                ? setInputFieldEmpty(false)
                : setInputFieldEmpty(true);
            }}
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: 3,
              borderRadius: "20%",
            }}
            className="flex-1 m-1 mr-3 text-base  p-2 items-center justify-center"
            multiline={true}
            numberOfLines={10}
            placeholder="type message ..."
          />

          {!inputFieldEmpty && (
            <FadeInView>
              <TouchableOpacity
                testID="send_message_button"
                disabled={isSendingMessage}
                onPress={handleSendMessage}
                className="bh-neutral-200  h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600 pr-[2px]"
              >
                <Feather name="send" color="white" size={20} />
              </TouchableOpacity>
            </FadeInView>
          )}
        </View>
      </View>
    );
  }
);

export default MessageInput;
