import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import MessagesList from "./components/Chats/Chatroom/Messaging/MessagesList";
import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/Messaging/MessageInput";
import ShowReplyBar from "./components/Chats/Chatroom/Messaging/ShowReplyBar";
import MentorConversationSuggestions from "./components/Chats/Chatroom/ConversationSuggestions/MentorConversationSuggestions";
import IsTypingIndicator from "./components/Chats/Chatroom/Messaging/IsTypingIndicator";
import ConfirmEndOfSessionModal from "./components/Chats/EndOfSession/ConfirmEndOfSessionModal";
import ReviewMentor from "./components/Chats/EndOfSession/ReviewForMentor/ReviewForMentor";
import ReviewMentee from "./components/Chats/EndOfSession/ReviewForMentee";
import EmojiSelector from "./components/Chats/Chatroom/Messaging/EmojiSelector";
import MessageSelectedModal from "./components/Chats/Chatroom/MessageSelected/MessageSelectedModal";
import LiveComplementSelector from "./components/Chats/Chatroom/LiveComplements/LiveComplementSelector";
import useChatRoomData from "./components/Chats/Chatroom/Hooks/useChatroomData";

const ChatRoom = () => {
  const { userDetails } = useAuth();
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { roomId, completedSession } = route?.params;

  const [replyState, setReplyState] = useState({
    displayShowReplyBar: false,
    replyMessage: "",
    replyRecipientName: "",
    replyRecipientId: "",
  });

  const [displayConfirmEndOfSessionModal, setDisplyConfirmEndOfSessionModal] =
    useState(false);
  const [displayEmojiSelector, setDisplayEmojiSelector] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [displayMessageSelectedModal, setDisplayMessageSelectedModal] =
    useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [text, setText] = useState("");

  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  const chatRoomData = useChatRoomData(roomId, completedSession);

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
          replyState={replyState}
          setReplyState={setReplyState}
          isSendingImage={isSendingImage}
          setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
          setSelectedMessage={setSelectedMessage}
          scrollToEnd={scrollToEnd}
          chatRoomData={chatRoomData}
          userDetails={userDetails}
          scrollViewRef={scrollViewRef}
        />
      )}

      {replyState.displayShowReplyBar && !chatRoomData?.sessionCompleted && (
        <ShowReplyBar
          userId={userDetails?.uid}
          replyState={replyState}
          setReplyState={setReplyState}
        />
      )}

      <MessageSelectedModal
        replyState={replyState}
        setReplyState={setReplyState}
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
            replyState={replyState}
            setReplyState={setReplyState}
            isSendingImage={isSendingImage}
            setIsSendingImage={setIsSendingImage}
            text={text}
            setText={setText}
            inputRef={inputRef}
            setDisplayEmojiSelector={setDisplayEmojiSelector}
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
