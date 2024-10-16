import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/authContext";
import { useNavigation } from "@react-navigation/native";

import CustomKeyboardView from "../../CustomKeyboardView";

const EditProfile = () => {
  const { userDetails } = useAuth();

  const [formField, setFormField] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    email: userDetails?.email || "",
    partnership: userDetails?.partnership || "",
  });
  console.log(formField);

  const navigation = useNavigation();

  const saveChanges = async () => {};

  return (
    <CustomKeyboardView containerStyles="h-full">
      <SafeAreaView>
        <BackButton handlePress={async () => navigation.goBack()} />
        <View className="w-full items-center justify-center  ">
          <Text className="font-pbold text-lg">My Profile</Text>
          <AvatarEdit userDetails={userDetails} />

          <View className="w-[95%] bg-white rounded-xl">
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={formField?.firstName}
              field="firstName"
            />
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={formField?.lastName}
              field="lastName"
            />
            <EmailContainer setFormField={setFormField} />
            <InputFieldContainer
              setFormField={setFormField}
              currentVal={formField?.partnership}
              field="partnerships"
            />
          </View>
        </View>

        <SaveChangesButton handlePress={() => saveChanges()} />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default EditProfile;
