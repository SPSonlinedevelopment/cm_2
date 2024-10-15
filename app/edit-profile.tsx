import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingViewComponent,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Profile/Header";
import ExitButton from "./components/Buttons/ExitButton";
import { useAuth } from "./context/authContext";
import Avatar from "./components/Profile/Avatar";
import IconButton from "./components/Buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import CustomKeyboardView from "./components/CustomKeyboardView";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { userDetails, verifyEmail, user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    setFirstName(userDetails?.firstName);
    setLastName(userDetails?.lastName);
    setEmail(userDetails?.email);
  }, []);

  const [loading, setIsloading] = useState(false);
  const [emailVerificationButtonText, setEmailVerificationButtonText] =
    useState("Resend Verification Email");

  const containerStyles = " w-full my-4 flex";
  const textStyles = "my-2 text-base text-purple-800";
  const inputStyles =
    " px-3 text-base shadow-sm bg-white rounded-full h-[46px]";

  const handleResendVerification = async () => {
    setIsloading(true);
    try {
      const result = await verifyEmail();
      if (result.success) {
        setEmailVerificationButtonText("Email Sent! Check your email.");
      }
    } catch (error) {
      console.log(error);
    }

    setIsloading(false);
  };

  return (
    <CustomKeyboardView containerStyles="h-full">
      <SafeAreaView>
        <IconButton
          icon={<Ionicons name="chevron-back" size={24} color="black" />}
          containerStyles=" bg-white shadow w-[40px] h-[40px] absolute left-3 top-10"
          handlePress={() => {
            navigation.goBack();
          }}
        ></IconButton>
        <View className="w-full items-center justify-center  ">
          <Text className="font-pbold text-lg">My Profile</Text>
          <AvatarEdit userDetails={userDetails} />

          <View className="bg-white w-[95%] p-4 rounded-2xl flex items-start justify-center">
            <View className={containerStyles}>
              <Text className={textStyles}>First Name</Text>
              <TextInput
                placeholderTextColor={"grey"}
                className={inputStyles}
                placeholder={firstName}
              />
            </View>

            <View className={containerStyles}>
              <Text className={textStyles}>Last Name</Text>
              <TextInput
                placeholderTextColor={"grey"}
                className={inputStyles}
                placeholder={lastName}
              />
            </View>

            <View className={containerStyles}>
              <View className="flex flex-row items-center">
                <Text className={textStyles}>Email Address</Text>
                {user.emailVerified ? (
                  <View className="flex flex-row items-center justify-center bg-purple-200 p-1 m-3 rounded-full">
                    <MaterialIcons
                      name="verified-user"
                      size={20}
                      color="purple"
                    />
                    <Text className="text-xs mx-2 text-purple-100">
                      Verified
                    </Text>
                  </View>
                ) : (
                  <View className="flex flex-row items-center justify-center bg-purple-200 p-1 m-3 rounded-full">
                    <Octicons name="unverified" size={24} color="red" />
                    <Text className="text-xs mx-2 text-purple-100">
                      Not verified
                    </Text>
                  </View>
                )}
              </View>
              <TextInput
                placeholderTextColor={"grey"}
                className={inputStyles}
                placeholder={email}
              />
            </View>

            {!user.emailVerified && (
              <IconButton
                containerStyles="   justify-center items-center  h-[40px] w-[360px] rounded-full"
                title={emailVerificationButtonText}
                handlePress={() => handleResendVerification()}
              />
            )}

            <View className={containerStyles}>
              <Text className={textStyles}>Partnership</Text>
              <TextInput
                placeholderTextColor={"grey"}
                className={inputStyles}
                placeholder={userDetails.partnership}
              />
            </View>
          </View>
          <IconButton
            isLoading={loading}
            title="Save Changes"
            textStyles="text-base font-semibold"
            containerStyles="   justify-center items-center  h-[40px] w-[360px] "
            handlePress={() => {}}
          />
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default EditProfile;

const AvatarEdit = ({ userDetails: {} }) => {
  return (
    <View className=" w-full flex items-center justify-center my-4">
      <Avatar size={100} avatarName={userDetails?.avatarName} />

      <IconButton
        icon={<Entypo name="edit" size={24} color="black" />}
        containerStyles="w-[30px] h-[30px] bg-white  relative bottom-[30px]"
        handlePress={() => {}}
      ></IconButton>
    </View>
  );
};
