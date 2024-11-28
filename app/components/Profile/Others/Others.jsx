import { View, Text } from "react-native";
import React, { useState, useMemo } from "react";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import OtherListItemComponent from "./OtherListItemComponent";
import MessageGeneralModal from "../../Chats/Chatroom/MessageSelected/MessageGeneralModal";
import PasswordModal from "../../Account/PasswordModal";
import { sendEmailToColletTeam } from "../../../../services/mail/sendEmail";
import shareApp from "../../../../services/share/shareApp";

const Others = () => {
  const { userDetails } = useAuth();
  const [displayDeleteAccountModal, setDisplayDeleteAccountModal] =
    useState(false);
  const [displayLogoutModal, setDisplayLogoutModal] = useState(false);
  const [displayPassWordModal, setDisplayChangePasswordModal] = useState(false);
  const [displaySwitchModeModal, setDisplaySwitchModeModal] = useState(false);

  // Helper function to toggle modals
  const toggleModal = (setter) => () => setter(true);

  // Memoized modal data to avoid re-rendering
  const modalData = useMemo(
    () => [
      {
        type: "deleteAccount",
        headerText: "Delete Account",
        bodyText:
          "Are you sure you want to delete your account? Your data will be lost!",
        displayModal: displayDeleteAccountModal,
        setDisplayModal: setDisplayDeleteAccountModal,
      },
      {
        type: "switchMode",
        headerText: "Switch Modes",
        bodyText: `Are you sure you want to switch to ${
          userDetails.mode === "mentor" ? "mentee" : "mentor"
        } mode?`,
        displayModal: displaySwitchModeModal,
        setDisplayModal: setDisplaySwitchModeModal,
      },
      {
        type: "logout",
        headerText: "Logout of Account",
        bodyText: "Are you sure you want to logout?",
        displayModal: displayLogoutModal,
        setDisplayModal: setDisplayLogoutModal,
      },
    ],
    [
      displayDeleteAccountModal,
      displaySwitchModeModal,
      displayLogoutModal,
      userDetails.mode,
    ]
  );

  const listItems = [
    {
      icon: <FontAwesome name="share" size={20} color="white" />,
      handlePress: shareApp,
      iconColor: "bg-orange",
      text: "Share with Friends",
    },
    {
      icon: <MaterialIcons name="contact-support" size={20} color="white" />,
      handlePress: () => sendEmailToColletTeam(userDetails?.firstName),
      iconColor: "bg-orange",
      text: "Contact us",
    },
    {
      icon: <Entypo name="dots-three-horizontal" size={20} color="white" />,
      handlePress: toggleModal(setDisplaySwitchModeModal),
      iconColor: "bg-orange",
      text: "Switch Mode",
    },
    {
      icon: <MaterialIcons name="password" size={24} color="white" />,
      handlePress: toggleModal(setDisplayChangePasswordModal),
      iconColor: "bg-orange",
      text: "Password",
    },
    {
      icon: <Entypo name="log-out" size={20} color="white" />,
      handlePress: toggleModal(setDisplayLogoutModal),
      iconColor: "bg-red-500",
      iconStyles: "rotate-180",
      text: "Sign Out",
    },
    {
      icon: <MaterialIcons name="delete" size={20} color="white" />,
      handlePress: toggleModal(setDisplayDeleteAccountModal),
      iconColor: "bg-red-500",
      text: "Delete Account",
    },
  ];

  return (
    <View className=" w-full bg-white rounded-2xl shadow p-3 my-3">
      <View className="flex flex-row items-center">
        <Entypo name="dots-three-horizontal" size={16} color="black" />
        <Text className="text-lg font-bold"> Others</Text>
      </View>

      {displayPassWordModal && (
        <PasswordModal
          setDisplayChangePasswordModal={setDisplayChangePasswordModal}
        />
      )}

      {modalData.map((modal, index) => (
        <MessageGeneralModal
          key={index}
          type={modal.type}
          text={{ headerText: modal.headerText, bodyText: modal.bodyText }}
          setDisplayModal={modal.setDisplayModal}
          displayModal={modal.displayModal}
        />
      ))}

      {listItems.map((item, index) => (
        <OtherListItemComponent
          key={index}
          icon={item.icon}
          handlePress={item.handlePress}
          iconColor={item.iconColor}
          iconStyles={item.iconStyles}
          text={item.text}
        />
      ))}
    </View>
  );
};

export default Others;
