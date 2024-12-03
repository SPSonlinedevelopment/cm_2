import { useState, useRef, Platform, Children } from "react";
import * as Haptics from "expo-haptics";

const useReplyScroll = (setReplyState, message) => {
  const scrollPosition = useRef(0);
  const [showReply, setShowReply] = useState("");

  const handleMessageReplyScroll = (event) => {
    scrollPosition.current = event.nativeEvent.contentOffset.x;

    if (Math.abs(scrollPosition.current) > 50) {
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

    if (scrollPosition.current < -50) {
      setShowReply("left");
    }

    if (scrollPosition.current > 50) {
      setShowReply("right");
    }
  };

  const triggerHaptics = () => {
    Platform.OS !== "web" &&
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return { showReply, handleMessageReplyScroll, triggerHaptics };
};

export default useReplyScroll;
