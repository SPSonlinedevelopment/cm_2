import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "@/app/components/Loading/LoadingSpinner";
import ExitButton from "@/app/components/Buttons/ExitButton";

export const FullScreenImage = ({ url, onClose }) => {
  return (
    <Modal visible animationType="slide">
      <View className="relative">
        <ExitButton toggleDisplay={onClose} />

        <Image
          className="h-full w-full"
          source={{ uri: url }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const LoadedImage = React.memo(
  ({ url, thisUsersMessage, caption, isPreview }) => {
    const [isFullScreen, setFullScreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const openFullScreen = () => {
      setFullScreen(true);
    };

    const closeFullScreen = () => {
      setFullScreen(false);
    };

    return (
      <View className="flex w-full ">
        {isFullScreen && (
          <FullScreenImage url={url} onClose={closeFullScreen} />
        )}
        <View
          className={`rounded-xl w-full  flex flex-row mb-1 ${
            thisUsersMessage ? "  justify-end " : " justify-start  "
          }   ${isPreview ? "justify-center" : ""}`}
        >
          <View
            className={` w-[254px]  rounded-xl shadow flex  p-[3px] flex-col justify-center items-center  ${
              thisUsersMessage ? "bg-orange-200  mr-2  " : "bg-white  ml-2 "
            }  ${isPreview ? "bg-transparent m-0" : ""}`}
          >
            <TouchableOpacity
              className="relative"
              // delayLongPress={100}
              // delayPressIn={100}
              onPress={() => openFullScreen()}
            >
              {!isLoaded && <LoadingImagePlaceholder />}
              {/* <LoadingImagePlaceholder /> */}
              <Image
                onLoadStart={() => setIsLoaded(true)}
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
  }
);

export default LoadedImage;

const LoadingImagePlaceholder = () => {
  return (
    <View
      className="rounded-xl w-full  flex flex-row mb-1
      justify-end"
    >
      <View className=" h-[250px] w-[254px] rounded-xl shadow flex  p-[3px] flex-col justify-center items-center bg-orange-200  mr-2">
        <Loading size={150} />
      </View>
    </View>
  );
};
