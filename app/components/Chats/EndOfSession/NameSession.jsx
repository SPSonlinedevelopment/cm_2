import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import IconGeneral from "../../IconGeneral";
import Reward from "../../../../assets/icons/Achievements/Reward.png";
import IconButton from "../../Buttons/IconButton";

const NameSession = ({
  setDisplayFeedback,
  setMenteeFeedbackForm,
  handleConfirmEndSession,
}) => {
  const handleChange = (val) => {
    setMenteeFeedbackForm((prev) => {
      return { ...prev, sessionName: val };
    });
  };

  return (
    <View className="w-full flex-1 h-full justify-between items-center">
      <TextInput
        onChangeText={(val) => {
          handleChange(val);
        }}
        className="h-[100px] p-3 w-[80%] bg-white shadow rounded-lg mb-20"
        placeholder="Add a lesson name"
      />
      <IconGeneral source={Reward} size={100} />

      <IconButton
        textStyles="text-base "
        containerStyles=" p-3"
        title="Name Session"
        handlePress={() => {
          handleConfirmEndSession();
        }}
      />
    </View>
  );
};

export default NameSession;
