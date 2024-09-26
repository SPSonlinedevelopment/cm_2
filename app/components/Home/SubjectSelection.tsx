import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
// import { Picker } from "@react-native-picker/picker";

import { ScrollView } from "react-native-gesture-handler";
import SubjectSelectButton from "./SubjectSelectButton";
import IconButton from "../Buttons/IconButton";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";

interface SubjectSelectionProps {
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: string;
  displaySubjectSelection: boolean;
  setDisplaySubjectSelection: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendQuestion: () => Promise<void>;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  setSelectedSubject,
  selectedSubject,
  setDisplaySubjectSelection,
  displaySubjectSelection,
  handleSendQuestion,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    <Modal
      className="bg-slate-500 opacity-50"
      visible={displaySubjectSelection}
      animationType="slide"
      transparent={true}
    >
      <View className="absolute bottom-0 justify-center  h-[70%] w-full  flex-row flex-wrap bg-white  shadow-xl">
        <View className="w-[80%] flex justify-center items-center p-2 ">
          <Text className="mt-4 text-purple text-xl font-bold items-center justify-center text-center">
            Which subject do you need help with?
          </Text>
        </View>
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

      <IconButton
        isLoading={isLoading}
        handlePress={() => {
          handleSendQuestion();
        }}
        textStyles="mr-2"
        title="Submit"
        containerStyles="flex flex-row-reverse  px-4 h-[50px] absolute bottom-2 right-2"
        icon={<FontAwesome name="send" size={24} color="white" />}
      />
    </Modal>
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
