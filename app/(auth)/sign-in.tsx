import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import CustomButton from "../components/CustomButton/CustomButton";
import FormField from "../components/FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CustomKeyboardView from "../components/CustomKeyboardView";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleChange = () => {};

  const handleLogin = () => {
    setLoading(true);
  };
  return (
    <CustomKeyboardView>
      <SafeAreaView className="bg-purple h-full flex justify-between items-center">
        <View className="flex flex-row  justify-between   w-full">
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
        <View className="h-[220px] w-[220px]  border-none rounded-full bg-orange"></View>

        <View className="w-[80%]   flex-col justify-center items-center">
          <Text className="text-white text-2xl mt-3">Welcome to Colet</Text>
          <Text className="text-neutral-300  text-center text-base p-4 leading-1">
            Sign in to join our community
          </Text>
        </View>

        <FormField
          type="email"
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="grey"
            />
          }
          placeholderText="Email"
          handlePress={handleChange}
        ></FormField>
        <FormField
          type="password"
          icon={<AntDesign name="lock" size={24} color="grey" />}
          placeholderText="Password"
          handlePress={handleChange}
        ></FormField>
        <CustomButton
          isLoading={loading}
          containerStyles=""
          handlePress={() => {
            handleLogin();
          }}
          title="Login"
        ></CustomButton>
        <View>
          <Text className="text-white text-base my-1">
            Don't have an account?
          </Text>
        </View>
        <Link className="text-orange-400 font-psemibold" href={"sign-up"}>
          Sign Up
        </Link>
        <View className="w-[60%] flex  text-center items-center justify-center my-5">
          <Text className="text-white text-xs text-center">
            By continuing, you agree to our{" "}
            <Link className="text-orange-400 text-xs" href={""}>
              Terms{" "}
            </Link>
            and{" "}
            <Link className="text-orange-400 text-xs" href={""}>
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
