import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import ChatRoom from "../chat-room";
import { useAuth } from "../context/authContext";
import { getChatRoomData } from "../context/chatRoomContext";
import { useRoute } from "@react-navigation/native";
import { pickImage } from "../../utils/imagePicker";

jest.mock("@react-navigation/native", () => ({
  useRoute: jest.fn(),
}));

jest.mock("../context/authContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../context/chatRoomContext", () => ({
  useChatRoom: jest.fn(),
  getChatRoomData: jest.fn(),
}));

jest.mock("../../utils/imagePicker", () => ({
  pickImage: jest.fn(),
}));

jest.spyOn(console, "log").mockImplementation(() => {});

describe("chat room functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      userDetails: { mode: "mentor" },
    });

    useRoute.mockReturnValue({
      params: { roomId: "123", completedSession: false },
    });

    getChatRoomData.mockReturnValue({
      sessionCompleted: false,
      reviewForMenteeCompleted: false,
    });

    pickImage.mockResolvedValue({ uri: "mocked-uri" });
  });

  it("test", () => {});

  //   it("renders all key components", () => {
  //     useAuth.mockReturnValue({ userDetails: { mode: "mentor" } });
  //     useRoute.mockReturnValue({
  //       params: { roomId: "123", completedSession: false },
  //     });
  //     getChatRoomData.mockReturnValue({ sessionCompleted: false });
  //     const { getByText, getByTestId } = render(<ChatRoom />);
  //     // Check for header
  //     expect(getByTestId("chatroom-header")).toBeTruthy();
  //     // Check for input
  //     expect(getByTestId("message-input")).toBeTruthy();
  //     // Check for emoji selector and others
  //     expect(getByTestId("emoji-selector")).toBeTruthy();
  //     expect(getByTestId("live-complement-selector")).toBeTruthy();
  //     expect(getByTestId("is-typing-indicator")).toBeTruthy();
  //   });
});
