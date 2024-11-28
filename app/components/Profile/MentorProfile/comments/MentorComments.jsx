import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../../context/authContext";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import Avatar from "../../EditProfile/Avatar/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import DisplayMentorCommentsModal from "./DisplayMentorCommentsModal";

const MentorComments = () => {
  const [displayAllCommentsModal, setDisplayAllCommentsModal] = useState(false);

  return (
    <View className=" w-full  rounded-2xl shadow bg-white py-2  my-3">
      <DisplayMentorCommentsModal
        displayAllCommentsModal={displayAllCommentsModal}
        setDisplayAllCommentsModal={setDisplayAllCommentsModal}
      />
      <View className="w-full flex flex-row justify-between items-center ">
        <Text className="text-lg font-bold ml-3 "> Comments</Text>
        <TouchableOpacity
          onPress={() => {
            setDisplayAllCommentsModal(true);
          }}
          className=" mr-3 "
          title="See All"
        >
          <Text className="text-neutral-500">See All</Text>
        </TouchableOpacity>
      </View>
      <CommentsList />
    </View>
  );
};

export default MentorComments;

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
         w-[120px] h-[200px] flex items-center justify-between m-1 p-2 rounded-2xl`}
        >
          <Avatar avatarName={comment?.avatarName} />
          <Text className="text-xs font-bold">{comment?.menteeName}</Text>

          <View
            className="flex flex-row
        "
          >
            {stars?.map((star, index) => (
              <AntDesign
                key={index}
                name="star"
                size={10}
                color="rgb(243, 112, 33)"
              />
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
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {content}
    </ScrollView>
  ) : (
    <View className="h-[100px] flex items-center justify-center">
      <Text>No feedback comments yet!</Text>
    </View>
  );
};
