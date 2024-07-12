import { createContext, useState, useEffect, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Try } from "expo-router/build/views/Try";
import { Link } from "expo-router";
import { router } from "expo-router";
import { editFirebaseMessage } from "@/app/components/Auth/firebaseAuthMessages/editFirebaseAuthMessage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // on auth state change

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    // when component unmounts clears hook
    return unsub;
  }, []);

  const createNewUser = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response);
      return { success: true };
    } catch (error) {
      console.log("error", error);

      const editedMessage = editFirebaseMessage(error.message);

      return { success: false, message: editedMessage };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("result", result);

      return { success: true };
    } catch (error) {
      console.log("sign in error", error);
      const editedMessage = editFirebaseMessage(error.message);
      return { success: false, message: editedMessage };
    }
  };

  const logOut = async () => {
    try {
      const result = await signOut(auth);

      console.log("result signout", result);

      setUser(null);

      router.push("sign-in");

      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        signIn,
        logOut,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "use Auth must be wrapped in a inside authenication Provider"
    );
  }
  return value;
};
