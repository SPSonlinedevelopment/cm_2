// import { View, Text, Dimensions, TouchableOpacity } from "react-native";
// import React, { useEffect, useLayoutEffect, useState } from "react";

// export const usePositioning = (selectedMessage) => {
//   const [position, setPosition] = useState({ x: null, y: null });

//   const [isReady, setIsReady] = useState(false);
//   const [isOffViewport, setIsOffViewport] = useState(false);

//   const screenHeight = Dimensions.get("window").height;
//   const screenWidth = Dimensions.get("window").width;

//   let newPosition;
//   if (selectedMessage) {
//     newPosition = {
//       x: selectedMessage?.x || null,
//       y: selectedMessage?.y || null,

//       // x: 200,
//       // y: 200,
//     };
//   }

//   const offBottom =
//     newPosition.y + selectedMessage?.height > screenHeight - 140;
//   console.log("🚀 ~ usePositioning ~ offBottom:", offBottom);

//   const offTop = newPosition.y < 100;
//   console.log("🚀 ~ usePositioning ~ offTop:", offTop);

//   // useLayoutEffect(() => {
//   //   // Set initial position

//   //   if (!selectedMessage) return;

//   //   setIsOffViewport(false);

//   //   if (offBottom || offTop) {
//   //     setIsOffViewport(true);
//   //   } else {
//   //     setPosition(newPosition);
//   //   }

//   //   if (newPosition.x && newPosition.y) {
//   //     setIsReady(true);
//   //   }

//   //   return () => {
//   //     setPosition({ x: null, y: null });
//   //     setIsOffViewport(false);
//   //     setIsReady(false);
//   //   };
//   // }, [selectedMessage, screenHeight, screenWidth]);

//   useLayoutEffect(() => {
//     if (!selectedMessage) return;

//     setIsOffViewport(false);

//     if (offBottom || offTop) {
//       setIsOffViewport(true);
//     } else {
//       setPosition(newPosition);
//     }

//     if (newPosition.x && newPosition.y) {
//       setIsReady(true);
//     }
//   }, [selectedMessage, offBottom, offTop]);

//   // useEffect(() => {
//   //   // Center element horizontally if off-viewport

//   //   if (isOffViewport) {
//   //     const newX = screenWidth / 2 - 25;

//   //     const newPosition = {
//   //       x: newX,
//   //       y: screenHeight / 2,
//   //     };
//   //     setPosition(newPosition);
//   //   }

//   //   return () => {
//   //     setPosition({ x: null, y: null });
//   //     setIsOffViewport(false);
//   //     setIsReady(false);
//   //   };
//   // }, [isOffViewport]);

//   useEffect(() => {
//     if (isOffViewport) {
//       const newX = screenWidth / 2 - selectedMessage.width / 2;
//       const newY = screenHeight / 2 - selectedMessage.height / 2;

//       setPosition({ x: newX, y: newY });
//     }
//   }, [isOffViewport]);

//   console.log("Selected message:", selectedMessage);
//   console.log("New Position:", newPosition);
//   console.log("Position:", position);
//   console.log("Is Off Viewport:", isOffViewport);
//   return { isOffViewport, position, isReady, setIsReady };
// };

import { useLayoutEffect, useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const usePositioning = (selectedMessage) => {
  const [position, setPosition] = useState({ x: null, y: null });
  const [isReady, setIsReady] = useState(false);
  const [isOffViewport, setIsOffViewport] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const newPosition = {
    x: selectedMessage?.x || 0,
    y: selectedMessage?.y || 0,
  };

  const offBottom =
    newPosition.y + (selectedMessage?.height || 0) > screenHeight - 180;
  const offTop = newPosition.y < 100;

  useLayoutEffect(() => {
    if (!selectedMessage) return;

    requestAnimationFrame(() => {
      setIsOffViewport(false);

      if (offBottom || offTop) {
        setIsOffViewport(true);
      } else {
        setPosition(newPosition);
      }

      if (newPosition.x && newPosition.y) {
        setIsReady(true);
      }
    });
  }, [selectedMessage, offBottom, offTop]);

  useEffect(() => {
    if (isOffViewport) {
      const newX = screenWidth / 2 - (selectedMessage?.width || 0) / 2;
      const newY = screenHeight / 2 - (selectedMessage?.height || 0) / 2;

      setPosition({ x: newX, y: newY });
    }
  }, [isOffViewport]);

  return { isOffViewport, position, isReady, setIsReady };
};
