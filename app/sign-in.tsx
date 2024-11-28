import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "./components/CustomKeyboardView";
import SignInForm from "./components/Auth/SignIn/SignInForm";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
  return (
    <CustomKeyboardView>
      <SafeAreaView className="flex-1 pt-3 w-full h-full flex flex-col bg-purple border  items-center justify-start">
        <View className="flex flex-row  justify-between  items-center  w-full">
          <Link
            className="ml-6 text-neutral-300 font-pmedium text-lg"
            href={"index"}
            push={true}
          >
            Go back
          </Link>
          <Link
            className="mr-6 text-neutral-300 font-pmedium text-lg"
            href={"sign-in"}
          >
            Sign In
          </Link>
        </View>

        <Image
          className="   rounded-full h-[210px] w-[210px]"
          source={require("../assets/images/CMlogo.png")}
        />

        <View className="w-[80%]   flex-col justify-center items-center">
          <Text className="text-white text-2xl mt-3">Welcome to Colet</Text>
          <Text className="text-neutral-300  text-center text-xl p-5 leading-1">
            Sign in to join our community
          </Text>
        </View>

        <SignInForm />

        <View>
          <Text className="text-white text-lg my-1">
            Don't have an account?
          </Text>
        </View>
        <Link
          className="text-orange-400 font-psemibold text-lg"
          href={"sign-up"}
        >
          Sign Up
        </Link>
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
    </CustomKeyboardView>
  );
};

export default SignIn;
