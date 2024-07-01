import React, { useEffect } from "react";

import { Stack, SplashScreen } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "../../context/authContext";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <AuthContextProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="profile"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
}
