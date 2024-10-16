import { View, Text, TextInput } from "react-native";
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

  const emailContent = field === "email" && (
    <View className="flex flex-row items-center w-24 justify-center bg-purple-200 p-1 m-3 rounded-full">
      {user.emailVerified ? (
        <>
          <MaterialIcons name="verified-user" size={20} color="purple" />
          <Text className="text-xs mx-2 text-purple-100">Verified</Text>
        </>
      ) : (
        <>
          <Octicons name="unverified" size={24} color="red" />
          <Text className="text-xs mx-2 text-purple-100">Not verified</Text>
        </>
      )}
    </View>
  );

  return (
    <View className=" w-full p-4 rounded-2xl flex items-start justify-center">
      <View className="w-full my-2 flex ">
        <View className="flex flex-row items-center">
          <Text className="my-2 text-base ">{field}</Text>
          {emailContent}
        </View>

        <TextInput
          onChangeText={handleChange}
          placeholderTextColor={"grey"}
          className="px-3 text-base shadow-sm bg-white rounded-full h-[46px]"
          placeholder={currentVal}
        />
      </View>
    </View>
  );
};

export default InputFieldContainer;
