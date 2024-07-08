import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
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
    scrollViewConfig = { contentContainerStyle: { flex: 1, height: "100%" } };
  }
  return (
    <View className="h-full">
      {/* <KeyboardAvoidingView
        className="h-full"
        behavior={ios ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.container}
        // {...kavConfig}
      > */}
      {/* <SafeAreaView> */}
      {/* <ScrollView
        className="h-full"
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      > */}
      {children}
      {/* </ScrollView> */}
      {/* </SafeAreaView> */}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  scrollContent: { flexGrow: 1 },
  safeArea: {
    height: "100%",
    flex: 1,
  },
});

export default CustomKeyboardView;
