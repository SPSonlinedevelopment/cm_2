import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Loading from "../Loading/LoadingSpinner";

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
      className={` bg-orange rounded-3xl my-4 h-[45px] w-[330px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      testID="custom_button"
    >
      {isLoading ? (
        <Loading size={62} />
      ) : (
        <Text
          testID="custom_button_text"
          className={`text-white font-psemibold  text-base text-center ${textStyles} `}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
