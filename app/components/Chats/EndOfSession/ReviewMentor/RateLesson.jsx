import { View, Text } from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";

const RateLesson = ({ setFeedbackForm }) => {
  const [rating, setRating] = useState(0);

  const ratingMeaning = [
    "They didn't help",
    "They need improvement",
    "Ok",
    "Good",
    "Great, helped a lot",
    "Amazing mentor!",
  ];

  return (
    <View className=" flex items-center  my-6 border-b-4 border-gray-200">
      <Text className="text-base font-medium my-2">How was your lesson?</Text>
      <Text className="text-base font-bold my-3">Rate your mentor</Text>
      <Text className="text-base font-bold my-3">{ratingMeaning[rating]}</Text>
      <View>
        <StarRating
          style={{ margin: 10 }}
          enableSwiping
          enableHalfStar={false}
          color="orange"
          starSize={50}
          rating={rating}
          onChange={(newRating) => {
            console.log("🚀 ~ RateLesson ~ newRating:", newRating);

            setRating(newRating);
            setFeedbackForm((prev) => {
              return { ...prev, mentorRating: newRating };
            });
          }}
        />
      </View>
    </View>
  );
};

export default RateLesson;
