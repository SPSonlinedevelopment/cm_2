import { Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <View className="bg-purple" style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={() => router.push("sign-up")}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue to sign up
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={() => router.push("sign-in")}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue to sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RootLayout;
