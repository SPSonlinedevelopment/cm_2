import { View, Text, Modal } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { doc, collection, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import IconGeneral from "../../IconGeneral";
import Fist from "../../../../assets/icons/Achievements/Fist.png";
import { useChatRoom } from "@/app/context/chatRoomContext";

const ConfirmEndOfSessionModal = ({
  setDisplyConfirmEndOfSessionModal,
  setdisplayFeedback,
  roomId,
}) => {
  const { userDetails } = useAuth();
  const { chatRoomData } = useChatRoom();

  const navigation = useNavigation();

  const handleExitChatroom = async () => {
    const newQuestionCollectionRef = collection(db, "new_questions");
    const roomCollectionRef = collection(db, "rooms");

    const newQuestionDocRef = doc(
      newQuestionCollectionRef,
      chatRoomData.roomId
    );
    const roomRef = doc(roomCollectionRef, chatRoomData.roomId);

    try {
      await deleteDoc(newQuestionDocRef);
      await deleteDoc(roomRef);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("index", { key: Math.random() });
  };

  return (
    <Modal
      transparent
      className="flex items-center  w-full  bg-opacity-50 justify-center "
      // visible={displayPreview}
      animationType="fade"
    >
      <View className="h-full w-full bg-black-100 opacity-40"></View>
      <View className=" absolute bottom-0  w-full bg-white  p-3 h-[340px] rounded-xl flex flex-col items-center justify-between">
        <Text className="text-xl p-3 text-center font-bold">
          Are you sure you want to leave chatroom?
        </Text>

        <IconGeneral source={Fist} size={100} />
        {userDetails.mode === "mentee" && (
          <Text className="text-base  font-bold mt-4">
            Your question request will be deleted
          </Text>
        )}

        <View className="flex flex-row w-full mb-10 items-center justify-around ">
          <IconButton
            textStyles="font-bold"
            containerStyles="p-2 w-[150px] h-[50px]"
            title="Confirm"
            handlePress={() => {
              setDisplyConfirmEndOfSessionModal(false);

              setdisplayFeedback(true);

              if (userDetails.mode === "mentee") {
                handleExitChatroom();
              } else {
              }
            }}
          />
          <IconButton
            textStyles="font-bold text-orange"
            containerStyles="p-2 w-[150px] h-[50px] bg-transparent border border-orange-300 "
            title="Cancel"
            handlePress={() => setDisplyConfirmEndOfSessionModal(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmEndOfSessionModal;
