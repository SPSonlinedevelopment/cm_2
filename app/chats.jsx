import React from "react";
import ChatPreview from "./components/Chats/ChatPreview";

const Chats = ({ setCompletedSessionWeb, setRoomIdWeb }) => {
  return (
    <ChatPreview
      setCompletedSessionWeb={setCompletedSessionWeb}
      setRoomIdWeb={setRoomIdWeb}
    />
  );
};

export default Chats;
