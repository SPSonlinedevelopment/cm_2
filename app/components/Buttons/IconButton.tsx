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
  disabled?: boolean;
  iconContainerStyles?: string;
}
const IconButton: React.FC<IconButtonProps> = ({
  containerStyles,
  textStyles,
  handlePress,
  icon,
  isLoading,
  title,
  disabled,
  iconContainerStyles,
}) => {
  return (
    <TouchableOpacity
      style={{ pointerEvents: "box-only" }}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={() => {
        console.log("Button pressed");
        handlePress();
      }}
      className={` bg-red-100 ${
        disabled ? "opacity-50 " : "opacity" 
      } bg-orange-500  rounded-full my-4 justify-center items-center    z-50 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      testID="icon_button"
    >
      {isLoading ? (
        <Loading size={60} />
      ) : (
        <View className={`${iconContainerStyles}`} testID="icon_button_test">
          {icon}
        </View>
      )}
      {title && !isLoading && (
        <Text className={`text-white ${textStyles} `}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
