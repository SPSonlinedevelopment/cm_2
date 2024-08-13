import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../Profile/Avatar";
import { router } from "expo-router";

const ChatItem = ({ item, index, noBorder, newQuestion }) => {
  const openChatRoom = () => {
    router.push({ pathname: "/chat-room", params: item });

    // const item = useLocalSearchParams(); // secnd user
  };

  console.log("item", item);

  return (
    <TouchableOpacity
      delayLongPress={100}
      delayPressIn={100}
      onPress={openChatRoom}
      className={`flex-row h-[90px]  flex  justify-between items-center   py-1   `}
    >
      <View
        className={`flex-row items-center justify-between  h-full w-full rounded-lg px-2 py-2
      ${newQuestion ? "bg-purple-300" : ""}
      
      `}
      >
        {/* <Avatar avatarName={item.avatarName} /> */}

        <View
          className={`h-full w-[280px] flex flex-col justify-between  
          }
        `}
        >
          <View className="flex-row justify-between ">
            {newQuestion ? (
              <>
                <Text
                  style={{ fontSize: 15 }}
                  className={`font-semibold text-neutral-500  ${
                    newQuestion
                      ? "font-extrabold text-black-100"
                      : "font-semibold"
                  }`}
                >
                  {item?.menteeName}
                </Text>
              </>
            ) : (
              <Text
                style={{ fontSize: 15 }}
                className="font-semibold text-neutral-500"
              >
                {/* {item?.chatName} */}
              </Text>
            )}

            <Text className="text-xs text-neutral-500">{item?.date}</Text>
          </View>

          {newQuestion ? (
            <Text
              className={`text-neutral-500 text-xs ${
                newQuestion ? "font-extrabold text-black-100" : "font-semibold"
              } `}
            >
              {item?.questionSubject}
            </Text>
          ) : (
            <Text className="text-neutral-500 text-xs ">
              {/* {item?.parterName} */}
            </Text>
          )}

          {newQuestion ? (
            <Text className="text-neutral-500 text-xs ">{item?.message}</Text>
          ) : (
            <Text className="text-neutral-500 text-xs ">{item?.duration}</Text>
          )}

          <Text> {JSON.stringify(item)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
