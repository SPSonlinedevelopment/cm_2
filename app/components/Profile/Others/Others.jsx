import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import IconButton from "../../Buttons/IconButton";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import OtherListItemComponent from "./OtherListItemComponent";
import BorderUnderline from "../BorderUnderline";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MessageGeneralModal from "../../Chats/Chatroom/MessageSelected/MessageGeneralModal";

const Others = () => {
  const [displayDeleteAccountModal, setDisplayDeleteAccountModal] =
    useState(false);
  const [displayLogoutModal, setDisplayLogoutModal] = useState(false);

  return (
    <View className="w-[93%]">
      <View className="flex flex-row items-center">
        <Entypo name="dots-three-horizontal" size={16} color="black" />
        <Text className="text-lg font-bold "> Others</Text>
      </View>
      <MessageGeneralModal
        type="deleteAccount"
        text={{
          headerText: "Delete Account",
          bodyText:
            "Are you sure you want to delete your account your data will be lost!",
        }}
        setDisplayModal={setDisplayDeleteAccountModal}
        displayModal={displayDeleteAccountModal}
      />

      <MessageGeneralModal
        type="logout"
        text={{
          headerText: "Logout of Account",
          bodyText: "Are you sure you want to logout?",
        }}
        setDisplayModal={setDisplayLogoutModal}
        displayModal={displayLogoutModal}
      />

      <OtherListItemComponent
        icon={<FontAwesome name="share" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        iconStyles=""
        text="Share with Friends"
      />

      <OtherListItemComponent
        icon={<MaterialIcons name="contact-support" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        text="Contact us"
      />

      <OtherListItemComponent
        icon={<Entypo name="dots-three-horizontal" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        text="I'm a mentor"
      />

      <OtherListItemComponent
        icon={<Entypo name="log-out" size={20} color="white" />}
        handlePress={() => setDisplayLogoutModal(true)}
        iconColor="bg-red-500"
        iconStyles="rotate-180"
        text="Sign Out"
      />

      <OtherListItemComponent
        icon={<MaterialIcons name="delete" size={20} color="white" />}
        handlePress={() => setDisplayDeleteAccountModal(true)}
        iconColor="bg-red-500"
        text="Delete Account"
      />
    </View>
  );
};

export default Others;
