import { View, Text } from "react-native";
import React, { Children, useState } from "react";
import { RadioButton } from "react-native-paper";

type UserType = "mentee" | "mentor";

interface UpdateformProps {
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  setErrorObj: React.Dispatch<React.SetStateAction<any>>;
  error: any;
}

const SelectUserMode: React.FC<UpdateformProps> = ({
  setFormDetails,
  error,
  setErrorObj,
}) => {
  const [checked, setChecked] = useState<UserType>();

  return (
    <View className="flex justify-center items-center">
      <Text className="text-white text-base py-4 font-semibold">
        Why are you using Collet Mentoring?
      </Text>
      <View className="flex w-full rounded-full flex-row justify-around items-center ">
        <View
          className={`w-[180px] ${
            checked === "mentee" ? `bg-orange` : `bg-purple-100`
          }  flex flex-col items-center justify-between  rounded-full`}
        >
          <RadioButton.Item
            label="I need help"
            color="orange"
            uncheckedColor="white"
            labelStyle={{ color: "white" }}
            value="mentee"
            status={checked === "mentee" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("mentee");
              setErrorObj((prev: any) => {
                const newstate = {
                  ...prev,
                  mode: { message: "", isError: false },
                };
                return newstate;
              });

              setFormDetails((prev: any) => {
                const newState = { ...prev, mode: "mentee" };
                return newState;
              });
            }}
          />
        </View>
        <View
          className={`w-[180px] ${
            checked === "mentor" ? `bg-orange` : `bg-purple-100`
          }  flex flex-col items-center justify-between  rounded-full`}
        >
          <RadioButton.Item
            label="I want to mentor"
            color="purple"
            labelStyle={{ color: "white" }}
            value="mentor"
            status={checked === "mentor" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("mentor");

              setErrorObj((prev: any) => {
                const newstate = {
                  ...prev,
                  mode: { message: "", isError: false },
                };
                return newstate;
              });

              setFormDetails((prev: any) => {
                const newState = { ...prev, mode: "mentor" };
                return newState;
              });
            }}
          />
        </View>
      </View>
      {error.isError && (
        <Text className="text-red-500 ml-5 py-1"> {error.message}</Text>
      )}
    </View>
  );
};

export default SelectUserMode;
