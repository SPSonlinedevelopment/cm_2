import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import IconButton from "../../Buttons/IconButton";

const FullScreenImage = ({ url, onClose }) => {
  return (
    <Modal visible animationType="slide">
      <View className="relative">
        <IconButton
          containerStyles="h-[50px] w-[50px] bg-white absolute z-20 left-4 top-10 "
          handlePress={() => {
            onClose();
          }}
          icon={<Entypo name="cross" size={34} color="black" />}
        ></IconButton>
        <Image
          className="h-full w-full"
          source={{ uri: url }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const LoadedImage = React.memo(({ url, thisUsersMessage, caption }) => {
  console.log("🚀 ~ LoadedImage ~ thisUsersMessage:", thisUsersMessage);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  const openFullScreen = () => {
    setFullScreen(true);
  };

  const closeFullScreen = () => {
    setFullScreen(false);
  };

  return (
    <View className="border">
      {isFullScreen && <FullScreenImage url={url} onClose={closeFullScreen} />}
      <View className="h-full w-full rounded-xl relative flex items-center justify-center">
        <View
          className={`p-[1px] rounded-xl shadow flex flex-col absolute border ${
            thisUsersMessage ? "bg-orange-200 " : "bg-white"
          }`}
        >
          <TouchableOpacity
            // delayLongPress={100}
            // delayPressIn={100}
            onPress={() => openFullScreen()}
          >
            <Image
              cachePolicy={"memory-disk"}
              className={`h-[200px] w-[200px]  rounded-xl`}
              style={{
                aspectRatio: 1,
                resizeMode: "cover",
              }}
              source={{
                uri: url,
              }}
              contentFit="cover"
              transition={100}
              effect="flip-from-top"
            />
          </TouchableOpacity>
          {caption && (
            <View className=" m-2 w-full">
              <Text>{caption}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

export default LoadedImage;

{
  /* {!loadingImage && (
          <View className="h-full w-full rounded-xl absolute flex items-center justify-center">
            <View className="rounded-full h-full w-full items-center justify-center">
              <ActivityIndicator
                className="z-10 flex"
                size="large"
                color="purple"
              />
              <Image
                className="rounded-full h-full w-full absolute opacity-30"
                source={require("../../../../assets/images/CMlogo.png")}
              />
            </View>
          </View>
        )} */
}
