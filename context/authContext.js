import { createContext, useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Try } from "expo-router/build/views/Try";
import { Link } from "expo-router";

export const AuthContext = createContext();

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "use Auth must be wrapped in a inside authenication Provider"
    );
  }
  return value;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createNewUser = async (username, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("response", response);

      return { success: true };
    } catch (error) {
      console.log("error", error);
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)"))
        msg = <Text>This email is invalid please check its correct!</Text>;
      if (msg.includes("(auth/email-already-in-use)"))
        msg = (
          <Text>
            There is already an account associated with that email. Please try
            again. If you already have an account please{" "}
            <Link className="text-orange" href={"sign-in"}>
              {" "}
              sign in{" "}
            </Link>
          </Text>
        );

      return { success: false, alertComponent: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
