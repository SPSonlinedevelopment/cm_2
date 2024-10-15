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
import ReviewMentor from "./components/Chats/EndOfSession/ReviewForMentor/ReviewForMentor";
import ReviewMentee from "./components/Chats/EndOfSession/ReviewForMentee";
import CreateRoomIfNotExists from "./components/Chats/SendData/CreateRoomIfNotExists";
import EmojiSelector from "./components/Chats/Chatroom/EmojiSelector";
import MessageSelectedModal from "./components/Chats/Chatroom/MessageSelected/MessageSelectedModal";
import ReportMessageModal from "./components/Chats/Chatroom/MessageSelected/ReportMessageModal";
import LiveComplementSelector from "./components/Chats/Chatroom/LiveComplements/LiveComplementSelector";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { roomId, completedSession } = route?.params;

  const [displayShowReplyBar, setDisplayShowReplyBar] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyRecipientName, setReplyRecipientName] = useState("");
  const [displayConfirmEndOfSessionModal, setDisplyConfirmEndOfSessionModal] =
    useState(false);
  const [displayEmojiSelector, setDisplayEmojiSelector] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [displayMenteeFeedback, setDisplayMenteeFeedback] = useState(false);
  const [displayMessageSelectedModal, setDisplayMessageSelectedModal] =
    useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});

  const [chatRoomData, setChatRoomData] = useState();
  console.log("🚀 ~ ChatRoom ~ chatRoomData:", chatRoomData);

  const [text, setText] = useState("");

  const inputRef = useRef(null);
  const { userDetails } = useAuth();
  const scrollViewRef = useRef(null);

  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  let docRef;
  if (roomId) {
    docRef = doc(
      db,
      !completedSession ? "rooms" : "completed_sessions",
      roomId
    );
  }

  useEffect(() => {
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const updatedData = docSnap.data();
        setChatRoomData(updatedData);
      }
    });

    return () => unsub();
  }, [roomId]);

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
          setdisplayFeedback={setDisplayFeedback}
          setDisplyConfirmEndOfSessionModal={setDisplyConfirmEndOfSessionModal}
        />
      )}

      {displayFeedback &&
        userDetails?.mode === "mentor" &&
        !chatRoomData.reviewForMenteeCompleted && (
          <ReviewMentee
            roomId={chatRoomData?.roomId}
            setDisplayFeedback={setDisplayFeedback}
          ></ReviewMentee>
        )}

      {userDetails?.mode === "mentee" &&
        chatRoomData?.sessionCompleted &&
        !chatRoomData?.reviewForMentorCompleted &&
        setDisplayFeedback && (
          <ReviewMentor
            chatRoomData={chatRoomData}
            setDisplayFeedback={setDisplayFeedback}
          />
        )}

      {chatRoomData && (
        <MessagesList
          setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
          setSelectedMessage={setSelectedMessage}
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

      <MessageSelectedModal
        setReplyRecipientName={setReplyRecipientName}
        setReplyMessage={setReplyMessage}
        setDisplayShowReplyBar={setDisplayShowReplyBar}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        displayMessageSelectedModal={displayMessageSelectedModal}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
      />

      {chatRoomData && !chatRoomData?.sessionCompleted && (
        <>
          <EmojiSelector
            setText={setText}
            displayEmojiSelector={displayEmojiSelector}
          />
          <LiveComplementSelector
            menteeId={chatRoomData.menteeId}
            roomId={chatRoomData?.roomId}
          />
          <IsTypingIndicator scrollToEnd={scrollToEnd} item={chatRoomData} />

          <MentorConversationSuggestions
            isReply={false}
            userDetails={userDetails}
            item={chatRoomData}
          />
          <MessageInput
            text={text}
            setText={setText}
            inputRef={inputRef}
            setDisplayEmojiSelector={setDisplayEmojiSelector}
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
