import { View, Text, Alert, ScrollView } from "react-native";
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
import FadeInView from "./components/Effects/FadeInView";
import SubjectSelection from "./components/Profile/EditProfile/SubjectSelection";

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

  const saveChanges = async () => {
    const docRef = doc(db, mode, userDetails?.uid);

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
      await updateDoc(docRef, updateData);
      setDisplayUpatedAlert("success");
    } catch (error) {
      console.log(error);
      setDisplayUpatedAlert("error");
    }

    setTimeout(() => {
      setDisplayUpatedAlert("");
    }, 3000);
  };

  console.log("testavatar1", userDetails.avatarName);
  return (
    <CustomKeyboardView containerStyles="h-full">
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
              containerStyles="bg-green-400 shadow rounded-xl p-2 w-[95%] m-6 flex items-center"
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
              containerStyles="bg-green-400 shadow rounded-full p-2 w-[95%] flex items-center "
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
