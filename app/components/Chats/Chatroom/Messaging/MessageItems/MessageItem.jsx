import { View, TouchableOpacity, Text } from "react-native";
import React, { useState, useLayoutEffect, useRef, Children } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import LoadedImage from "../LoadedImage";
import { ScrollView } from "react-native-gesture-handler";
import MessageText from "../MessageText";
import ReplyMessage from "../ReplyMessage";
import FadeInView from "../../../../Effects/FadeInView";
import ConnectedMessage from "../ConnectedMessage";
import ComplementMessage from "../../LiveComplements/ComplementMessage";
import useReplyScroll from "../MessageItems/useReplyScroll";

const MessageItem = React.memo(
  ({
    message,
    userId,
    setReplyState,
    mentorId,
    menteeName,
    mentorName,
    setSelectedMessage,
    setDisplayMessageSelectedModal,
    roomId,
  }) => {
    const { showReply, handleMessageReplyScroll, triggerHaptics } =
      useReplyScroll(setReplyState, message);

    const thisUsersMessage = message?.userId === userId;

    const time = message?.createdAt
      ? convertFirebaseTimestampToDate(message.createdAt)
      : null;

    const handleSelectedMessage = (inputRef) => {
      const ref = inputRef.current; 

      setDisplayMessageSelectedModal(true);

      if (ref) {
        ref.measureInWindow((x, y, width, height) => {
          setSelectedMessage({
            thisUsersMessage: thisUsersMessage,
            roomId,
            message,
            time: time,
            x: x,
            y: y,
            width: width,
            height: height,
          });
        });
      }
    };

    const renderMessageContent = () => {
      if (message.isReply) {
        return (
          <ReplyMessage
            userId={userId}
            message={message}
            thisUsersMessage={thisUsersMessage}
          />
        );
      }
      if (message.isMenteeCompliment) {
        return (
          <ComplementMessage
            menteeName={menteeName}
            mentorName={mentorName}
            message={message}
          />
        );
      }
      if (message.imageUrl) {
        return (
          <LoadedImage
            time={time}
            caption={message.text || ""}
            thisUsersMessage={thisUsersMessage}
            url={message.imageUrl}
          />
        );
      }
      if (message.messageType === "connected") {
        return (
          <ConnectedMessage
            menteeName={menteeName}
            mentorName={mentorName}
            mentorId={mentorId}
            thisUsersMessage={thisUsersMessage}
            message={message}
          />
        );
      }
      return (
        <MessageText
          handleSelectedMessage={handleSelectedMessage}
          time={time}
          thisUsersMessage={thisUsersMessage}
          text={message.text}
          message={message}
        />
      );
    };

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
        {showReply === "left" && <ReplyIcon />}
        {renderMessageContent()}
        {showReply === "right" && <ReplyIcon />}
      </ScrollView>
    );
  }
);

export default MessageItem;

const ReplyIcon = () => {
  return (
    <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[40px] w-[40px] ">
      <Entypo name="reply" size={24} color="white" />
    </View>
  );
};
