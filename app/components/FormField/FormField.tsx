import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../CustomButton/CustomButton";
import { BaseButton, RawButton } from "react-native-gesture-handler";

interface CustomFormFieldProps {
  placeholderText: string;
  otherStyles?: string;
  icon?: React.ReactNode;
  type?: string;
  refName?: any;
  error?: boolean;
  seterror?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormField: React.FC<CustomFormFieldProps> = ({
  placeholderText,
  otherStyles,
  icon,
  type,
  refName,
  error,
  seterror,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisble] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let inputValidationErrorMessage = "";

  if (!refName.current) {
    inputValidationErrorMessage = `Hey! This ${type} field cannot be empty`;
  }

  return (
    <View className="">
      <View
        className={`h-[50px] w-[330px] my-1 flex-row justify-start ${
          isFocused
            ? `border border-white`
            : error
            ? `border border-red-500`
            : `border-none`
        } items-center pl-3  rounded-3xl font-semibold  bg-purple-100 ${otherStyles}`}
      >
        {icon}

        <TextInput
          placeholderTextColor="grey"
          secureTextEntry={type === "password" ? passwordVisible : false}
          style={{ borderColor: "white", color: "white" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={` pl-2  placeholder-white-500  w-[80%] h-full  
        }`}
          placeholder={placeholderText}
          onChangeText={(value) => {
            refName.current = value;
            if (seterror) {
              seterror(false);
            }
          }}
          testID="input"
        ></TextInput>

        {type === "password" && (
          <BaseButton onPress={() => setPasswordVisble(!passwordVisible)}>
            {!passwordVisible ? (
              <Ionicons name="eye-outline" size={24} color="white" />
            ) : (
              <Ionicons name="eye-off-outline" size={24} color="white" />
            )}
          </BaseButton>
        )}
      </View>
      {error && (
        <Text className="text-red-500 ml-5 py-1">
          {inputValidationErrorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormField;
