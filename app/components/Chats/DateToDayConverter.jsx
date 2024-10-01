import { View, Text } from "react-native";
import React from "react";
import { convertFirebaseTimestampToDate } from "@/utils/common";
import { Timestamp } from "firebase/firestore";

const DateToDayConverter = ({ timestamp, newQuestion }) => {
  const date = convertFirebaseTimestampToDate(timestamp);

  return (
    <Text
      className={`text-xs ${newQuestion ? "text-white" : " text-neutral-600"}`}
    >
      {date}
    </Text>
  );
};

export default DateToDayConverter;
