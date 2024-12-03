import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "./components/CustomKeyboardView";
import SignInForm from "./components/Auth/SignIn/SignInForm";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();

  const content = (
    <SafeAreaView className=" pt-3 w-full h-full flex flex-col bg-purple   items-center justify-start">
      <Image
        className="  mt-5  rounded-full h-[210px] w-[210px]"
        source={require("../assets/images/CMlogo.png")}
      />

      <View className="w-[80%]   flex-col justify-center items-center">
        <Text className="text-white text-2xl mt-3 ">Welcome to Colet</Text>
        <Text className="text-neutral-300  text-center text-xl p-5 leading-1 font-medium">
          Sign in to join our community
        </Text>
      </View>

      <SignInForm />

      <Text className=" text-center text-white text-lg mt-10">
        Don't have an account?
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("sign-up")}
        className=" text-neutral-300 font-pmedium text-lg flex justify-center items-center"
      >
        <Text className="text-orange-400 font-med text-lg">Sign up</Text>
      </TouchableOpacity>

      <View className="w-[60%] flex  text-center items-center justify-center mt-10">
        <Text className="text-white text-base text-center ">
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

export default SignIn;
