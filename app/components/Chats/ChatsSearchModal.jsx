import { View, Text, Modal } from "react-native";
import React from "react";
import SearchChats from "./SearchChats";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

const ChatsSearchModal = ({ displaySearchModal }) => {
  return (
    <Modal visible={true} animationType="fade">
      <View className="h-full">
        <SafeAreaView className=" w-full flex-col  items-center justify-start mt-16">
          <View className=" shadow-md  flex flex-col justify-start items-start w-full ">
            <Text className="text-xl font-bold">Chats</Text>
          </View>
          <View className="w-full flex flex-row">
            <SearchChats
            //   setDisplaySearchModal={setDisplaySearchModal}
            //   completedChats={completedChats}
            />
        
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default ChatsSearchModal;
