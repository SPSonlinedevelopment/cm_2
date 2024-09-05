import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import IconButton from "../../Buttons/IconButton";
import CMlogo from "../../../../assets/images/CMlogo.png";
import Loading from "../../Loading/LoadingSpinner";

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
  const [isFullScreen, setFullScreen] = useState(false);

  const openFullScreen = () => {
    setFullScreen(true);
  };

  const closeFullScreen = () => {
    setFullScreen(false);
  };

  return (
    <View className="flex w-full ">
      {isFullScreen && <FullScreenImage url={url} onClose={closeFullScreen} />}
      <View
        className={`rounded-xl w-full  flex flex-row mb-1 ${
          thisUsersMessage ? "  justify-end " : " justify-start  "
        }`}
      >
        <View
          className={` w-[254px]  rounded-xl shadow flex  p-[3px] flex-col justify-center items-center  ${
            thisUsersMessage ? "bg-orange-200  mr-2  " : "bg-white  ml-2 "
          }`}
        >
          <TouchableOpacity
            // delayLongPress={100}
            // delayPressIn={100}
            onPress={() => openFullScreen()}
          >
            <Image
              cachePolicy={"memory-disk"}
              className={` h-[250px] w-[200px] rounded-xl 
               `}
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
            <View className=" p-1 w-full">
              <Text className="text-base"> {caption}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

export default LoadedImage;
