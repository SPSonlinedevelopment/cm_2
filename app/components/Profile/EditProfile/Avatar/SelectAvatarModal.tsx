import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ExitButton from "@/app/components/Buttons/ExitButton";
import { avatarArray } from "./Avatar";
import { ImageProps } from "react-native";
import SaveChangesButton from "../Buttons/SaveChangesButton";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/authContext";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SelectAvatarModal: React.FC<{
  displayModal: boolean;
  setDisplayModal: React.Dispatch<boolean>;
  avatarName: string;
}> = ({ displayModal, setDisplayModal, avatarName }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<{
    source: any;
    name: string;
  }>({ source: undefined, name: avatarName });

  const { userDetails } = useAuth();

  const saveChanges = async () => {
    try {
      const menteeDocRef = doc(db, "mentees", userDetails.uid);
      const getDocSnap = await getDoc(menteeDocRef);

      if (getDocSnap.exists()) {
        await updateDoc(menteeDocRef, { avatarName: selectedAvatar.name });
      } else {
        const mentorDocRef = doc(db, "mentors", userDetails.uid);
        await updateDoc(mentorDocRef, { avatarName: selectedAvatar.name });
      }

      setDisplayModal(false);
    } catch (error) {
      console.log("🚀 ~ saveChanges ~ error:", error);
      Alert.alert("Error updating Avatar");
    }
  };

  return (
    <Modal animationType="slide" visible={displayModal}>
      <ExitButton cleanUpFunctions={() => {}} toggleDisplay={setDisplayModal} />
      <View className="w-full h-full">
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
          {!selectedAvatar.source ? (
            <Avatar avatarName={avatarName} size={120} />
          ) : (
            <Image
              className="rounded-full w-[120px] h-[120px] "
              source={selectedAvatar.source}
            />
          )}

          <Text className="text-base font-bold"> Your Avatar</Text>
          <View className="flex-row flex-wrap w-full justify-center">
            {avatarArray.map((avatar) => {
              return (
                <SelectAvatarButton
                  key={avatar.name}
                  selectedAvatar={selectedAvatar}
                  setSelectedAvatar={setSelectedAvatar}
                  name={avatar.name}
                  source={avatar.source}
                />
              );
            })}
          </View>
          <SaveChangesButton handlePress={() => saveChanges()} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SelectAvatarModal;

const SelectAvatarButton: React.FC<{
  name: string;
  source: any;
  setSelectedAvatar: React.Dispatch<any>;
  selectedAvatar: any;
}> = ({ name, source, setSelectedAvatar, selectedAvatar }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedAvatar({ source: source, name: name });
      }}
      className={`rounded-full shadow bg-white m-2 p-1 ${
        source === selectedAvatar ? "bg-purple" : "bg-white"
      }`}
      key={name}
    >
      <Image className="rounded-full w-[90px] h-[90px] " source={source} />
    </TouchableOpacity>
  );
};
