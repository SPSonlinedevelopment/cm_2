import { View, Text, Modal, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import IconButton from "../../Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

const ShowReplyBar = ({
  setDisplayShowReplyBar,
  replyMessage,
  displayShowReplyBar,
  replyRecipientName,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <FadeInView>
      <View className="w-full h-[70px] bg-neutral-200 flex flex-column justify-between shadow p-1 border-l-8  animate-spin border-purple-100">
        <View className="flex flex-row items-center ">
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[30px] w-[30px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
          <Text> to </Text>
          <Text className="text-base text-purple-100 font-bold ">
            {replyRecipientName}
          </Text>
        </View>

        <View className="flex  h-[40px] w-[100%] flex-row justify-between items-center">
          <Text
            className="w-[90%] border"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {replyMessage}
          </Text>

          <IconButton
            icon={<Entypo name="cross" size={30} color="black" />}
            containerStyles="h-[35px] w-[35px] bg-neutral-100 mr-4 mb-6 "
            handlePress={() => {
              setDisplayShowReplyBar(false);
            }}
          />
        </View>
      </View>
    </FadeInView>
  );
};

export default ShowReplyBar;
