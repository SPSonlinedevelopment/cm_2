import { View, Text } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import FadeInView from "../../Effects/FadeInView";

const ShowReplyBar = ({ userId, replyState, setReplyState }) => {
  return (
    <FadeInView>
      <View className="w-full h-[70px] bg-neutral-200 flex flex-column justify-between shadow p-1 border-l-8  animate-spin border-purple-100">
        <View className="flex flex-row items-center ">
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[30px] w-[30px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
          <Text> to </Text>
          <Text className="text-base text-purple-100 font-bold ">
            {replyState.replyRecipientId === userId
              ? "You"
              : replyState.replyRecipientName}
          </Text>
        </View>

        <View className="flex  h-[40px] w-[100%] flex-row justify-between items-center">
          <Text
            className="w-[90%] border"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {replyState.replyMessage}
          </Text>

          <IconButton
            icon={<Entypo name="cross" size={30} color="black" />}
            containerStyles="h-[35px] w-[35px] bg-neutral-100 mr-4 mb-6 "
            handlePress={() => {
              setReplyState((prevState) => ({
                ...prevState,
                displayShowReplyBar: true,
              }));
            }}
          />
        </View>
      </View>
    </FadeInView>
  );
};

export default ShowReplyBar;
