import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "../../../context/authContext";

const MentorComments = () => {
  const { userDetails } = useAuth();
  console.log(
    "🚀 ~ MentorComments ~ userDetails:",
    userDetails.writtenFeedback
  );

  return (
    <ScrollView>
      {userDetails.writtenFeedback.map((comment) => {
        return (
          <View>
            <Text>{comment.writtenFeedback}</Text>
            <Text>{comment.menteeName}</Text>
            {/* <Text>{comment.} </Text> */}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MentorComments;
