import { View, Text, Button } from "react-native";
import React from "react";
import CustomButton from "../components/Buttons/CustomButton";
import { useAuth } from "../context/authContext";
import { router } from "expo-router";

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
    <View>
      <Text>profile</Text>

      <CustomButton
        handlePress={() => {
          handleLogout();
        }}
        title="logout"
      ></CustomButton>
    </View>
  );
};

export default profile;
