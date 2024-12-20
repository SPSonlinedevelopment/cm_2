import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { menteeComplements } from "./ComplementSelections";

import ComplementSelectionsButton from "./ComplementSelections";

const Complements = ({ feedbackForm, setFeedbackForm }) => {
  return (
    <View className=" flex  items-center border-b-4 border-gray-200">
      <Text className="text-base font-medium my-2">
        What did the mentor impress you with?
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="mb-4"
        horizontal={true}
      >
        {menteeComplements?.map((comp) => {
          return (
            <View
              key={comp.title}
              className="flex items-center justify-around "
            >
              <ComplementSelectionsButton
                feedbackForm={feedbackForm}
                setFeedbackForm={setFeedbackForm}
                comp={comp}
              />
              {comp.title === "SolvedProblems" ? (
                <Text>Solved Problems</Text>
              ) : (
                <Text>{comp.title}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Complements;
