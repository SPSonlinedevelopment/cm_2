import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  textStyles?: string;
  isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      onPress={() => {
        handlePress();
      }}
      className={`bg-purple-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      testID="custom_button"
    >
      <Text testID="custom_button_text" className={`text-white font-psemibold  text-center ${textStyles} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
