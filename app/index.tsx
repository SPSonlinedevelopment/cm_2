import { Pressable, Text, View } from "react-native";
import React, { useContext } from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  // const { isLoading, isLoggedIn } = useGlobalContext();

  // if (!isLoading && isLoggedIn) return <Redirect href="./home"></Redirect>;
  return (
    <SafeAreaView className="bg-purple h-full flex justify-center items-center">
      {/* <ScrollView contentContainerStyle={{ height: "90%" }}></ScrollView> */}

      <View className="m-6">
        <Pressable onPress={() => router.push("sign-up")}>
          <Text className="text-white text-lg"> Continue to sign up </Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => router.push("sign-in")}>
          <Text className="text-white text-lg"> Continue to sign in </Text>
        </Pressable>
      </View>

      {/* <StatusBar style="light"></StatusBar> */}
    </SafeAreaView>
  );
};

export default RootLayout;
