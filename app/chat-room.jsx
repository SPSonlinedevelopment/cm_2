import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useRef, Children } from "react";
import { useRoute } from "@react-navigation/native";
import ChatroomHeader from "./components/Chats/Chatroom/Header/ChatroomHeader";
import MessagesList from "./components/Chats/Chatroom/Messaging/MessageList/MessagesList";
import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/Messaging/MessageInput";
import ShowReplyBar from "./components/Chats/Chatroom/Messaging/Reply/ShowReplyBar";
import ConversationSuggestions from "./components/Chats/Chatroom/ConversationSuggestions/ConversationSuggestions";
import IsTypingIndicator from "./components/Chats/Chatroom/Messaging/isTypingIndicator/IsTypingIndicator";
import CurrentUserTyping from "./components/Chats/Chatroom/Messaging/isTypingIndicator/CurrentUserTyping";
import ConfirmEndOfSessionModal from "./components/Chats/EndOfSession/ConfirmEndOfSessionModal";
import ReviewMentor from "./components/Chats/EndOfSession/ReviewForMentor/ReviewForMentor";
import ReviewMentee from "./components/Chats/EndOfSession/ReviewForMentee";
import EmojiSelector from "./components/Chats/Chatroom/Messaging/EmojiSelector";
import MessageSelectedModal from "./components/Chats/Chatroom/MessageSelected/MessageSelectedModal";
import LiveComplementSelector from "./components/Chats/Chatroom/LiveComplements/LiveComplementSelector";
import { getChatRoomData } from "./context/chatRoomContext";
import { ChatRoomProvider } from "./context/chatRoomContext";
import ImageMessageCaption from "./components/Chats/SendData/SendImages/ImageMessageCaption";
import { pickImage } from "@/utils/imagePicker";
import IconButton from "./components/Buttons/IconButton";

export const useKeyboardAndScrollConfig = () => {
  const ios = Platform.OS === "ios";
  const scrollViewRef = useRef(null);

  const scrollToEnd = () => {
    console.log("scroll to end");
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 0);
  };

  return {
    scrollViewRef,
    scrollToEnd,
    kavConfig: { keyboardVerticalOffset: ios ? 0 : 5 },
    scrollViewConfig: { contentContainerStyle: { flex: 1 } },
  };
};

