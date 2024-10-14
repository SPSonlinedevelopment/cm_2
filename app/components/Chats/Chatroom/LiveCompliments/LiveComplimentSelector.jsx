import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import LiveComplimentsButton from "../../../Buttons/ToggleScrollSelectionButton";
import IconButton from "@/app/components/Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { mentorComplements } from "../../EndOfSession/ReviewForMentor/ComplementSelections";
import IconGeneral from "@/app/components/IconGeneral";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { handleSendTextMessageToChatroom } from "../../SendData/SendTexts/handleSendTextMessageToChatroom";

const LiveComplimentSelector = ({ roomId }) => {
  const { userDetails } = useAuth();
  const [displayComplementSelector, setDisplayComplementSelector] =
    useState(false);

  const [selectedLiveComplement, SetSelectedLiveComplement] = useState("");
  console.log(
    "🚀 ~ LiveComplimentSelector ~ selectedLiveCompliment:",
    selectedLiveComplement
  );

  const roomRef = doc(db, "rooms", roomId);

  const replyMessage = null;

  let type = "complement";
  const text = selectedLiveComplement;
  const updateLiveComplements = async () => {
    const result = handleSendTextMessageToChatroom(
      roomId,
      text,
      userDetails,
      type,
      replyMessage
    );

    console.log("result", result);

    try {
      const docSnap = await getDoc(roomRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("🚀 ~ updateLiveCompliments ~ data:", data);
      } else {
        console.log("DOesnyt exist");
      }
    } catch (error) {
      console.log(error);
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
          <View className="bg-transparent">
            <ScrollView
              showsHorizontalScrollIndicator={false}
              className="bg-transparent"
              horizontal
            >
              {mentorComplements.map((complement) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      SetSelectedLiveComplement(complement.title);
                      updateLiveComplements();
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

export default LiveComplimentSelector;
