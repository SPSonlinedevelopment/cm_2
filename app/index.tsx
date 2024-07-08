import { Pressable, Text, View, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "./components/Buttons/CustomButton";
import IconButton from "./components/Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import IndexQuestionInput from "./components/IndexQuestionInput";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [displayQuestionInput, setDisplayQuestionInput] = useState(false);

  const handleKeyboardButtonPressed = () => {
    setDisplayQuestionInput(true);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="h-full bg-purple flex flex-col  items-center justify-between">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const main = (
    <>
      <AuthContextProvider>
        {displayQuestionInput ? (
          <IndexQuestionInput toggleDisplayInput={setDisplayQuestionInput} />
        ) : (
          <CameraView
            facing={"back"}
            className="bg-purple flex flex-col items-center justify-between"
            style={{ height: "100%" }}
          >
            <View className="flex flex-col items-center">
              <View className="flex flex-col justify-center pt-10">
                <Text className="text-white pt-5 text-xl font-bold">
                  Hello there 👋
                </Text>
              </View>

              <View className="w-[80%] flex justify-center items-center">
                <Text className="mt-4 text-white text-2xl font-bold text-center">
                  What do you need help with?
                </Text>
              </View>
            </View>

            <View>
              <View className="flex-row w-full justify-center items-center">
                <View className="h-[80px] w-[80px]"></View>
                <IconButton
                  icon={<AntDesign name="camera" size={35} color="white" />}
                  containerStyles="h-[80] w-[80]"
                  handlePress={() => {}}
                />

                <IconButton
                  icon={<Entypo name="keyboard" size={24} color="black" />}
                  containerStyles="h-[60] w-[60] bg-white m-3"
                  handlePress={() => {
                    handleKeyboardButtonPressed();
                  }}
                />
              </View>
              <View className="flex-row w-full justify-between p-4">
                <IconButton
                  title="Chat"
                  icon={<Entypo name="chat" size={24} color="white" />}
                  handlePress={() => {}}
                  containerStyles="h-[60] w-[60] bg-transparent m-3"
                />

                <IconButton
                  icon={
                    <MaterialIcons name="perm-media" size={24} color="white" />
                  }
                  handlePress={() => {}}
                  containerStyles="h-[60] w-[60] bg-transparent m-3"
                />
                <IconButton
                  title="Profile"
                  icon={<Entypo name="user" size={24} color="white" />}
                  handlePress={() => {}}
                  containerStyles="h-[60] w-[60] bg-transparent m-3"
                />
              </View>
            </View>
          </CameraView>
        )}
      </AuthContextProvider>
    </>
  );
  return (
    <View style={{ backgroundColor: "green", height: "40%" }}>
      <Text>fdhksh</Text>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
