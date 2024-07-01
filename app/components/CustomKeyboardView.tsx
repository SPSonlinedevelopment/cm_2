import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface KavProps {
  children: any;
  inChat?: boolean;
  containerStyles?: string;
}

const ios = Platform.OS == "ios";

const CustomKeyboardView: React.FC<KavProps> = ({
  children,
  inChat,
  containerStyles,
}) => {
  let kavConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{
        flex: 1,
      }}
      {...kavConfig}
      // contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        {...scrollViewConfig}
        contentContainerStyle={{
          display: "flex",
          height: 100,
          alignItems: "center",
          backgroundColor: "black",
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
