import { View, Text, TextInput, Dimensions } from "react-native";
import React from "react";
import { useAuth } from "@/app/context/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

const InputFieldContainer: React.FC<{
  currentVal: string;
  field: string;
  setFormField: React.SetStateAction<any>;
}> = ({ field, currentVal, setFormField }) => {
  const { user } = useAuth();

  const handleChange = (text: string) => {
    setFormField((prev: {}) => {
      return { ...prev, [field]: text };
    });
  };

  const { width } = Dimensions.get("window");
  const emailContent = field === "email" && (
    <View
      className={`flex flex-row items-center justify-center bg-purple-200 p-1 m-3 rounded-full ${
        user?.emailVerified ? " w-24" : "w-30 bg-orange-200"
      }`}
    >
      {user?.emailVerified ? (
        <>
          <MaterialIcons name="verified-user" size={20} color="purple" />
          <Text className="text-xs mx-2 text-purple-100">Verified</Text>
        </>
      ) : (
        <View className="w-[200px] flex justify-center flex-row items-center">
          <Octicons name="unverified" size={20} color="red" />
          <Text className="text-xs mx-2 my-1 text-red-600">Not verified</Text>
        </View>
      )}
    </View>
  );

  type FieldLabels = {
    [key: string]: string;
  };
  const fieldLabels: FieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    partnership: "Partnership",
  };

  const displayField = fieldLabels[field] || "Unknown Field";

  return (
    <View className=" w-full p-4 rounded-2xl flex   items-start justify-center">
      <View
        className={`w-full my-1  flex ${
          width < 500 ? "flex-col" : "flex-row  "
        }`}
      >
        <View className="flex flex-row items-center  w-[27%]">
          <Text className="my-1 text-base ">{displayField}</Text>
          <View className={` ${width < 500 ? "flex-col" : "flex-row  "}`}>
            {emailContent}
          </View>
        </View>

        <TextInput
          onChangeText={handleChange}
          placeholderTextColor={"purple"}
          className="px-3 text-base w-full shadow bg-white rounded-full h-[46px] text-purple "
          placeholder={currentVal}
        />
      </View>
    </View>
  );
};

export default InputFieldContainer;
