import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { compliments } from "./ComplementSelections";
import ComplementSelectionsButton from "./ComplementSelections";

const Complements = ({ setFeedbackForm }) => {
  return (
    <View className=" flex  items-center border-b-4 border-gray-200">
      <Text className="text-base font-medium my-2">
        What did the mentor impress you with?
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="mb-4"
        horizontal
      >
        {compliments.map((comp) => {
          return (
            <View className="flex items-center justify-around ">
              <ComplementSelectionsButton
                setFeedbackForm={setFeedbackForm}
                comp={comp}
              />
              <Text>{comp.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Complements;
