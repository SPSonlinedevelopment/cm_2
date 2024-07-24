import { createContext, useState, useEffect, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  collection,
  where,
} from "firebase/firestore";
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
      console.log("authState changed");
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

  const getUpdatedAuthObj = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return user;
  };


  const verifyEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the currently signed-in user

    try {
      sendEmailVerification(user);

      return { success: true };
    } catch (error) {
      console.error("Error sending email verification:", error);
      return { success: false };
    }
  };

  const createNewUser = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser((prev) => response);

      return {
        success: true,
        data: response?.user,
      };
    } catch (error) {
      console.log("error", error);

      const editedMessage = editFirebaseMessage(error.message);

      return { success: false, message: editedMessage };
    }
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

  const addUserDetailsOnSignup = async (userDetails) => {
    const {
      firstName,
      lastName,
      mode,
      dob,
      partnership,
      year,
      subjectSelection,
    } = userDetails;

    const { uid, email } = user;

    const commonData = {
      firstName,
      lastName,
      mode,
      dob,
      partnership,
      uid,
      email,
      year,
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
      console.log("signing in ...");
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("result", result);
      console.log("signed in ...");

      return { success: true };
    } catch (error) {
      console.log("sign in error", error);
      const editedMessage = editFirebaseMessage(error.message);
      return { success: false, message: editedMessage };
    }
  };

  const getUserDataFromFirebase = async (uid) => {
    try {
      // Combine queries into a single condition
      const userQuery = query(
        collection(db, "mentors"),
        where("uid", "==", uid)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();

        console.log("mentorData", userData);
        return { success: true, data: userData }; // Return the data
      }

      // Check mentees collection if not found in mentors
      const menteeQuery = query(
        collection(db, "mentees"),
        where("uid", "==", uid)
      );
      const menteeSnapshot = await getDocs(menteeQuery);

      if (!menteeSnapshot.empty) {
        const userData = menteeSnapshot.docs[0].data();

        console.log("menteeData", userData);
        return { success: true, data: userData };
      } else {
        console.log("no DATA");
        return { success: false };
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const logOut = async () => {
    try {
      const result = await signOut(auth);

      console.log("result signout", result);

      setUser(null);

      // router.push("sign-in");

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
        getUserDataFromFirebase,
        verifyEmail,
        getUpdatedAuthObj,
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
