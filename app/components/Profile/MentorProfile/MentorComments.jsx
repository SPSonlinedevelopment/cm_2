import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "../../../context/authContext";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import Avatar from "../Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";

const MentorComments = () => {
  const { userDetails } = useAuth();
  console.log(
    "🚀 ~ MentorComments ~ userDetails:",
    userDetails.writtenFeedback
  );

  return (
    <View className="h-[200px] w-full">
      <View className="flex flex-row w-full">
        <Text className="text-lg font-bold ml-3">Comments</Text>
      </View>

      {userDetails?.writtenFeedback.length ? (
        <ScrollView
          className="p-3"
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {userDetails?.writtenFeedback.map((comment) => {
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
                  className="shadow-md bg-white w-[120px] h-full flex items-center justify-between m-1 p-2 rounded-2xl"
                >
                  <Avatar avatarName={comment?.avatarName} />
                  <Text className="text-xs font-bold">
                    {comment?.menteeName}
                  </Text>

                  <View
                    className="flex flex-row
                  "
                  >
                    {stars?.map((star, index) => (
                      <AntDesign name="star" size={10} color="orange" />
                    ))}
                  </View>

                  <Text className="text-xs">"{comment?.writtenFeedback}"</Text>
                  <Text className="text-xs">
                    {convertFirebaseTimestampToDate(comment?.createdAt)}
                  </Text>
                </View>
              );
            }
          })}
        </ScrollView>
      ) : (
        <View className="h-[100px] flex items-center justify-center">
          <Text>No feedback comments yet!</Text>
        </View>
      )}
    </View>
  );
};

export default MentorComments;
