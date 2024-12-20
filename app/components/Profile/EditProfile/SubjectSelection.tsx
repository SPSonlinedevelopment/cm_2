import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useAuth } from "@/app/context/authContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

const SubjectSelection = () => {
  const { userDetails, setUserDetails } = useAuth(); // Assuming you have a function to update userDetails
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const { width } = Dimensions.get("window");

  const availableSubjects = [
    "Maths",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "English",
  ]; // Example subjects

  const addSubject = () => {
    if (
      selectedSubject &&
      !userDetails.subjectSelection.includes(selectedSubject)
    ) {
      setUserDetails({
        ...userDetails,
        subjectSelection: [...userDetails.subjectSelection, selectedSubject],
      });
      setShowDropdown(false); // Close dropdown after adding
      setSelectedSubject(""); // Reset selected subject
    }
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    const newList = userDetails?.subjectSelection.filter(
      (subject: string) => subject !== subjectToDelete
    );

    setUserDetails({
      ...userDetails,
      subjectSelection: newList,
    });
  };

  return (
    <View
      className={`p-3 flex  justify-between w-full ${
        width > 500 ? "flex-row" : " flex-col"
      }`}
    >
      <Text className="my-1 text-base ">Specialist Subjects</Text>

      <View className={`flex flex-col  ${width > 500 ? "w-[75%]" : ""} `}>
        {userDetails.subjectSelection.length ? (
          <>
            {userDetails.subjectSelection.map(
              (subject: string, index: number) => (
                <View
                  key={index}
                  className="flex flex-row w-full justify-between bg-white rounded-full my-2 py-2 pr-3 items-center shadow"
                >
                  <Text className="ml-5 text-purple">{subject}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteSubject(subject)}
                  >
                    <Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )
            )}
          </>
        ) : (
          <>
            <View className="flex justify-center items-center my-2">
              <Text>No subject selected</Text>
            </View>
          </>
        )}
        <View className="flex items-center">
          {/* Dropdown for selecting new subject */}
          {showDropdown ? (
            <>
              <Picker
                style={{ width: 300 }}
                itemStyle={{ width: 300 }} // For iOS
                selectedValue={selectedSubject}
                onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              >
                <Picker.Item label="Select a subject" value="" />
                {availableSubjects.map((subject, index) => (
                  <Picker.Item
                    style={{ width: 400 }}
                    key={index}
                    label={subject}
                    value={subject}
                  />
                ))}
              </Picker>
              <View className="flex items-center">
                <TouchableOpacity
                  onPress={addSubject}
                  className="bg-white-500 w-[370px] py-2 px-4 rounded-full mt-2"
                >
                  <Text className="text-purple text-center">Add Subject</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setShowDropdown(true)}
              className="rounded-full mt-3 "
            >
              <Text className="text-orange text-center">Add New</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SubjectSelection;
