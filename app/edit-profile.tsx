import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./context/authContext";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardView from "./components/CustomKeyboardView";
import BackButton from "./components/Profile/EditProfile/Buttons/BackButton";
import AvatarEdit from "./components/Profile/EditProfile/Avatar/AvatarEdit";
import InputFieldContainer from "./components/Profile/EditProfile/InputField";
import EmailContainer from "./components/Profile/EditProfile/Email";
import SaveChangesButton from "./components/Profile/EditProfile/Buttons/SaveChangesButton";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import * as EmailValidator from "email-validator";

const EditProfile = () => {
  const { userDetails } = useAuth();

  const [formField, setFormField] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    email: userDetails?.email || "",
    partnership: userDetails?.partnership || "",
    avatarName: userDetails?.avatarName || "",
  });
  console.log(formField);

  const navigation = useNavigation();

  const mode = userDetails?.mode === "mentor" ? "mentors" : "mentees";

  const saveChanges = async () => {
    const docRef = doc(db, mode, userDetails?.uid);

    if (!EmailValidator.validate(formField.email)) {
      return Alert.alert("Email is invalid");
    } else if (!formField.firstName.length) {
      return Alert.alert("Enter First Name");
    } else if (!formField.lastName.length) {
      return Alert.alert("Enter Last Name");
    }

    try {
      await updateDoc(docRef, {
        email: formField.email,
        firstName: formField.firstName,
        lastName: formField.lastName,
        partnership: formField.partnership,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomKeyboardView containerStyles="h-full">
      <SafeAreaView>
        <BackButton handlePress={async () => navigation.goBack()} />
        <View className="w-full items-center flex flex-col  justify-start ">
          <Text className="font-pbold text-lg">My Profile</Text>
          <AvatarEdit avatarName={userDetails?.avatarName} />

          <View className="w-[95%] bg-white rounded-xl">
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={userDetails?.firstName}
              field="firstName"
            />
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={userDetails?.lastName}
              field="lastName"
            />
            <EmailContainer setFormField={setFormField} />
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={userDetails?.partnership}
              field="partnership"
            />
          </View>
        </View>

        <SaveChangesButton handlePress={() => saveChanges()} />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default EditProfile;
