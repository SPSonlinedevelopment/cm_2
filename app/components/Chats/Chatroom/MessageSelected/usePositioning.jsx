import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

export const usePositioning = (selectedMessage) => {
  const [position, setPosition] = useState({ x: null, y: null });
  const [isReady, setIsReady] = useState(false);
  const [isOffViewport, setIsOffViewport] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  let newPosition;
  if (selectedMessage) {
    newPosition = {
      x: selectedMessage?.x || null,
      y: selectedMessage?.y || null,
    };
  }

  const offBottom =
    newPosition.y + selectedMessage?.height > screenHeight - 160;
  const offTop = newPosition.y < 0;

  useLayoutEffect(() => {
    // Set initial position

    if (!selectedMessage) return;

    setPosition(newPosition);
    setIsOffViewport(offBottom || offTop);

    if (newPosition.x && newPosition.y) {
      setTimeout(() => {
        setIsReady(true);
      }, 0);
    }

    return () => {
      setPosition({ x: null, y: null });
      setIsOffViewport(false);
      setIsReady(false);
    };
  }, [selectedMessage, screenHeight, screenWidth]);

  useEffect(() => {
    // Center element horizontally if off-viewport
    if (isOffViewport) {
      const newX = screenWidth / 2 - 25;
      setPosition((prev) => ({ y: screenHeight / 2, x: newX }));
    }

    return () => {
      setPosition({ x: null, y: null });
      setIsOffViewport(false);
      setIsReady(false);
    };
  }, [isOffViewport, screenWidth]);

  return { position, isReady };
};
