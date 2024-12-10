import React from "react";
import { View, Platform } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import IconButton from "../../Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { pickImage } from "../../../../utils/imagePicker";

// Centralize reusable colors
const COLORS = {
  orange: "#f37021",
  white: "white",
  grey: "grey",
  neutral: "text-neutral-400",
};

// Helper function for dynamic color logic
const getColor = (currentRouteName, targetRouteName) => {
  const { orange, grey, white } = COLORS;
  if (currentRouteName === targetRouteName) {
    return orange;
  }
  return Platform.OS === "web" ? grey : white;
};

// Helper function for dynamic text styles
const getTextStyles = (currentRouteName, targetRouteName) => {
  if (currentRouteName === targetRouteName) {
    return "text-orange";
  }
  return Platform.OS === "web" ? COLORS.neutral : "text-white";
};

// Generic Navigation Button Component
const NavigationButton = ({
  title,
  routeName,
  iconName,
  IconComponent,
  iconSize,
}) => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state.routes[state.index]);

  return (
    <IconButton
      title={title}
      textStyles={getTextStyles(currentRoute.name, routeName)}
      icon={
        <IconComponent
          name={iconName}
          size={iconSize}
          color={getColor(currentRoute.name, routeName)}
        />
      }
      handlePress={() => navigation.navigate(routeName)}
      containerStyles="h-[60px] w-[60px] bg-transparent m-3"
    />
  );
};

// Chat Navigation Button
export const ChatNavBtn = () => (
  <NavigationButton
    title="Chat"
    routeName={Platform.OS === "web" ? "web-chat" : "chats"}
    iconName="chat"
    IconComponent={Entypo}
    iconSize={30}
  />
);

// Add Media Button
export const AddMediaBtn = ({ setImage, setOpenDisplayImageModal }) => (
  <IconButton
    title="Images"
    icon={<MaterialIcons name="perm-media" size={24} color="white" />}
    handlePress={async () => {
      console.log("Open Media button clicked");
      try {
        const imageSelected = await pickImage();
        if (imageSelected) {
          setImage(imageSelected);
          setOpenDisplayImageModal(true);
        }
      } catch (error) {
        Alert.alert("Image could not be selected");
      }
    }}
    containerStyles="h-[60px] w-[60px] bg-transparent m-3"
  />
);

// Profile Navigation Button
export const ProfileNavBtn = () => (
  <NavigationButton
    title="Home"
    routeName="profile"
    iconName="home"
    IconComponent={FontAwesome}
    iconSize={30}
  />
);

// Edit Profile Button
export const EditProfileNavBtn = () => (
  <NavigationButton
    title="Profile"
    routeName="edit-profile"
    iconName="user"
    IconComponent={FontAwesome}
    iconSize={30}
  />
);

// Camera Activation Button
export const ActivateCameraBtn = () => (
  <NavigationButton
    title="Camera"
    routeName="index"
    iconName="camera"
    IconComponent={AntDesign}
    iconSize={30}
  />
);

// Home Navigation Buttons Component
const HomeNavButtons = ({ setImage, setOpenDisplayImageModal }) => (
  <View>
    <View className="flex-row w-full justify-center items-center">
      <View className="h-[80px] w-[80px]" />
    </View>
    <View className="flex-row w-full justify-between pb-3">
      <ChatNavBtn />
      <AddMediaBtn
        setImage={setImage}
        setOpenDisplayImageModal={setOpenDisplayImageModal}
      />
      <ProfileNavBtn />
    </View>
  </View>
);

export default HomeNavButtons;
