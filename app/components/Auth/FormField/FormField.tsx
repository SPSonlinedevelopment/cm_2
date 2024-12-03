import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BaseButton, RawButton } from "react-native-gesture-handler";

export const initialFormState = {
  name: { isError: false, message: "" },
  email: { isError: false, message: "" },
  password: { isError: false, message: "" },
};

interface CustomFormFieldProps {
  placeholderText: string;
  refName: any;
  otherStyles?: string;
  icon?: React.ReactNode;
  type: string;
  editable?: boolean;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  error: {
    name: { isError: boolean; message: string };
    email: { isError: boolean; message: string };
    password: { isError: boolean; message: string };
  };
  seterror: React.Dispatch<
    React.SetStateAction<{
      name: { isError: boolean; message: string };
      email: { isError: boolean; message: string };
      password: { isError: boolean; message: string };
    }>
  >;
}

const FormField: React.FC<CustomFormFieldProps> = ({
  placeholderText,
  otherStyles,
  icon,
  type,
  refName,
  error,
  seterror,
  editable,
  setAlertMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisble] = useState(false);

  useEffect(() => {
    setPasswordVisble(true);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let errorObj: { isError: boolean; message: string } = {
    isError: false,
    message: "",
  };

  if (type === "password") {
    errorObj = error.password;
  } else if (type === "email") {
    errorObj = error.email;
  } else if (type === "name") {
    errorObj = error.name;
  }

  const handleInputChange = (value: any) => {
    refName.current = value;

    setAlertMessage("");

    if (type === "name") {
      seterror((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          name: { isError: false, message: "" },
        };
        return newErrors;
      });
    }

    if (type === "email") {
      seterror((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          email: { isError: false, message: "" },
        };
        return newErrors;
      });
    }

    if (type === "password") {
      seterror((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          password: { isError: false, message: "" },
        };
        return newErrors;
      });
    }
  };

  return (
    <View>
      <View
        className={`h-[50px] w-[330px] my-1 flex-row items-center justify-start bg-white ${
          isFocused
            ? `border-4 border-purple-300 bg-white `
            : errorObj.isError
            ? `border `
            : `border-none`
        } pl-3  rounded-full font-semibold  ${otherStyles}`}
      >
        {icon}

        <TextInput
          textContentType="none"
          autoComplete="off"
          testID="input"
          editable={!editable}
          placeholderTextColor="purple"
          secureTextEntry={type === "password" && passwordVisible}
          style={{
            justifyContent: "center",
            fontSize: 16,
            borderWidth: 0,
            outline: "none",
            color: "purple",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={` h-full w-[80%] pl-2  justify-center items-center border-none
          }`}
          placeholder={placeholderText}
          onChangeText={(value) => {
            handleInputChange(value);
          }}
        />

        {type === "password" && (
          <BaseButton onPress={() => setPasswordVisble(!passwordVisible)}>
            {!passwordVisible ? (
              <Ionicons name="eye-outline" size={24} color="purple" />
            ) : (
              <Ionicons name="eye-off-outline" size={24} color="purple" />
            )}
          </BaseButton>
        )}
      </View>
      {errorObj?.isError && (
        <View className="w-full flex items-center">
          <Text className="text-red-500  py-1">{errorObj.message}</Text>
        </View>
      )}
    </View>
  );
};

export default FormField;
