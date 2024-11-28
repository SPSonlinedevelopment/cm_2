import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import LiveComplimentsButton from "../../../Buttons/ToggleScrollSelectionButton";
import { mentorComplements } from "../../EndOfSession/ReviewForMentor/ComplementSelections";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/app/context/authContext";
// import { handleSendTextMessageToChatroom } from "../../../../../services/sendTexts/handleSendTextMessageToChatroom";

import { handleSendTextMessageToChatroom } from "@/services/sendTexts/handleSendTextMessageToChatroom";

import { handleUpdateMenteeWithComplement } from "../../../../../services/handleUpdateMenteeWithComplement";
import { useChatRoom } from "@/app/context/chatRoomContext";

const LiveComplementSelector = () => {
  const { userDetails } = useAuth();
  const { chatRoomData } = useChatRoom();

  const [displayComplementSelector, setDisplayComplementSelector] =
    useState(false);

  const [selectedLiveComplement, SetSelectedLiveComplement] = useState("");

  const replyMessage = null;
  let type = "complement";

  const handleSelect = async (complement) => {
    SetSelectedLiveComplement(complement);

    const text = complement;
    setDisplayComplementSelector(false);
    try {
      await handleSendTextMessageToChatroom(
        chatRoomData.roomId,
        text,
        userDetails,
        type,
        replyMessage
      );
      await handleUpdateMenteeWithComplement(chatRoomData.menteeId, complement);
    } catch (error) {
      console.log("hdjsh", error);
    }
  };

  return (
    userDetails.mode === "mentor" && (
      <>
        <LiveComplimentsButton
          icon={<FontAwesome name="heart-o" size={24} color="black" />}
          display={displayComplementSelector}
          setDisplay={setDisplayComplementSelector}
          position="left"
        />
        {displayComplementSelector && (
          <View testID="complement_selector" className="bg-transparent">
            <ScrollView
              showsHorizontalScrollIndicator={false}
              className="bg-transparent"
              horizontal
            >
              {mentorComplements.map((complement) => {
                return (
                  <TouchableOpacity
                    key={complement.title}
                    onPress={() => {
                      handleSelect(complement.title);
                    }}
                    className={`w-20 px-1 m-1 flex flex-col rounded-xl items-center justify-center ${
                      selectedLiveComplement === complement?.title
                        ? "bg-purple"
                        : ""
                    }  `}
                  >
                    <Image
                      style={{ pointerEvents: "none" }}
                      className="h-10"
                      resizeMode="contain"
                      source={complement?.icon}
                    ></Image>
                    <Text
                      className={`text-xs text-center w-18 text-purple-100 ${
                        selectedLiveComplement === complement?.title
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {complement.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </>
    )
  );
};

export default LiveComplementSelector;
