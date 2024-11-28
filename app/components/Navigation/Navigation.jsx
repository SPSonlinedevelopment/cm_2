import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import IconButton from "../Buttons/IconButton";

const { width } = Dimensions.get("window");

const Navigation = ({ menuVisible, setMenuVisible }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current; // Start off-screen

  const toggleMenu = () => {
    if (menuVisible) {
      // Hide menu
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      // Show menu
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // <View className="flex-1 bg-gray-100">
  // {/* Header */}
  // <View className="h-16 bg-purple-700 flex-row items-center px-4">
  //   <TouchableOpacity onPress={toggleMenu}>
  //     <Text className="text-white text-3xl">☰</Text>
  //   </TouchableOpacity>
  //   <Text className="text-white text-lg ml-4 font-bold">
  //     Custom Slide Menu
  //   </Text>
  // </View>

  return (
    <>
      {menuVisible && (
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
          }}
          className="absolute w-full h-full bg-black opacity-40 z-200"
        />
      )}
    </>
  );
};

export default Navigation;

const ModalCom = ({ menuVisible }) => {
  return (
    <Modal
      testID="message_general_modal"
      transparent
      className="flex items-center w-full bg-opacity-50 justify-center"
      visible={menuVisible}
      animationType="fade"
    >
      <View className="  h-full w-full absolute bg-black-100 opacity-40 z-20" />
      <View className="h-full w-full"> </View>
    </Modal>
  );
};

//   {/* Overlay and Slide-In Menu */}
//   {menuVisible && (
//     <>
//       {/* Slide-In Menu */}
//       {/* <Animated.View
//       style={{
//         transform: [{ translateX: slideAnim }],
//       }}
//       className="absolute top-0 left-0 bottom-0 w-3/4 bg-white shadow-lg"
//     >
//       <View className="flex-1  border bg-white">
//         <Text className="text-2xl font-bold ">Menu</Text>

//         <IconButton
//           title="cancel"
//           handlePress={toggleMenu}
//           containerStyles="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
//         />
//         <Text className="text-lg">Option 1</Text>
//         <Text className="text-lg">Option 2</Text>
//       </View>
//     </Animated.View> */}
//     </>
//   )}
// </View>
