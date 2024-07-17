import { View, TextInput, Text, Button } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../Buttons/CustomButton";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";

interface FormDetails {
  mode: string;
  dob: Date;
  subjectSelection: string[];
}

interface SubjectSelectionProps {
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  setErrorObj: React.Dispatch<React.SetStateAction<any>>;
  formDetails: FormDetails;
  error: any;
}

const SubjectSelectionMentor: React.FC<SubjectSelectionProps> = ({
  setFormDetails,
  formDetails,
  error,
  setErrorObj,
}) => {
  const subjects = ["Math", "English", "Science", "Spanish", "Econonomics"];

  const handleCheckboxChange = (subject: string) => {
    setErrorObj((prev: any) => {
      const newstate = {
        ...prev,
        subjectSelection: { message: "", isError: false },
      };
      return newstate;
    });
    const isSelected = formDetails.subjectSelection.includes(subject);
    console.log(subject, isSelected);

    if (isSelected) {
      const updatedSubs = formDetails.subjectSelection.filter(
        (item: any) => item !== subject
      );

      setFormDetails((prev: any) => {
        const newstate = { ...prev, subjectSelection: updatedSubs };
        return newstate;
      });
    } else {
      setFormDetails((prev: any) => {
        const newState = {
          ...prev,
          subjectSelection: [...prev.subjectSelection, subject],
        };
        return newState;
      });
    }
  };

  return (
    <View className=" flex flex-col justify-center items-center mt-10">
      <View>
        <Text className="text-base text-white font-semibold">
          Which subjects are you able to help with?
        </Text>
      </View>
      <View>
        {subjects.map((subject, index) => (
          <View key={index}>
            <Checkbox.Item
              color="orange"
              style={{ width: "100%", borderBottomColor: "white" }}
              labelStyle={{ color: "white" }}
              label={subject}
              status={
                formDetails.subjectSelection.includes(subject)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleCheckboxChange(subject)}
            />
          </View>
        ))}
      </View>
      {error.isError && (
        <Text className="text-red-500 ml-5 py-1">{error.message}</Text>
      )}
    </View>
  );
};

export default SubjectSelectionMentor;
