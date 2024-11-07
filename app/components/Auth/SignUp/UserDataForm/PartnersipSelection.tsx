import { View, Text } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import BorderUnderline from "@/app/components/Profile/BorderUnderline";
import { FormDetailProps } from "./UserDataForm";

type PartnersipType = {
  id: number;
  name: string;
};

interface PartnersipSelectionProps {
  formDetails: FormDetailProps;
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  setErrorObj: React.Dispatch<React.SetStateAction<any>>;
}

const PartnersipSelection: React.FC<PartnersipSelectionProps> = ({
  setFormDetails,
  formDetails,
  error,
  setErrorObj,
}) => {
  const partnerships: PartnersipType[] = [
    { id: 1, name: "Hammersmith" },
    { id: 2, name: "Newham" },
    { id: 3, name: "Acton" },
    { id: 4, name: "Islington" },
    { id: 5, name: "Lambeth" },
  ];

  return (
    <View className="w-full  mt-10">
      <Text className="text-base text-white text-center font-semibold">
        Which partnership are you a part of?
      </Text>

      {partnerships.map((partnership) => {
        return (
          <View className="w-full">
            <RadioButton.Item
              key={partnership.name}
              label={partnership.name}
              color="orange"
              uncheckedColor="black"
              labelStyle={{ color: "white" }}
              value="mentee"
              status={
                formDetails.partnership === partnership.name
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => {
                setErrorObj((prev: any) => {
                  const newstate = {
                    ...prev,
                    partnership: { message: "", isError: false },
                  };
                  return newstate;
                });

                setFormDetails((prev: any) => {
                  const newState = { ...prev, partnership: partnership.name };
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

export default PartnersipSelection;
