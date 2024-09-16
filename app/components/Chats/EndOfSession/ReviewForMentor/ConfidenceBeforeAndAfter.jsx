import { View, Text } from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";

const Confidence = ({ setFeedbackForm }) => {
  [confidenceBeforeRating, setConfidenceBeforeRating] = useState(0);
  [confidenceAfterRating, setConfidenceAfterRating] = useState(0);

  const handleConfidenceChange = (val, key) => {
    setFeedbackForm((prev) => {
      return { ...prev, [key]: val };
    });
  };

  return (
    <View className=" flex items-center">
      <Text className="text-xl m-3 font-bold">
        Rate your confidence in the topic
      </Text>

      <Text>Before your lesson</Text>
      <StarRating
        style={{ margin: 10 }}
        enableSwiping
        enableHalfStar={false}
        color="orange"
        starSize={50}
        rating={confidenceBeforeRating}
        onChange={(val) => {
          setConfidenceBeforeRating(val);
          handleConfidenceChange(val, "confidenceRatingBefore");
        }}
      />
      <Text>After your lesson</Text>
      <StarRating
        style={{ margin: 10 }}
        enableSwiping
        enableHalfStar={false}
        color="orange"
        starSize={50}
        rating={confidenceAfterRating}
        onChange={(val) => {
          setConfidenceAfterRating(val);
          handleConfidenceChange(val, "confidenceRatingAfter");
        }}
      />
    </View>
  );
};

export default Confidence;
