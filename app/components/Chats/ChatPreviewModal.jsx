import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import ExitButton from "../Buttons/ExitButton";
import Avatar from "../Profile/EditProfile/Avatar/Avatar";
import MessageText from "./Chatroom/Messaging/MessageText";
import LoadedImage, {
  FullScreenImage,
} from "../Chats/Chatroom/Messaging/LoadedImage";
import IconButton from "../Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { db } from "../../../firebaseConfig";
import { doc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/context/authContext";

const ChatPreviewModal = ({
  setDisplayPreview,
  displayPreview,
  message,
  roomId,
  setRoomIdWeb,
  setCompletedSessionWeb,
}) => {
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  const [displayFullScreenImage, setDisplayFullScreenImage] = useState(false);

  const openFullScreen = () => {
    setDisplayFullScreenImage(true);
  };

  const openChatRoom = async () => {
    const roomCollectionRef = collection(db, "rooms");
    const roomRef = doc(roomCollectionRef, roomId);
    const newQuestionCollectionRef = collection(db, "new_questions");
    const newQuestionDocRef = doc(newQuestionCollectionRef, roomId);

    try {
      await deleteDoc(newQuestionDocRef);

      console.log("userDetails123", userDetails);

      await updateDoc(roomRef, {
        mentorName: userDetails?.firstName,
        mentorId: userDetails?.uid,
        mentorAvatar: userDetails?.avatarName,
        connectedMentor: true,
      });
      setDisplayPreview(false);

      if (Platform.OS !== "web") {
        navigation.navigate("chat-room", {
          roomId: roomId,
          completedSession: false,
        });
      } else {
        console.log("roomId222", roomId);
        setRoomIdWeb(roomId);
        setCompletedSessionWeb(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center relative"
      visible={displayPreview}
      animationType="fade"
      transparent={true}
    >
      {displayFullScreenImage && message?.imageUrl && (
        <FullScreenImage
          url={message?.imageUrl}
          onClose={setDisplayFullScreenImage}
        />
      )}
      <View className="bg-black opacity-30 h-full w-full absolute " />

      <View className="absolute bottom-0   w-full  bg-white rounded-">
        <ExitButton toggleDisplay={setDisplayPreview} />

        <View className="flex flex-col items-center pt-4">
          <Text className="text-base p-3">{message?.menteeName}</Text>
          {/* <Text>{message?.Timestamp}</Text> */}
          <Avatar avatarName={message?.menteeAvatarName}></Avatar>
          <Text className="text-base p-3">
            <Text className="text-base font-bold"> Subject: </Text>
            {message?.questionSubject}
          </Text>

          {message.initialMessage && (
            <MessageText
              text={message.initialMessage}
              thisUsersMessage={false}
              time
            />
          )}

          {message?.imageUrl && (
            <View className="w-full  flex flex-col items-center justify-center">
              <TouchableOpacity
                className=" w-[270px] h-[260px] my-10   flex flex-col items-center justify-center"
                onPress={openFullScreen}
              >
                <LoadedImage
                  isPreview="true"
                  url={message?.imageUrl}
                  thisUsersMessage
                  caption
                />
              </TouchableOpacity>
              <Text>Click image to enlarge</Text>
            </View>
          )}
        </View>
        <View className="w-full flex  flex-row items-center justify-center">
          <IconButton
            handlePress={() => openChatRoom()}
            icon={<AntDesign name="checkcircle" size={24} color="white" />}
            containerStyles={
              "h-[60px] w-[120px] m-4 flex flex-row items-center justify-around "
            }
            title="Accept"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChatPreviewModal;
