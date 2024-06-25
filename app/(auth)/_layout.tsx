import React, { useEffect } from "react";

import { Stack, SplashScreen } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <Stack >
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </GestureHandlerRootView>
  );
}
