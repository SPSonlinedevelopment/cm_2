import React, { useState } from "react";
import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import ExitButton from "../Buttons/ExitButton";
import Avatar from "../Profile/Avatar";
import MessageItem from "./Chatroom/MessageItem";
import MessageText from "./Chatroom/MessageText";
import { FullScreenImage } from "../Chats/Chatroom/LoadedImage";
import IconButton from "../Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ref } from "firebase/storage";
import { roomRef } from "@/firebaseConfig";
import { db } from "../../../firebaseConfig";
import { doc, collection, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "@/app/context/authContext";

const ChatPreviewModal = ({
  setDisplayPreview,
  displayPreview,
  message,
  roomId,
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
    try {
      await updateDoc(roomRef, {
        mentorName: userDetails?.firstName,
        mentorId: userDetails?.uid,
        mentorAvatar: userDetails?.avatarName,
        connectedMentor: true,
      });
      setDisplayPreview(false);
      navigation.navigate("chat-room", {
        roomId: roomId,
        completedSession: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      visible={displayPreview}
      animationType="slide"
      transparent={true}
      backdropOpacity={0.5}
    >
      {displayFullScreenImage && (
        <FullScreenImage
          url={message?.imageUrl}
          onClose={setDisplayFullScreenImage}
        />
      )}

      <View className="absolute bottom-0  h-[70%] w-full  bg-white rounded-">
        <ExitButton toggleDisplay={setDisplayPreview} />

        <View className="flex flex-col items-center pt-4">
          <Text className="text-base p-3">{message?.menteeName}</Text>
          {/* <Text>{message?.Timestamp}</Text> */}
          <Avatar avatarName={message?.menteeAvatarName}></Avatar>
          <Text className="text-base p-3">
            <Text className="text-base font-bold"> Subject:</Text>
            {message?.questionSubject}
          </Text>
          <MessageText
            text={message.initialMessage}
            thisUsersMessage={false}
            time
          />

          {message?.imageUrl && (
            <TouchableOpacity
              // delayLongPress={100}
              // delayPressIn={100}
              onPress={() => openFullScreen()}
            >
              <Image
                cachePolicy={"memory-disk"}
                className={` h-[250px] w-[200px] rounded-xl shadow-xl 
               `}
                style={{
                  aspectRatio: 1,
                  resizeMode: "cover",
                }}
                source={{
                  uri: message?.imageUrl,
                }}
                contentFit="cover"
                transition={100}
                effect="flip-from-top"
              />
            </TouchableOpacity>
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
