import { View, Text, Modal, ScrollView } from "react-native";
import React from "react";
import ExitButton from "../../../Buttons/ExitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";

import { convertFirebaseTimestampToDate } from "@/utils/common";

const DisplayMentorCommentsModal = ({
  displayAllCommentsModal,
  setDisplayAllCommentsModal,
}) => {
  const { userDetails } = useAuth();

  return (
    <Modal animationType="slide" visible={displayAllCommentsModal}>
      <View className="w-full">
        <ExitButton toggleDisplay={setDisplayAllCommentsModal} />
        <SafeAreaView className="flex items-center justify-start   h-full w-full">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: "100%",
            }}
          >
            <View className="h-20  w-full  " />
            <View className="flex flex-row items-center  justify-center">
              <Avatar avatarName={userDetails.avatarName} />
              <Text className="text-lg font-semibold p-4">
                {userDetails?.firstName}
              </Text>
            </View>

            <View className="flex w-full justify-start"></View>
            <View className="w-full br">
              <Text className="text-lg font-bold ml-3 text-start  ">
                Comments
              </Text>
            </View>

            <CommentsList />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default DisplayMentorCommentsModal;

const CommentsList = () => {
  const { userDetails } = useAuth();

  const content = userDetails?.writtenFeedback.map((comment) => {
    let stars = []; // Initialize the stars array here

    if (comment.stars) {
      for (let index = 0; index < comment.stars; index++) {
        stars.push("star");
      }
    }

    if (comment.writtenFeedback.length === 0) {
      return null;
    } else {
      return (
        <View
          key={comment.id}
          className={`shadow-sm bg-white 
           w-[150px] h-[200px] flex items-center justify-between m-1 p-2 rounded-2xl`}
        >
          <Avatar avatarName={comment?.avatarName} />
          <Text className="text-xs font-bold">{comment?.menteeName}</Text>

          <View
            className="flex flex-row
          "
          >
            {stars?.map((star, index) => (
              <AntDesign key={index} name="star" size={10} color="orange" />
            ))}
          </View>

          <Text className="text-xs">"{comment?.writtenFeedback}"</Text>
          <Text className="text-xs">
            {convertFirebaseTimestampToDate(comment?.createdAt)}
          </Text>
        </View>
      );
    }
  });

  return userDetails?.writtenFeedback.length ? (
    <View className=" w-full h-full flex flex-row flex-wrap">{content}</View>
  ) : (
    <View className="h-[100px] flex items-center justify-center">
      <Text>No feedback comments yet!</Text>
    </View>
  );
};
