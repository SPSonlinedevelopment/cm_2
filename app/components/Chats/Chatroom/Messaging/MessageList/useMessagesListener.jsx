import { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const useMessagesListener = (roomId, initialMessages, connected) => {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setError("Invalid room ID");
      setLoading(false);
      return;
    }

    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => doc.data());
        setMessages((prev) => [...initialMessages, ...allMessages]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId, connected]);

  return { messages, loading, error };
};
