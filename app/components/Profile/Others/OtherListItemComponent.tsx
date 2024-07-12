import { View, Text, Pressable } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import BorderUnderline from "../BorderUnderline";

interface OtherListItemProps {
  icon: React.ReactNode;
  handlePress: () => void;
  iconColor?: string;
  iconStyles?: string;
  text?: string;
}

const OtherListItemComponent: React.FC<OtherListItemProps> = ({
  icon,
  handlePress,
  iconColor,
  iconStyles,
  text,
}) => {
  return (
    <View className="w-[93%] mt-3 ">
      <Pressable className="" onPress={() => handlePress()}>
        <View className="flex flex-row items-center  w-full justify-start ">
          <View
            className={`${iconColor} h-[40px] w-[40px] rounded-full flex items-center justify-center ${iconStyles} `}
          >
            {icon}
          </View>
          <Text className="ml-3 text-neutral-600 text-base font-medium">
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OtherListItemComponent;
