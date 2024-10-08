import { View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect, useRef } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import LoadedImage from "./LoadedImage";
import { ScrollView } from "react-native-gesture-handler";
import MessageText from "./MessageText";
import ReplyMessage from "./ReplyMessage";
import FadeInView from "../../Effects/FadeInView";
import ConnectedMessage from "./ConnectedMessage";

const MessageItem = React.memo(
  ({
    message,
    userId,
    setDisplayShowReplyBar,
    setReplyMessage,
    setReplyRecipientName,
    mentorId,
    menteeName,
    mentorName,
    setSelectedMessage,
    setDisplayMessageSelectedModal,
  }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [ShowReply, setShowReply] = useState(false);

    const [messageSelected, setMessageSelected] = useState(false);

    const handleMessageReplyScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.x);
    };

    useLayoutEffect(() => {
      if (scrollPosition < -50) {
        setShowReply(true);
        setReplyMessage(message?.text);
        setDisplayShowReplyBar(true);
        setReplyRecipientName(message.userName);
      } else {
        setShowReply(false);
      }
    }, [scrollPosition]);

    let result;

    const thisUsersMessage = message?.userId === userId;

    const handleSelectedMessage = (inputRef) => {
      const ref = inputRef.current; // Rename to avoid re-declaration
      console.log("🚀 ~ handleSelectedMessage ~ inputRef:", inputRef);
      setMessageSelected(true);
      setDisplayMessageSelectedModal(true);

      if (ref) {
        ref.measureInWindow((x, y, width, height, pageX, pageY) => {
          setSelectedMessage({
            message,
            x: x,
            y: y,
            width: width,
            height: height,
            pageX: pageX,
            pageY: pageY,
          });
        });
      }
    };

    let time;
    if (message?.createdAt) {
      time = convertFirebaseTimestampToDate(message?.createdAt);
    }

    if (message.isReply) {
      return (
        <ReplyMessage message={message} thisUsersMessage={thisUsersMessage} />
      );
    }

    if (message.imageUrl) {
      result = (
        <LoadedImage
          time={time}
          caption={message.text || ""}
          thisUsersMessage={thisUsersMessage}
          url={message.imageUrl}
        />
      );
    } else if (message.messageType === "connected") {
      return (
        <ConnectedMessage
          menteeName={menteeName}
          mentorName={mentorName}
          mentorId={mentorId}
          thisUsersMessage={thisUsersMessage}
          message={message}
        />
      );
    } else {
      result = (
        <MessageText
          handleSelectedMessage={handleSelectedMessage}
          time={time}
          thisUsersMessage={thisUsersMessage}
          text={message.text}
          message={message}
        />
      );
    }

    return (
      <ScrollView
        scrollEventThrottle={16}
        onMomentumScrollBegin={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        onScroll={(event) => {
          handleMessageReplyScroll(event);
        }}
        contentContainerStyle={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        horizontal={true}
      >
        {ShowReply && (
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[40px] w-[40px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
        )}
        <FadeInView>{result}</FadeInView>
      </ScrollView>
    );
  }
);

export default MessageItem;
