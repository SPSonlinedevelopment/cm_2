import { View, Text } from "react-native";

import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";

const Confidence = () => {
  [confidenceBeforeRating, setConfidenceBeforeRating] = useState(0);
  [confidenceAfterRating, setConfidenceAfterRating] = useState(0);

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
        onChange={setConfidenceBeforeRating}
      />
      <Text>After your lesson</Text>
      <StarRating
        style={{ margin: 10 }}
        enableSwiping
        enableHalfStar={false}
        color="orange"
        starSize={50}
        rating={confidenceAfterRating}
        onChange={setConfidenceAfterRating}
      />
    </View>
  );
};

export default Confidence;
