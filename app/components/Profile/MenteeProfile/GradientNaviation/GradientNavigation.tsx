import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivateCameraBtn,
  ChatNavBtn,
  ProfileNavBtn,
} from "../../../HomeNavButtons/HomeNavButtons";
import { useAuth } from "@/app/context/authContext";

const GradientNavigation = () => {
  const { userDetails, getUpdatedAuthObj, user } = useAuth();

  return (
    <View className="absolute h-[20vh] w-[100%] z-20 bottom-0  flex flex-col justify-end   ">
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
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
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
