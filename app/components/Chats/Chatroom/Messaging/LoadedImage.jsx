import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "@/app/components/Loading/LoadingSpinner";
import ExitButton from "@/app/components/Buttons/ExitButton";
import FadeInView from "@/app/components/Effects/FadeInView";

export const FullScreenImage = ({ url, onClose }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal visible animationType="slide">
      <View style={styles.container}>
        <ExitButton toggleDisplay={onClose} />
        {loading && (
          <ActivityIndicator
            // size="large"
            color="purple"
            style={styles.loadingSpinner}
          />
        )}

        <Image
          testID="full_screen_image"
          resizeMode="contain"
          source={{ url }}
          className="h-full w-full"
          onLoadStart={() => setLoading(true)} // Show spinner when loading starts
          onLoadEnd={() => setLoading(false)} // Hide spinner when loading ends
        />
      </View>
    </Modal>
  );
};

const LoadedImage = React.memo(
  ({ url, thisUsersMessage, caption, isPreview }) => {
    const [isFullScreen, setFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);

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
              thisUsersMessage ? "bg-orange-200  mr-2  " : "bg-purple  ml-2 "
            }  ${isPreview ? "bg-transparent m-0" : ""}`}
          >
            <TouchableOpacity
              testID="image_button"
              className="flex justify-center items-center"
              onPress={() => openFullScreen()}
            >
              {loading && (
                <ActivityIndicator
                  // size="large"
                  color="purple"
                  style={styles.loadingSpinner}
                />
              )}
              <FadeInView>
                <Image
                  testID="image_element"
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                  cachePolicy={"memory-disk"}
                  className={` h-[250px] w-[200px] rounded-xl 
               `}
                  style={{
                    aspectRatio: 1,
                    resizeMode: "cover",
                  }}
                  source={{
                    url,
                  }}
                  contentFit="cover"
                  transition={100}
                  effect="flip-from-top"
                />
              </FadeInView>
            </TouchableOpacity>

            {caption && (
              <View className=" p-1 w-full">
                <Text
                  className={`text-base ${
                    thisUsersMessage ? "" : "text-white"
                  } `}
                >
                  {" "}
                  {caption}
                </Text>
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
      testID="loading_image_placeholder"
      className="rounded-xl w-full  flex flex-row mb-1
      justify-end"
    >
      <View className=" h-[250px] w-[254px] rounded-xl shadow flex  p-[3px] flex-col justify-center items-center bg-orange-200  mr-2">
        <Loading size={150} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinner: {
    position: "absolute",
    zIndex: 1,
  },
});
