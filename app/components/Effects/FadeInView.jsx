import { View, Text, Modal, Animated } from "react-native";
import { useEffect, useRef } from "react";

const FadeInView = ({ children, containerStyles }) => {
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
      className={` ${containerStyles}`}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
