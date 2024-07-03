import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "./components/Buttons/CustomButton";
import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

const RootLayout = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  return (
    <CameraView
      facing={facing}
      className="bg-purple flex flex-col  items-center justify-between "
      style={{ flex: 1 }}
    >
      <View className=" flex flex-col items-center">
        <View className="flex flex-col justify-center pt-10">
          <Text className="text-white text-lg pt-5">
            {" "}
            Hello there Colin 👋{" "}
          </Text>
        </View>

        <View className=" w-[80%] flex  justify-center items-center ">
          <Text className="mt-4 text-white text-xl">
            What do you need help with?
          </Text>
        </View>
      </View>

      <View>
        <View className="flex-row w-full  justify-center items-center">
          <View className="h-[80px] w-[80px]"></View>
          <IconButton
            icon={<AntDesign name="camera" size={35} color="white" />}
            containerStyles="h-[80] w-[80] "
            handlePress={() => {}}
          />

          <IconButton
            icon={<Entypo name="keyboard" size={24} color="black" />}
            containerStyles="h-[60] w-[60] bg-white  m-3"
            handlePress={() => {}}
          />
        </View>
        <View className="flex-row w-full  justify-between p-4 ">
          <IconButton
            icon={<Entypo name="chat" size={24} color="white" />}
            handlePress={() => {}}
            containerStyles="h-[60] w-[60] bg-transparent   m-3"
          />

          <IconButton
            icon={<MaterialIcons name="perm-media" size={24} color="white" />}
            handlePress={() => {}}
            containerStyles="h-[60] w-[60] bg-transparent   m-3"
          />
          <IconButton
            icon={<Entypo name="user" size={24} color="white" />}
            handlePress={() => {}}
            containerStyles="h-[60] w-[60] bg-transparent   m-3"
          />
        </View>
      </View>
      {/* 
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={() => router.push("sign-up")}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue to sign up
          </Text>
        </Pressable>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={() => router.push("sign-in")}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue to sign in
          </Text>


        </Pressable>
      </View> */}
    </CameraView>
  );
};

export default RootLayout;
