import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SubjectIcon from "./subjects";

interface SubjectSelectionButtonProps {
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedSubject: string;
  subject: any;
}

const SubjectSelectButton: React.FC<SubjectSelectionButtonProps> = ({
  subject,
  selectedSubject,
  setSelectedSubject,
}) => {
  console.log("🚀 ~ subject:", selectedSubject);
  return (
    <TouchableOpacity
      onPress={() => setSelectedSubject(subject.subject)}
      className={`h-[60px]   w-[130px]  shadow flex flex-row justify-around  ${
        selectedSubject === subject.subject ? "bg-purple" : " bg-white"
      } items-center m-1 rounded-full`}
    >
      <Text
        className={`    ${
          selectedSubject === subject.subject ? "text-white" : ""
        }`}
      >
        {subject.subject}
      </Text>
      {subject.icon}

      <SubjectIcon subject={subject} selectedSubject={selectedSubject} />
    </TouchableOpacity>
  );
};

export default SubjectSelectButton;