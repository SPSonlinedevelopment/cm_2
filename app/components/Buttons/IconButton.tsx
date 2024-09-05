import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Loading from "../Loading/LoadingSpinner";

interface IconButtonProps {
  icon?: React.ReactNode;
  containerStyles?: string;
  handlePress: () => void;
  isLoading?: boolean;
  title?: string;
  textStyles?: string;
}
const IconButton: React.FC<IconButtonProps> = ({
  containerStyles,
  textStyles,
  handlePress,
  icon,
  isLoading,
  title,
}) => {
  return (
    <TouchableOpacity
      style={{ pointerEvents: "box-only" }}
      disabled={isLoading}
      activeOpacity={0.7}
      onPress={() => {
        handlePress();
      }}
      className={` bg-orange-500  rounded-full my-4 justify-center items-center  ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      testID="custom_button"
    >
      {isLoading ? (
        <Loading size={62} />
      ) : (
        <View testID="icon_button_test">{icon}</View>
      )}
      {title && !isLoading && (
        <Text className={`text-white ${textStyles} mt-2`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
