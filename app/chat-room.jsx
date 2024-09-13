import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Text,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import MessagesList from "./components/Chats/Chatroom/MessagesList";
import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/MessageInput";
import ShowReplyBar from "./components/Chats/Chatroom/ShowReplyBar";
import MentorConversationSuggestions from "./components/Chats/Chatroom/ConversationSuggestions/MentorConversationSuggestions";
import IsTypingIndicator from "./components/Chats/Chatroom/IsTypingIndicator";
import ConfirmEndOfSessionModal from "./components/Chats/EndOfSession/ConfirmEndOfSessionModal";
import ReviewMentor from "./components/Chats/EndOfSession/ReviewMentor/ReviewMentorContainer";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { item, completedSession } = route?.params;
  const [displayShowReplyBar, setDisplayShowReplyBar] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyRecipientName, setReplyRecipientName] = useState("");
  const [displayConfirmEndOfSessionModal, setDisplyConfirmEndOfSessionModal] =
    useState(false);
  const [displayMentorFeedback, setDisplayMentorFeedback] = useState(false);
  const [chatRoomData, setChatRoomData] = useState();

  const { userDetails } = useAuth();
  const scrollViewRef = useRef(null);

  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  const docRef = doc(
    db,
    !completedSession ? "rooms" : "completed_sessions",
    item?.roomId
  );

  useEffect(() => {
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const updatedData = docSnap.data();

        setChatRoomData(updatedData);
      }
    });
    return () => unsub();
  }, []);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={styles.container}
      {...kavConfig}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ChatroomHeader
        setDisplyConfirmEndOfSessionModal={setDisplyConfirmEndOfSessionModal}
        chatRoomData={chatRoomData}
      />
      {displayConfirmEndOfSessionModal && (
        <ConfirmEndOfSessionModal
          roomId={chatRoomData?.roomId}
          setDisplayMentorFeedback={setDisplayMentorFeedback}
          setDisplyConfirmEndOfSessionModal={setDisplyConfirmEndOfSessionModal}
        />
      )}

      {displayMentorFeedback && (
        <ReviewMentor
          mentorId={chatRoomData?.mentorId}
          createdAt={chatRoomData?.createdAt}
          roomId={chatRoomData?.roomId}
          setDisplayMentorFeedback={setDisplayMentorFeedback}
        />
      )}

      {chatRoomData && (
        <MessagesList
          scrollToEnd={scrollToEnd}
          roomId={chatRoomData?.roomId}
          chatRoomData={chatRoomData}
          userDetails={userDetails}
          setReplyRecipientName={setReplyRecipientName}
          setReplyMessage={setReplyMessage}
          setDisplayShowReplyBar={setDisplayShowReplyBar}
          // setShowReply={setShowReply}
          userId={userDetails?.uid}
          scrollViewRef={scrollViewRef}
        />
      )}

      {displayShowReplyBar && !chatRoomData?.sessionCompleted && (
        <ShowReplyBar
          replyRecipientName={replyRecipientName}
          replyMessage={replyMessage}
          setDisplayShowReplyBar={setDisplayShowReplyBar}
          displayShowReplyBar={displayShowReplyBar}
        />
      )}

      {chatRoomData && !chatRoomData?.sessionCompleted && (
        <>
          <IsTypingIndicator scrollToEnd={scrollToEnd} item={chatRoomData} />
          <MentorConversationSuggestions
            isReply={false}
            userDetails={userDetails}
            item={chatRoomData}
          />
          <MessageInput
            setDisplayShowReplyBar={setDisplayShowReplyBar}
            replyMessage={replyMessage}
            isReply={displayShowReplyBar}
            scrollToEnd={scrollToEnd}
            item={chatRoomData}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
