import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "./components/CustomKeyboardView";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  const content = (
    <SafeAreaView className="flex-1 w-full flex flex-col bg-purple border  items-center justify-start">
      <Image
        className="   rounded-full h-[221px] w-[221px]"
        source={require("../assets/images/CMlogo.png")}
      />

      <View className="w-[80%]   flex-col justify-center items-center">
        <Text className="text-white text-2xl mt-3">Sign up to get started</Text>
        <Text className="text-neutral-300  text-center text-xl my-5  mb-5 leading-1">
          To sign up, enter your school email and choose a new password
        </Text>
      </View>
      <SignUpForm />
      <View className="mt-2">
        <Text className="text-white text-lg mt-2">
          Already have an account?
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("sign-in")}>
        <Text className="text-orange-400 mt-0 text-lg font-medium">
          Sign in
        </Text>
      </TouchableOpacity>

      <View className="w-[60%] flex  text-center items-center justify-center mt-10">
        <Text className="text-white text-base text-center">
          By continuing, you agree to our{" "}
          <Link className="text-orange-400 text-base" href={""}>
            Terms{" "}
          </Link>
          and{" "}
          <Link className="text-orange-400 text-base" href={""}>
            Privacy Policy
          </Link>
          .
        </Text>
      </View>
    </SafeAreaView>
  );

  return Platform.OS === "web" ? (
    content
  ) : (
    <CustomKeyboardView>{content}</CustomKeyboardView>
  );
};

export default SignUp;
