import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";

const MessageText = ({
  text,
  thisUsersMessage,
  time,
  handleSelectedMessage,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  console.log("🚀 ~ dimensions:", dimensions);

  const childRef = useRef(null);
  const messageRef = useRef(null);

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    setDimensions({ width, height });
  };

  const data = (
    <View
      className={`flex-row  mb-1 mt-1   w-full z-50  flex ${
        thisUsersMessage ? "justify-end" : "justify-start "
      } `}
    >
      <TouchableOpacity
        ref={messageRef}
        delayPressIn={600}
        onLongPress={() => {
          handleSelectedMessage(messageRef);
        }}
        onLayout={handleLayout}
        className={`flex w-[${dimensions.width}] h-[${
          dimensions.height
        }]  relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm   ${
          thisUsersMessage
            ? "bg-orange-200 self-end  mr-3  "
            : "bg-white self-start  ml-3"
        }   `}
      >
        <Text className="text-base">{text} </Text>

        {time && (
          <View className="flex items-end mt-1">
            <Text className="text-xs ">
              {/* {time.hours}:{time.minutes} {time.period} */}
              {time}
            </Text>
          </View>
        )}

        <View
          className={`h-3 w-2   absolute    ${
            thisUsersMessage
              ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
              : "bg-white  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
          }`}
        />
      </TouchableOpacity>
    </View>
  );

  return data;
};

export default MessageText;
