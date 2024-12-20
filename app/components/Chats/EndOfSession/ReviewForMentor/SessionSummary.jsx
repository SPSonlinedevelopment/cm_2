import React from "react";
import { View, Text } from "react-native";
import SuccessAnimation from "@/app/components/Effects/SuccessAnimation";
import CelebrationAnimation from "@/app/components/Effects/CelebrationAnimation";

const SessionSummary = ({ userDetails, chatRoomData }) => {
  return (
    <View
      testID="session_summary"
      className=" w-full  mt-2  mb-20  items-center "
    >
      <CelebrationAnimation position="bottom" loop={false} size={200} />
      <View className=" w-[95%] py-3    justify-center items-center    flex flex-row rounded-2xl shadow bg-white">
        {userDetails.mode === "mentor" ? (
          <View className="ml-6">
            <Text className="text-base font-medium ">
              Session ended with{" "}
              <Text className=" text-base font-bold">
                {chatRoomData.menteeName}
              </Text>
            </Text>

            {!chatRoomData.mentorReview && (
              <View className="flex  flex-row justify-center pt-4  ">
                <Text className="text-sm"> Awaiting feedback...</Text>
              </View>
            )}

            {chatRoomData.mentorReview?.writtenFeedback && (
              <Text className="text-base font-medium my-2 ">
                🐱 {chatRoomData.menteeName} said : "{" "}
                {chatRoomData.mentorReview.writtenFeedback}"
              </Text>
            )}

            {chatRoomData.mentorReview?.confidenceRatingBefore && (
              <Text className="text-base font-medium my-2">
                😊 {chatRoomData.menteeName}'s confidence before:{" "}
                {chatRoomData.mentorReview.confidenceRatingBefore}
              </Text>
            )}

            {chatRoomData.mentorReview?.confidenceRatingAfter && (
              <Text className="text-base font-medium my-2">
                😁 {chatRoomData.menteeName}'s confidence after:{" "}
                {chatRoomData.mentorReview.confidenceRatingAfter}
              </Text>
            )}

            {chatRoomData.mentorReview?.mentorRating && (
              <Text className="text-base font-medium my-2">
                😺 Your rating for this session:{" "}
                {chatRoomData.mentorReview.mentorRating}
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
