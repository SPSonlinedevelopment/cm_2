import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import {
  Timestamp,
  doc,
  collection,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import MessagesList from "./components/Chats/Chatroom/MessagesList";
import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/MessageInput";
import { generateRandomId, storeObjectAsyncStorage } from "../utils/common";
import ShowReplyBar from "./components/Chats/Chatroom/ShowReplyBar";
import MentorConversationSuggestions from "./components/Chats/Chatroom/ConversationSuggestions/MentorConversationSuggestions";
import IconButton from "./components/Buttons/IconButton";
import * as Haptics from "expo-haptics";
import IsTypingIndicator from "./components/Chats/Chatroom/IsTypingIndicator";
import ConfirmEndOfSessionModal from "./components/Chats/EndOfSession/ConfirmEndOfSessionModal";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { item } = route?.params;
  const [messages, setMessages] = useState([]);

  const [displayShowReplyBar, setDisplayShowReplyBar] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyRecipientName, setReplyRecipientName] = useState("");
  const [displayConfirmEndOfSessionModal, setDisplyConfirmEndOfSessionModal] =
    useState(false);

  const { userDetails } = useAuth();
  const scrollViewRef = useRef(null);

  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  useEffect(() => {
    let initialMessage = [];
    if (userDetails?.mode === "mentee") {
      initialMessage = [
        {
          senderId: item?.menteeid,
          senderName: item?.menteeName,
          text: null,
          imageUrl: item?.initialImageUrl || null,
          messageId: "TestMessageId1",
        },
        {
          text: item?.initialMessage || "",
          senderId: item?.menteeid,
          senderName: item?.menteeName,
          messageId: "TestMessageId2",
        },
        {
          text: `Hey ${item.menteeName} 👋. Thanks for your message!`,
          senderName: "Collet owl",
          messageId: "TestMessageId3",
        },
        {
          text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
          senderName: "Collet owl",
          messageId: "TestMessageId4",
        },
        {
          text: "Remember to use good English and be polite!",
          senderName: "Collet owl",
          messageId: "TestMessageId5",
        },
      ];
    } else if (userDetails?.mode === "mentor") {
      initialMessage = [
        {
          senderId: item?.menteeid,
          senderName: item?.menteeName,
          text: null,
          imageUrl: item?.initialImageUrl || null,
          messageId: "TestMessageId6",
        },
        {
          text: `You are now connected with a mentee, they're name is ${item?.menteeName} `,
          senderName: "Collet owl",
          createdAt: Timestamp.fromDate(new Date()),
          messageId: "TestMessageId7",
        },
      ];
    }

    // get all current messages from firebase
    const docRef = doc(db, "rooms", item?.roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      console.log("snapshot chage");
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages((prev) => {
        const newState = [...initialMessage, ...allMessages];
        console.log("new messages");

        return newState;
      });
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    storeObjectAsyncStorage(item?.roomId, lastMessage ? lastMessage?.text : "");
    scrollToEnd();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [messages]);

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
        item={{ item }}
      />
      {displayConfirmEndOfSessionModal && (
        <ConfirmEndOfSessionModal
          setDisplyConfirmEndOfSessionModal={setDisplyConfirmEndOfSessionModal}
        />
      )}

      {messages && (
        <MessagesList
          setReplyRecipientName={setReplyRecipientName}
          setReplyMessage={setReplyMessage}
          setDisplayShowReplyBar={setDisplayShowReplyBar}
          // setShowReply={setShowReply}
          userId={userDetails.uid}
          scrollViewRef={scrollViewRef}
          messages={messages}
        />
      )}
      <MentorConversationSuggestions
        isReply={false}
        userDetails={userDetails}
        item={item}
      />

      <IsTypingIndicator scrollToEnd={scrollToEnd} item={item} />

      {displayShowReplyBar && (
        <ShowReplyBar
          replyRecipientName={replyRecipientName}
          replyMessage={replyMessage}
          setDisplayShowReplyBar={setDisplayShowReplyBar}
          displayShowReplyBar={displayShowReplyBar}
        />
      )}

      <MessageInput
        setDisplayShowReplyBar={setDisplayShowReplyBar}
        replyMessage={replyMessage}
        isReply={displayShowReplyBar}
        scrollToEnd={scrollToEnd}
        item={item}
      />
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
