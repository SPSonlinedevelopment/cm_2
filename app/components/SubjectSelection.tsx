import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

interface SubjectSelectionProps {
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: string;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  setSelectedSubject,
  selectedSubject,
}) => {
  return (
    <View className="flex mt-2 flex-col justify-center items-center">
      <View className="w-[80%] flex justify-center items-center ">
        <Text className="mt-4 text-purple text-xl font-bold text-center">
          Which subject do you need help with?
        </Text>
      </View>
      <Picker
        itemStyle={{ color: "orange" }}
        style={{ width: 350 }}
        selectedValue={selectedSubject}
        onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
      >
        <Picker.Item label="Maths" value="maths" />
        <Picker.Item label="English" value="english" />
        <Picker.Item label="Chemistry" value="chemistry" />
        <Picker.Item label="Physics" value="physics" />
        <Picker.Item label="Economics" value="economics" />
        <Picker.Item label="I'm not sure" value="unknown" />
      </Picker>
    </View>
  );
};

export default SubjectSelection;
