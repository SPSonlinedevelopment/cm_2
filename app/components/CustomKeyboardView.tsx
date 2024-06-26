import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

interface KavProps {
  children: any;
  inChat: boolean;
}

const CustomKeyboardView: React.FC<KavProps> = ({ children, inChat }) => {
  let kavConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
