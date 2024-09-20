import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
// import { Picker } from "@react-native-picker/picker";

import { ScrollView } from "react-native-gesture-handler";
import SubjectSelectButton from "./SubjectSelectButton";

interface SubjectSelectionProps {
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: string;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  setSelectedSubject,
  selectedSubject,
}) => {
  const subjects = [
    {
      subject: "Maths",
    },
    {
      subject: "Chemistry",
    },
    {
      subject: "Physics",
    },
    {
      subject: "Biology",
    },
    {
      subject: "Geography",
    },
    {
      subject: "English",
    },
  ];

  return (
    <View className="flex mt-2 w-full flex-col justify-between items-center ">
      <View className="w-[80%] flex justify-center items-center ">
        <Text className="mt-4 text-purple text-xl font-bold text-center">
          Which subject do you need help with?
        </Text>
      </View>

      <View className="w-full  flex flex-row flex-wrap items-center justify-center">
        {subjects.map((subject) => {
          return (
            <SubjectSelectButton
              subject={subject}
              setSelectedSubject={setSelectedSubject}
              selectedSubject={selectedSubject}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SubjectSelection;

{
  /* <Picker
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
</Picker>; */
}
