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
    kavConfig = { keyboardVerticalOffset: 10 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      contentContainerStyle={styles.container}
    >
      <View style={{ height: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          {...scrollViewConfig}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
});

export default CustomKeyboardView;
