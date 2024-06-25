import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const FormField = () => {
  return (
    <View testID="input">
      <TextInput>TextInput</TextInput>
    </View>
  );
};

export default FormField;
