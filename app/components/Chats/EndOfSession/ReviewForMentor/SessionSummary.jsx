import React from "react";
import { View, Text } from "react-native";
import SuccessAnimation from "@/app/components/Effects/SuccessAnimation";
import CelebrationAnimation from "@/app/components/Effects/CelebrationAnimation";

const SessionSummary = ({ userDetails, chatRoomData }) => {
  return (
    <View className=" w-full  mt-2  mb-10  items-center">
      <CelebrationAnimation loop="false" size={200}></CelebrationAnimation>
      <View className=" w-[95%] py-3    justify-center items-center   flex flex-row rounded-2xl shadow bg-white">
        {userDetails.mode === "mentor" ? (
          <View className="ml-5">
            <Text className="text-base font-medium ">
              Session ended with{" "}
              <Text className=" text-base font-bold">
                {chatRoomData.menteeName}
              </Text>
            </Text>
            {chatRoomData.mentorReview?.writtenFeedback && (
              <Text className="text-base font-medium">
                {chatRoomData.menteeName} said : "{" "}
                {chatRoomData.mentorReview.writtenFeedback}"
              </Text>
            )}

            {chatRoomData.mentorReview?.confidenceRatingBefore && (
              <Text className="text-base font-medium">
                {chatRoomData.menteeName}'s confidence before: adhjs{" "}
                {chatRoomData.mentorReview.confidenceRatingBefore}
              </Text>
            )}

            {chatRoomData.mentorReview?.confidenceRatingAfter && (
              <Text className="text-base font-medium">
                {chatRoomData.menteeName}'s confidence after:{" "}
                {chatRoomData.mentorReview.confidenceRatingAfter}
              </Text>
            )}

            {chatRoomData.mentorReview?.mentorRating && (
              <Text className="text-base font-medium">
                Your rating: {chatRoomData.mentorReview.mentorRating}
              </Text>
            )}
          </View>
        ) : (
          <View className=" py-3 justify-center items-center  w-[50%]  flex flex-row rounded-2xl ">
            <Text className="text-base font-medium ">
              Session ended with{" "}
              <Text className=" text-base font-bold">
                {chatRoomData.mentorName}
              </Text>
            </Text>
          </View>
        )}

        <SuccessAnimation size={100} />
      </View>
    </View>
  );
};

export default SessionSummary;
