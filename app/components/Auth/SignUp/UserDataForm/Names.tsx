import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { FormDetailProps } from "./UserDataForm";

interface NameDetailProps {
  formDetails: FormDetailProps;
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  setErrorObj: React.Dispatch<React.SetStateAction<any>>;
}

const Names: React.FC<NameDetailProps> = ({
  formDetails,
  setFormDetails,
  error,
  setErrorObj,
}) => {
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);

  return (
    <View>
      <View
        className={`h-[50px] w-[330px] my-1 flex-row items-center 
        justify-start ${
          firstNameFocused
            ? `border border-white `
            : error.firstName.isError
            ? `border border-red-500`
            : `border-none`
        } pl-3  rounded-full font-semibold  bg-purple-100justify-start  bg-purple-100 `}
      >
        <TextInput
          testID="input"
          // editable={!editable}
          placeholderTextColor="grey"
          style={{
            borderColor: "white",
            justifyContent: "center",
            color: "white",
            fontSize: 18,
            width: "100%",
          }}
          onFocus={() => setFirstNameFocused(true)}
          onBlur={() => setFirstNameFocused(false)}
          placeholder={"First Name"}
          onChangeText={(value) => {
            setErrorObj((prev: any) => {
              const newstate = {
                ...prev,
                firstName: { message: "", isError: false },
              };
              return newstate;
            });

            setFormDetails((prev: any) => {
              const newState = { ...prev, firstName: value };
              return newState;
            });
          }}
        ></TextInput>
      </View>
      {error.firstName.isError && (
        <Text className="text-red-500 ml-5 py-1">
          {error.firstName.message}
        </Text>
      )}
      <View
        className={`h-[50px] w-[330px] my-1 flex-row items-center 
        justify-start ${
          lastNameFocused
            ? `border border-white `
            : error.lastName.isError
            ? `border border-red-500`
            : `border-none`
        } pl-3  rounded-full font-semibold  bg-purple-100justify-start  bg-purple-100 `}
      >
        <TextInput
          testID="input"
          // editable={!editable}
          placeholderTextColor="grey"
          style={{
            borderColor: "white",
            justifyContent: "center",
            color: "white",
            fontSize: 18,
            width: "100%",
          }}
          onFocus={() => setLastNameFocused(true)}
          onBlur={() => setLastNameFocused(false)}
          placeholder={"Last Name"}
          onChangeText={(value) => {
            setErrorObj((prev: any) => {
              const newstate = {
                ...prev,
                lastName: { message: "", isError: false },
              };
              return newstate;
            });

            setFormDetails((prev: any) => {
              const newState = { ...prev, lastName: value };
              return newState;
            });
          }}
        ></TextInput>
      </View>
      {error.lastName.isError && (
        <Text className="text-red-500 ml-5 py-1">{error.lastName.message}</Text>
      )}
    </View>
  );
};

export default Names;
