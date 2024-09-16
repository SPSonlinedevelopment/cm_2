import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const NameSession = ({ setDisplayFeedback, setMenteeFeedbackForm }) => {
  const handleChange = (val) => {
    setMenteeFeedbackForm((prev) => {
      return { ...prev, sessionName: val };
    });
  };

  return (
    <View className="w-full flex-1 h-full justify-center items-center">
      <TextInput
        onChangeText={(val) => {
          handleChange(val);
        }}
        className="h-[100px] p-3 w-[80%] bg-white shadow rounded-lg"
        placeholder="Add a lesson name"
      ></TextInput>
    </View>
  );
};

export default NameSession;
