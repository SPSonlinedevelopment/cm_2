import { View, Text } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import BorderUnderline from "@/app/components/Profile/BorderUnderline";
import { FormDetailProps } from "./UserDataForm";

type YearGroup = {
  id: number;
  name: string;
};

interface YearGroupSelectionProps {
  formDetails: FormDetailProps;
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  setErrorObj: React.Dispatch<React.SetStateAction<any>>;
}

const YearGroupSelection: React.FC<YearGroupSelectionProps> = ({
  setFormDetails,
  formDetails,
  error,
  setErrorObj,
}) => {
  const years: YearGroup[] = [
    { id: 4, name: "Year 4" },
    { id: 5, name: "Year 5" },
    { id: 3, name: "Year 6" },
    { id: 4, name: "Year 7" },
    { id: 5, name: "Year 8" },
    { id: 4, name: "Year 9" },
    { id: 5, name: "Year 10" },
    { id: 3, name: "Year 11" },
    { id: 4, name: "Year 12" },
    { id: 5, name: "Year 13" },
  ];

  return (
    <View className="w-full  mt-10">
      <Text className="text-base text-white text-center font-semibold">
        Which year group are you in?
      </Text>

      {years.map((years) => {
        return (
          <View className="w-full">
            <RadioButton.Item
              key={years.name}
              label={years.name}
              color="orange"
              uncheckedColor="black"
              labelStyle={{ color: "white" }}
              value="mentee"
              status={formDetails.year === years.name ? "checked" : "unchecked"}
              onPress={() => {
                setErrorObj((prev: any) => {
                  const newstate = {
                    ...prev,
                    year: { message: "", isError: false },
                  };
                  return newstate;
                });

                setFormDetails((prev: any) => {
                  const newState = { ...prev, year: years.name };
                  return newState;
                });
              }}
            />
          </View>
        );
      })}
      {error.isError && (
        <Text className="text-red-500 ml-5 py-1"> {error.message}</Text>
      )}
    </View>
  );
};

export default YearGroupSelection;
