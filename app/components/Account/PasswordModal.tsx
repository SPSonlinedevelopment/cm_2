import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { Children, useState } from "react";
import ExitButton from "../Buttons/ExitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseButton } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "../Buttons/IconButton";
import { useAuth } from "@/app/context/authContext";
import { auth } from "@/firebaseConfig";
import { updatePassword } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { validatePassword } from "../../components/Auth/validateInputs/validation";
import CustomKeyboardView from "../CustomKeyboardView";

const PasswordModal: React.FC<{
  setDisplayChangePasswordModal: React.SetStateAction<boolean>;
}> = ({ setDisplayChangePasswordModal }) => {
  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const handleChangePassword = async () => {
    setIsLoading(true);

    if (
      newPassword.trim().length === 0 ||
      confirmNewPassword.trim().length === 0
    ) {
      console.log("empty");
      setMessage("Please add passwords");
      setIsLoading(false);
      return;
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      console.log("passwords do not match");
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (
      newPassword.trim() === confirmNewPassword.trim() &&
      newPassword.trim().length < 8
    ) {
      setMessage("Passwords too short");
      console.log("passwords too short");
      setIsLoading(false);
      return;
    }

    if (
      !validatePassword(confirmNewPassword) ||
      !validatePassword(newPassword)
    ) {
      setMessage("Passwords must meet password criteria");
      console.log("passwords too short");
      setIsLoading(false);
      return;
    }

    try {
      await updatePassword(user, newPassword);
      console.log("password changed");
      setMessage("Password changed successfully");
    } catch (error) {
      console.log("error setting new password ", error);
      Alert.alert("error123");
      console.log("password  NOT changed");
    }
    setIsLoading(false);
  };

  return (
    <Modal animationType="slide">
      <CustomKeyboardView>
        <SafeAreaView>
          <ExitButton toggleDisplay={setDisplayChangePasswordModal} />

          <View className="w-full h-full flex items-center justify-start ">
            <View className=" w-full  flex items-center justify-between mt-[100px]">
              <Text className="text-lg font-bold ">Password</Text>
              <View className=" w-full p-4 rounded-2xl flex items-start justify-center">
                {message.length > 0 && (
                  <View
                    className={` ${
                      message !== "Password changed successfully"
                        ? "border-red-600 bg-red-100"
                        : "border-green-600 bg-green-100"
                    } border rounded-2xl w-full px-2 flex flex-row justify-between items-center`}
                  >
                    <Text className="text-sm "> {message} </Text>
                    <IconButton
                      containerStyles="bg-transparent"
                      icon={<Entypo name="cross" size={20} color="black" />}
                      handlePress={() => setMessage("")}
                    />
                  </View>
                )}

                <Input
                  error={
                    message.length > 0 &&
                    message !== "Password changed successfully"
                  }
                  handleTextChange={(val) => {
                    setNewPassword(val);
                    setMessage("");
                  }}
                  text="New Password"
                  type="newPassword"
                />
                <Input
                  error={
                    message.length > 0 &&
                    message !== "Password changed successfully"
                  }
                  handleTextChange={(val) => {
                    setConfirmNewPassword(val);
                    setMessage("");
                  }}
                  text="Confirm New Password"
                  type="conformNewPassword"
                />
              </View>
            </View>

            {message === "Passwords must meet password criteria" && (
              <View className=" my-7 p-3 shadow bg-purple-200 rounded-2xl ">
                <Text className="font-bold">Password requirements:</Text>
                <Text className="m-1">- Minimum 8 characters</Text>
                <Text className="m-1">
                  - Mix of uppercase and lowercase letters
                </Text>
                <Text className="m-1">- Include numbers</Text>
                <Text className="m-1">
                  - Use special characters for security
                </Text>
                <Text className="m-1">- Password expiry may be enforced</Text>
              </View>
            )}
            <IconButton
              isLoading={loading}
              containerStyles="w-[300px] h-[40px] p-3 m-3 shadow"
              title="Change my Password"
              handlePress={() => handleChangePassword()}
            />
          </View>
        </SafeAreaView>
      </CustomKeyboardView>
    </Modal>
  );
};

export default PasswordModal;

const Input: React.FC<{
  error: boolean;
  type: string;
  text: string;
  handleTextChange: React.Dispatch<React.SetStateAction<string>>;
}> = ({ type, text, handleTextChange, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View className="w-full my-3 ">
      <Text className="text-base">{text}</Text>
      <View
        className={`flex my-2 flex-row w-full shadow-sm bg-white rounded-2xl p-1 items-center  justify-between ${
          error ? "border border-red-600" : ""
        }`}
      >
        <TextInput
          secureTextEntry={!passwordVisible}
          onChangeText={handleTextChange}
          placeholderTextColor="grey"
          style={{
            paddingHorizontal: 3,
            width: "90%",
            height: 46,
            fontSize: 16,
          }}
          // placeholder={text}
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          {passwordVisible ? (
            <Ionicons name="eye-outline" size={24} color="purple" />
          ) : (
            <Ionicons name="eye-off-outline" size={24} color="purple" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
