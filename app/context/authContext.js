import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  onSnapshot,
} from "firebase/firestore";
import { auth, db, menteesRef } from "../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import { storeObjectAsyncStorage, getObjectAsyncStorage } from "@/utils/common";

import { editFirebaseMessage } from "@/app/components/Auth/firebaseAuthMessages/editFirebaseAuthMessage";
import Statistics from "../components/Profile/MenteeProfile/MenteeStatistics";

import { selectRandomAvatar } from "../components/Profile/EditProfile/Avatar/Avatar";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const navigation = useNavigation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // on auth state change
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        setUser(authUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setInitialized(true);
    });

    // when component unmounts clears hook
    return unsub;
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (!user) {
      navigation.navigate("sign-in");
      return;
    }
    const mentorRef = collection(db, "mentors");
    const mentorQuery = query(mentorRef, where("uid", "==", user?.uid));

    getDocs(mentorQuery).then((mentorDoc) => {
      if (!mentorDoc.empty) {
        // Mentor found, set up listener for mentor data
        const unsubscribe = onSnapshot(mentorQuery, (querySnapshot) => {
          if (querySnapshot.empty) {
            setUserDetails(null);
            return;
          }
          const mentorDoc = querySnapshot.docs[0];
          setUserDetails(mentorDoc.data());
          storeObjectAsyncStorage("mode", mentorDoc?.data().mode);
        });

        return () => unsubscribe(); // Unsubscribe when component unmounts
      } else {
        // Mentor not found, check if the UID exists in the 'mentees' collection
        const menteeRef = collection(db, "mentees");
        const menteeQuery = query(menteeRef, where("uid", "==", user?.uid));

        getDocs(menteeQuery).then((menteeDoc) => {
          if (!menteeDoc.empty) {
            // Mentee found, set up listener for mentee data
            const unsubscribe = onSnapshot(menteeQuery, (querySnapshot) => {
              if (querySnapshot.empty) {
                setUserDetails(null);
                return;
              }
              const menteeDoc = querySnapshot.docs[0];
              console.log("🚀 ~ unsubscribe ~ menteeDoc:", menteeDoc);

              setUserDetails(menteeDoc.data());
              storeObjectAsyncStorage("mode", menteeDoc.data().mode);
            });

            return () => unsubscribe(); // Unsubscribe when component unmounts
          } else {
            // Neither mentor nor mentee found, set userData to null
            setUserDetails(null);
          }
        });
      }
    });
  }, [user, initialized]); // Only re-run the effect when the uid changes

  useEffect(() => {
    if (userDetails) {
      storeObjectAsyncStorage("mode", userDetails?.mode);
    }
  }, [userDetails]);

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
      return {
        success: true,
        data: response?.user,
      };
    } catch (error) {
      const editedMessage = editFirebaseMessage(error.message);
      return { success: false, message: editedMessage };
    }
  };

  const getData = async (mode) => {
    const docRef = doc(db, mode, user?.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setUserDetails(doc.data());
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
      linkedChatrooms: [],
      writtenFeedback: [],
      avatarName: selectRandomAvatar(),
    };

    try {
      if (mode === "mentee") {
        await setDoc(doc(db, "mentees", uid), {
          ...commonData,
          menteeStatistics: {
            time: 0,
            ninjaLevel: 0,
            XP: 0,
            complements: {
              "Algebra Whizz": 0,
              "High Achiever": 0,
              "Math Wizard": 0,
              "Math Genius": 0,
              "Fast Thinker": 0,
              "Beast Mode": 0,
              "Human Calculator": 0,
              "Number God": 0,
              "Physics Phenom": 0,
              "Chemistry Connoisseur": 0,
              "Biology Buff": 0,
              "Science Savant": 0,
              "Literature Luminary": 0,
              "History Hero": 0,
            },
          },
        }).then(getData("mentees"));
      } else if (mode === "mentor") {
        const mentorData = {
          ...commonData,
          subjectSelection,
          mentorStatistics: {
            time: 0,
            stars: [],
            complements: {
              Fast: 0,
              Friendly: 0,
              Clear: 0,
              Helpful: 0,
              Smart: 0,
              Kind: 0,
              SolvedProblems: 0,
              Supportive: 0,
            },
            questions: 0,
          },
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

      console.log("Success");
      setUser((prev) => result.user);
      if (result) {
        await getUserDataFromFirebase(result?.user.uid);
      }

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
        setUserDetails((prev) => userData);

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
        setUserDetails((prev) => userData);
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
      navigation.navigate("sign-in");

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
        setUserDetails,
        userDetails,
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
