import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const useChatRoomData = (roomId, completedSession) => {
  const [chatRoomData, setChatRoomData] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const docRef = doc(
      db,
      !completedSession ? "rooms" : "completed_sessions",
      roomId
    );

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setChatRoomData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [roomId, completedSession]);

  return chatRoomData;
};

export default useChatRoomData;
