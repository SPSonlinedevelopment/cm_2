import { View, Text } from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../Buttons/CustomButton";
import FormField from "../../FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { validateInputs } from "../validateInputs/validateInputs";
import { auth } from "../../../../firebaseConfig";
import { useAuth } from "../../../context/authContext";
import { initialFormState } from "../initalFormState";

const UserDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const [alertMessage, setAlertMessage] = useState("");
  const { createNewUser } = useAuth();

  const firstNameRef = useRef(undefined);
  const lastNameRef = useRef(undefined);

  return (
    <>
      <FormField
        setAlertMessage={setAlertMessage}
        refName={firstNameRef}
        type="firstName"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="white"
          />
        }
        placeholderText="First Name"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>

      <FormField
        setAlertMessage={setAlertMessage}
        refName={lastNameRef}
        type="lastName"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="white"
          />
        }
        placeholderText="Last Name"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>
    </>
  );
};

export default UserDetailsForm;
