import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../CustomButton/CustomButton";
import { BaseButton, RawButton } from "react-native-gesture-handler";

interface CustomFormFieldProps {
  handlePress: () => void;
  placeholderText: string;
  otherStyles?: string;
  icon?: React.ReactNode;
  type?: string;
}

const FormField: React.FC<CustomFormFieldProps> = ({
  handlePress,
  placeholderText,
  otherStyles,
  icon,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisble] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      className={`h-[45px] w-[330px] flex-row justify-start ${
        isFocused ? `border border-white` : `border-none`
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
        onChangeText={() => {
          handlePress();
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
  );
};

export default FormField;
