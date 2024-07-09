import { View, Text, Button } from "react-native";
import React from "react";
import CustomButton from "./components/Buttons/CustomButton";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import Header from "./components/Profile/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "./components/Profile/Avatar";

const profile = () => {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logOut();
      console.log("res", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
      <View className="h=full w-full flex flex-col items-center">
        <Header />
        <CustomButton
          handlePress={() => {
            handleLogout();
          }}
          title="logout"
        ></CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default profile;
