import React, { useEffect } from "react";

import { Stack, SplashScreen } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </GestureHandlerRootView>
  );
}