const ChatRoom = ({ roomIdWeb, completedSessionWeb }) => {
  const { userDetails } = useAuth();

  const ios = Platform.OS == "ios";
  const route = useRoute();

  const { roomId = "", completedSession } = route?.params || {};

  const [replyState, setReplyState] = useState({
    displayShowReplyBar: false,
    replyMessage: "",
    replyRecipientName: "",
    replyRecipientId: "",
  });

  const { width } = useWindowDimensions();

  const [displayConfirmEndOfSessionModal, setDisplayConfirmEndOfSessionModal] =
    useState(false);
  const [displayEmojiSelector, setDisplayEmojiSelector] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [displayMessageSelectedModal, setDisplayMessageSelectedModal] =
    useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [text, setText] = useState("");
  const { scrollViewRef, scrollToEnd, kavConfig, scrollViewConfig } =
    useKeyboardAndScrollConfig();

  const [image, setImage] = useState({});
  const [displayImageCaptionModal, setDisplayImageCaptionModal] =
    useState(false);

  const inputRef = useRef(null);

  const handlePickImage = async () => {
    try {
      const imagePicked = await pickImage();
      setImage(imagePicked);
      setDisplayImageCaptionModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const chatRoomData = getChatRoomData(
    Platform.OS === "web" ? roomIdWeb : roomId,
    Platform.OS === "web" ? completedSessionWeb : completedSession
  );

  // Render each modal component
  const renderModalComponents = () => (
    <>
      {displayConfirmEndOfSessionModal && (
        <ConfirmEndOfSessionModal
          setdisplayFeedback={setDisplayFeedback}
          setDisplayConfirmEndOfSessionModal={
            setDisplayConfirmEndOfSessionModal
          }
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

      {displayImageCaptionModal && (
        <ImageMessageCaption
          isSendingImage={isSendingImage}
          setIsSendingImage={setIsSendingImage}
          image={image}
          setDisplayImageCaptionModal={setDisplayImageCaptionModal}
        />
      )}
    </>
  );

  // Render feedback based on user mode
  const renderFeedback = () => {
    if (
      displayFeedback &&
      userDetails?.mode === "mentor" &&
      !chatRoomData.reviewForMenteeCompleted
    ) {
      return <ReviewMentee setDisplayFeedback={setDisplayFeedback} />;
    } else if (
      userDetails?.mode === "mentee" &&
      chatRoomData?.sessionCompleted &&
      !chatRoomData?.reviewForMentorCompleted
    ) {
      return <ReviewMentor setDisplayFeedback={setDisplayFeedback} />;
    }
  };

  let content = (
    <ChatRoomProvider
      roomId={Platform.OS === "web" ? roomIdWeb : roomId}
      completedSession={
        Platform.OS === "web" ? completedSessionWeb : completedSession
      }
    >
      {/* <KeyboardAvoidingView
        behavior={ios ? "padding" : "height"}
        style={styles.container}
        {...kavConfig}
        contentContainerStyle={{ flexGrow: 1 }}
      > */}
      <View
        className={` h-full bg-[#F0F2F5] shadow ${
          Platform.OS === "web" && width < 900
            ? "w-[50%]"
            : Platform.OS === "web"
            ? "w-[70%]"
            : "w-full"
        } `}
      >
        <ChatroomHeader
          setDisplayConfirmEndOfSessionModal={
            setDisplayConfirmEndOfSessionModal
          }
        />

        {renderModalComponents()}
        {renderFeedback()}

        {chatRoomData && (
          <MessagesList
            replyState={replyState}
            setReplyState={setReplyState}
            isSendingImage={isSendingImage}
            setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
            setSelectedMessage={setSelectedMessage}
            scrollViewRef={scrollViewRef}
            scrollToEnd={scrollToEnd}
          />
        )}
        {replyState.displayShowReplyBar && !chatRoomData?.sessionCompleted && (
          <ShowReplyBar replyState={replyState} setReplyState={setReplyState} />
        )}

        {chatRoomData && !chatRoomData?.sessionCompleted && (
          <View className="">
            <EmojiSelector
              setText={setText}
              displayEmojiSelector={displayEmojiSelector}
            />
            <LiveComplementSelector />
            <IsTypingIndicator />
            <CurrentUserTyping text={text} />
            <ConversationSuggestions isReply={false} />
            <MessageInput
              setDisplayImageCaptionModal={setDisplayImageCaptionModal}
              image={image}
              setImage={setImage}
              handlePickImage={handlePickImage}
              replyState={replyState}
              setReplyState={setReplyState}
              text={text}
              setText={setText}
              inputRef={inputRef}
              setDisplayEmojiSelector={setDisplayEmojiSelector}
            />
          </View>
        )}
      </View>

      {/* </KeyboardAvoidingView> */}
    </ChatRoomProvider>
  );

  if (Platform.OS === "web" && !roomIdWeb) {
    content = (
      <View
        className={` h-full bg-[#F0F2F5] shadow ${
          Platform.OS === "web" && width < 900
            ? "w-[50%]"
            : Platform.OS === "web"
            ? "w-[70%]"
            : "w-full"
        } `}
      >
        <View className=" h-full  pt-20 flex flex-col shadow  bg-neutral   ">
          <View className="flex  w-full h-full justify-center items-center  ">
            <Image
              className="  m-10 rounded-full h-[221px] w-[221px]"
              source={require("../assets/images/CMlogo.png")}
            />
            <Text className="text-2xl m-10 text-center">
              Select a chat to begin
            </Text>
            <Text className="text-base text-center ">
              Take pictures of your work and get help
            </Text>
            <IconButton
              handlePress={() => {}}
              containerStyles="w-[200px] h-[40px] mt-10 "
              title="Download for mobile"
            ></IconButton>
          </View>
        </View>
      </View>
    );
  }

  return content;
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
