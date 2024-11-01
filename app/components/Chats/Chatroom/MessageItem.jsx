import { View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect, useRef, Children } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import LoadedImage from "./LoadedImage";
import { ScrollView } from "react-native-gesture-handler";
import MessageText from "./MessageText";
import ReplyMessage from "./ReplyMessage";
import FadeInView from "../../Effects/FadeInView";
import ConnectedMessage from "./ConnectedMessage";
import ComplementMessage from "./LiveComplements/ComplementMessage";

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
    const [scrollPosition, setScrollPosition] = useState(0);
    const [ShowReply, setShowReply] = useState("");

    const handleMessageReplyScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.x);
    };

    useLayoutEffect(() => {
      if (Math.abs(scrollPosition) > 50) {
        setReplyState((prevState) => ({
          ...prevState,
          displayShowReplyBar: true,
          replyMessage: message?.text,
          replyRecipientName: message.userName,
          replyRecipientId: message.userId,
        }));
      } else {
        setShowReply("");
      }

      if (scrollPosition < -50) {
        setShowReply("left");
      }

      if (scrollPosition > 50) {
        setShowReply("right");
      }
    }, [scrollPosition]);

    const thisUsersMessage = message?.userId === userId;

    let time;
    if (message?.createdAt) {
      time = convertFirebaseTimestampToDate(message?.createdAt);
    }

    const handleSelectedMessage = (inputRef) => {
      const ref = inputRef.current; // Rename to avoid re-declaration

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
    let result;
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
        {ShowReply === "left" && (
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[40px] w-[40px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
        )}

        <FadeInView>{result}</FadeInView>

        {ShowReply === "right" && (
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[40px] w-[40px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
        )}
      </ScrollView>
    );
  }
);

export default MessageItem;
