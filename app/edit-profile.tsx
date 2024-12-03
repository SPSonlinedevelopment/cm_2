import { View, Text, Alert, ScrollView, Platform } from "react-native";
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
import { doc, updateDoc, getDoc } from "firebase/firestore";
import * as EmailValidator from "email-validator";
import FadeInView from "./components/Effects/FadeInView";
import SubjectSelection from "./components/Profile/EditProfile/SubjectSelection";
import NavHeaderBar from "./components/Navigation/NavHeaderBar";
import GradientNavigation from "./components/Profile/MenteeProfile/GradientNaviation/GradientNavigation";

const EditProfile = () => {
  const { userDetails } = useAuth();
  const [displayUpdatedAlert, setDisplayUpatedAlert] = useState("");

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
  console.log("🚀 ~ EditProfile ~ mode:", mode);
  const docRef = doc(db, mode, userDetails?.uid);

  const saveChanges = async () => {
    if (!EmailValidator.validate(formField.email)) {
      return Alert.alert("Email is invalid");
    } else if (!formField.firstName.length) {
      return Alert.alert("Enter First Name");
    } else if (!formField.lastName.length) {
      return Alert.alert("Enter Last Name");
    }

    // Define the common update fields
    const updateData: any = {
      email: formField.email,
      firstName: formField.firstName,
      lastName: formField.lastName,
      partnership: formField.partnership,
    };

    // Add mentor-specific fields if in mentor mode
    if (userDetails?.mode === "mentor") {
      updateData.subjectSelection = userDetails.subjectSelection;
    }

    console.log("updateData", updateData);

    try {
      const result = await getDoc(docRef);

      if (result.exists()) {
        await updateDoc(docRef, updateData);
        setDisplayUpatedAlert("success");
        return;
      } else {
        // need to update other document incase they are admin and have switched modes
        const mode = userDetails?.mode === "mentor" ? "mentees" : "mentors";
        const docRef = doc(db, mode, userDetails?.uid);
        await updateDoc(docRef, updateData);
        setDisplayUpatedAlert("success");
        return;
      }
    } catch (error) {
      console.log("error", error);
      setDisplayUpatedAlert("error");
    } finally {
      setTimeout(() => {
        setDisplayUpatedAlert("");
      }, 3000);
    }
  };

  return (
    <CustomKeyboardView containerStyles="h-full">
      {Platform.OS === "web" && <NavHeaderBar />}
      <SafeAreaView>
        <BackButton handlePress={async () => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            height: "100%",
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="font-pbold text-lg">My Profile</Text>
          <AvatarEdit avatarName={userDetails?.avatarName} />

          {displayUpdatedAlert === "error" && (
            <FadeInView
              duration={200}
              containerStyles="bg-green-400 shadow rounded-full p-2 w-[370px] m-6 flex items-center"
            >
              <Text className="text-white text-base font-semibold">
                Details Not updated, try again later.
              </Text>
            </FadeInView>
          )}

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

            {userDetails.mode === "mentor" && <SubjectSelection />}

            <EmailContainer setFormField={setFormField} />
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={userDetails?.partnership}
              field="partnership"
            />
          </View>
          {displayUpdatedAlert === "success" && (
            <FadeInView
              duration={200}
              containerStyles="bg-green-400 shadow rounded-full p-2 w-[360px] flex items-center "
            >
              <Text className="text-white text-base font-semibold">
                Details Updated Successfully
              </Text>
            </FadeInView>
          )}
          <SaveChangesButton handlePress={() => saveChanges()} />
        </ScrollView>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default EditProfile;
