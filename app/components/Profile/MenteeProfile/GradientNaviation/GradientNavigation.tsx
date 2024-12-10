import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivateCameraBtn,
  ChatNavBtn,
  ProfileNavBtn,
  EditProfileNavBtn,
} from "../../../Home/HomeNavButtons/HomeNavButtons";

import { useAuth } from "@/app/context/authContext";

const GradientNavigation = () => {
  const { userDetails, getUpdatedAuthObj, user } = useAuth();

  return (
    <View className=" h-[100px] absolute w-[100%] shadow-xl  z-40 bottom-[0px]  orange flex flex-col justify-end    ">
      {Platform.OS !== "web" ? (
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,1)"]}
          style={styles.background}
        />
      ) : (
        <View className="absolute h-[75px] bg-white border-t-[0.5px]  border-fuchsia-800  w-[100%] z-0 shadow-2xl bottom-0  flex flex-col justify-end"></View>
      )}

      <View
        className={`flex flex-row w-full justify-between items-end mb-4 ${
          Platform.OS === "web" ? "mb-0" : "mb-4"
        }`}
      >
        <ProfileNavBtn />
        {userDetails?.mode === "mentee" && Platform.OS !== "web" && (
          <ActivateCameraBtn />
        )}
        <ChatNavBtn />

        <EditProfileNavBtn />
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
