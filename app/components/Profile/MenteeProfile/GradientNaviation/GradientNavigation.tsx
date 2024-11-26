import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivateCameraBtn,
  ChatNavBtn,
  ProfileNavBtn,
} from "../../../Home/HomeNavButtons/HomeNavButtons";

import { useAuth } from "@/app/context/authContext";

const GradientNavigation = () => {
  const { userDetails, getUpdatedAuthObj, user } = useAuth();

  return (
    <View className="absolute h-[100px]  w-[100%] z-20 bottom-0  flex flex-col justify-end   ">
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,1)"]}
        style={styles.background}
      />
      <View className="flex flex-row w-full justify-between items-end mb-4">
        <ChatNavBtn />

        {userDetails?.mode === "mentee" && <ActivateCameraBtn />}

        <ProfileNavBtn />
      </View>
    </View>
  );
};

export default GradientNavigation;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    pointerEvents: "box-none",
  },
  button: {
    padding: 15,
    alignItems: "center",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
