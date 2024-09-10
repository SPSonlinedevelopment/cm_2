import React from "react";
import { View, Text } from "react-native";
import SuccessAnimation from "@/app/components/Effects/SuccessAnimation";

const SessionSummary = ({ item, userDetails }) => {
  return (
    <View className=" w-full  mt-2   items-center">
      <View className=" w-[95%] py-3    justify-center items-center   flex flex-row rounded-2xl shadow bg-white">
        {userDetails.mode === "mentor" ? (
          <View>
            {item.mentorReview?.writtenFeedback && (
              <Text className="text-sm font-medium">
                {item.menteeName} said : " {item.mentorReview.writtenFeedback}"
              </Text>
            )}

            {item.mentorReview?.confidenceRatingBefore && (
              <Text className="text-sm font-medium">
                {item.menteeName}'s confidence before:{" "}
                {item.mentorReview.confidenceRatingBefore}
              </Text>
            )}

            {item.mentorReview?.confidenceRatingAfter && (
              <Text className="text-sm font-medium">
                {item.menteeName}'s confidence after:{" "}
                {item.mentorReview.confidenceRatingAfter}
              </Text>
            )}

            {item.mentorReview?.mentorRating && (
              <Text className="text-sm font-medium">
                Your rating: {item.mentorReview.mentorRating}
              </Text>
            )}
          </View>
        ) : (
          <View className=" py-3 justify-center items-center   flex flex-row rounded-2xl ">
            <Text>SessionSummary mentee</Text>
          </View>
        )}

        <SuccessAnimation size={150} />
      </View>
    </View>
  );
};

export default SessionSummary;
