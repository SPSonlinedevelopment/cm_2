import { View, TextInput, Text, Button } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../Buttons/CustomButton";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";
import SubjectSelectionMentor from "./SubjectSelectionMentor";

interface UpdateformProps {
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  error: {};
}

const DOBPicker: React.FC<UpdateformProps> = ({ setFormDetails }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    setDate(currentDate);

    setFormDetails((prev: any) => {
      const newstate = { ...prev, date: currentDate };
      return newstate;
    });
  };

  return (
    <View className="w-full flex flex-col items-center">
      <Text className="text-white mt-5 text-base font-semibold ">
        What is your Date of Birth?
      </Text>

      <View className="bg-orange border m-3 rounded-full flex items-center justify-center w-[200px]">
        <DateTimePicker
          accentColor="purple"
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          themeVariant="dark"
        />
      </View>
    </View>
  );
};

export default DOBPicker;
