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

      setUser((prev) => response);

      // return { success: true, data: response };

      return { success: true, data: response?.user };
    } catch (error) {
      console.log("error", error);

      const editedMessage = editFirebaseMessage(error.message);

      return { success: false, message: editedMessage };
    }
  };

  const addUserDetailsOnSignup = async (userDetails) => {
    const { firstName, lastName, mode, dob, partnership, subjectSelection } =
      userDetails;

    const { uid, email } = user;

    const commonData = {
      firstName,
      lastName,
      mode,
      dob,
      partnership,
      uid,
      email,
    };

    const getData = async (mode) => {
      const docRef = doc(db, mode, uid);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            console.log("Document data:", doc.data());
            setUser(doc.data());
          } else {
            console.log("Document data not exists:");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    };

    try {
      if (mode === "mentee") {
        await setDoc(doc(db, "mentees", uid), commonData).then(
          getData("mentees")
        );
      } else if (mode === "mentor") {
        const mentorData = {
          ...commonData,
          subjectSelection,
        };
        await setDoc(doc(db, "mentors", uid), mentorData).then(
          getData("mentors")
        );
      }

      return { success: true };
    } catch (error) {
      console.log("error", error);
      return { success: false };
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

  const getUserDataFromFirebase = async () => {};

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
        addUserDetailsOnSignup,
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
