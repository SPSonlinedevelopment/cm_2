import React, { useEffect } from "react";

import { Stack, SplashScreen } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "../context/authContext";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  return (
    <AuthContextProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="sign-up"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="forgot-password"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
}
