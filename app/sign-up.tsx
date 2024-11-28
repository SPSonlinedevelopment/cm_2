import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "./components/CustomKeyboardView";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";

const SignUp = () => {
  return (
    <CustomKeyboardView>
      <SafeAreaView className="flex-1 w-full flex flex-col bg-purple border  items-center justify-start">
        <View className=" w-full flex flex-row justify-between">
          <Link
            className="ml-6 text-neutral-300 font-pmedium text-lg"
            href={"index"}
          >
            Go back
          </Link>
          <Link
            className="mr-6  font-pextrabold text-orange-400 text-lg"
            href={"sign-in"}
          >
            Sign In
          </Link>
        </View>

        <Image
          className="   rounded-full h-[221px] w-[221px]"
          source={require("../assets/images/CMlogo.png")}
        />

        <View className="w-[80%]   flex-col justify-center items-center">
          <Text className="text-white text-2xl mt-3">
            Sign up to get started
          </Text>
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
        <Link
          className="text-orange-400 mt-0 text-lg font-psemibold"
          href={"sign-in"}
        >
          Sign In
        </Link>
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
    </CustomKeyboardView>
  );
};

export default SignUp;
