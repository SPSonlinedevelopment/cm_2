import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Loading from "../Loading";

interface IconButtonProps {
  icon?: React.ReactNode;
  containerStyles?: string;
  handlePress: () => void;
  isLoading?: boolean;
}
const IconButton: React.FC<IconButtonProps> = ({
  containerStyles,
  handlePress,
  icon,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      onPress={() => {
        handlePress();
      }}
      className={` bg-orange-500   rounded-full my-4 h-[80px] w-[80px] justify-center items-center  ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      testID="custom_button"
    >
      {isLoading ? (
        <Loading size={62} />
      ) : (
        <View testID="icon_button_test">{icon}</View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
