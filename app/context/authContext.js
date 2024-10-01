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

import { editFirebaseMessage } from "@/app/components/Auth/firebaseAuthMessages/editFirebaseAuthMessage";
import Statistics from "../components/Profile/MenteeProfile/MenteeStatistics";

import { selectRandomAvatar } from "../components/Profile/Avatar";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
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

  useEffect(() => {
    if (!user) {
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

              setUserDetails(menteeDoc.data());
            });

            return () => unsubscribe(); // Unsubscribe when component unmounts
          } else {
            // Neither mentor nor mentee found, set userData to null
            setUserDetails(null);
          }
        });
      }
    });
  }, [user?.uid]); // Only re-run the effect when the uid changes

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

      // setUser((prev) => response);

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
    const docRef = doc(db, mode, user?.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
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
            compliments: 0,
          },
        }).then(getData("mentees"));
      } else if (mode === "mentor") {
        const mentorData = {
          ...commonData,
          subjectSelection,
          mentorStatistics: {
            time: 0,
            stars: [],
            compliments: {
              fast: 0,
              friendly: 0,
              clear: 0,
              helpful: 0,
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
