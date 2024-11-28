import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";
import index from "./index";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import UserDetails from "./user-details";
import ForgotPassword from "./forgot-password";
import Profile from "./profile";
import VerifyEmail from "./verify-email";
import Chats from "./chats";
import ChatRoom from "./chat-room";
import EditProfile from "./edit-profile";

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function AuthLayout() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <GestureHandlerRootView>
          {/* <NavigationContainer independent={false}> */}
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="index"
              component={index}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="sign-in"
              component={SignIn}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="sign-up"
              component={SignUp}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="user-details"
              component={UserDetails}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="forgot-password"
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile"
              component={Profile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="verify-email"
              component={VerifyEmail}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="chats"
              component={Chats}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="chat-room"
              component={ChatRoom}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="edit-profile"
              component={EditProfile}
            />
          </Stack.Navigator>
          {/* </NavigationContainer> */}
        </GestureHandlerRootView>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}
