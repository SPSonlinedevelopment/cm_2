import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import MessagesList from "../MessageList/MessagesList";
import { useChatRoom } from "../../../../../context/chatRoomContext";
import { useAuth } from "../../../../../context/authContext";
import * as Haptics from "expo-haptics";
import {
  storeObjectAsyncStorage,
  generateRandomId,
  convertFirebaseTimestampToDate,
} from "../../../../../../utils/common";
import { useMentorData } from "../ConnectedMessage";
import { useMessagesListener } from "../MessageList/useMessagesListener";
import { Timestamp } from "firebase/firestore";
import { Text } from "react-native";

// Mock dependencies
jest.mock("../../../../../context/chatRoomContext", () => ({
  useChatRoom: jest.fn(),
}));
jest.mock("../../../../../context/authContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../MessageList/useMessagesListener", () => ({
  useMessagesListener: jest.fn(),
}));
jest.mock("../ConnectedMessage", () => ({
  useMentorData: jest.fn(),
}));

jest.mock("expo-haptics");

jest.mock("../../../../../../utils/common", () => ({
  storeObjectAsyncStorage: jest.fn(),
  generateRandomId: jest.fn(),
  convertFirebaseTimestampToDate: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  Timestamp: {
    fromDate: jest.fn((date) => ({
      seconds: date.getTime() / 1000,
      nanoseconds: 0,
    })),
  },
}));

describe("MessagesList Component", () => {
  let scrollViewRef,
    scrollToEnd,
    setReplyState,
    setSelectedMessage,
    setDisplayMessageSelectedModal;

  beforeEach(() => {
    scrollViewRef = React.createRef();
    scrollToEnd = jest.fn();
    setReplyState = jest.fn();
    setSelectedMessage = jest.fn();
    setDisplayMessageSelectedModal = jest.fn();

    useChatRoom.mockReturnValue({
      chatRoomData: {
        roomId: "testRoom",
        connectedMentor: true,
        sessionCompleted: true,
        menteeName: "Mentee",
        mentorName: "Mentor",
      },
    });
    useAuth.mockReturnValue({
      userDetails: { uid: "testUser", mode: "mentee" },
      getMentorDoc: jest.fn(),
    });

    useMentorData.mockReturnValue({
      mentorData: "mentorData",
      loading: false,
      error: null,
    });

    const mockMessages = [
      {
        text: "Hello",
        messageId: "Mock-Id",
        senderName: "mock sender",
      },
      {
        text: "World",
        messageId: "Mock-Id",
        senderName: "mock sender",
      },
    ];

    useMessagesListener.mockReturnValue({
      messages: mockMessages,
      loading: false,
      error: null,
    });

    Haptics.impactAsync.mockResolvedValue();
  });

  it("displays LoadingImagePlaceholder when isSendingImage is true", () => {
    const { getByTestId } = render(
      <MessagesList
        scrollViewRef={scrollViewRef}
        scrollToEnd={scrollToEnd}
        replyState={null}
        setReplyState={setReplyState}
        setSelectedMessage={setSelectedMessage}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
        isSendingImage={true}
      />
    );

    expect(getByTestId("loading-image-placeholder")).toBeTruthy();
  });

  test("renders loading indicator when loading is true", () => {
    useMessagesListener.mockReturnValue({
      messages: [],
      loading: true,
      error: null,
    });

    const { getByTestId } = render(
      <MessagesList
        scrollViewRef={scrollViewRef}
        scrollToEnd={scrollToEnd}
        replyState={null}
        setReplyState={setReplyState}
        setSelectedMessage={setSelectedMessage}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
        isSendingImage={false}
      />
    );
    expect(getByTestId("loading-messages-placeholder")).toBeTruthy();
  });

  test("renders error message when error occurs", () => {
    useMessagesListener.mockReturnValue({
      messages: [],
      loading: false,
      error: true,
    });

    const { getByText } = render(
      <MessagesList
        scrollViewRef={scrollViewRef}
        scrollToEnd={scrollToEnd}
        replyState={null}
        setReplyState={setReplyState}
        setSelectedMessage={setSelectedMessage}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
        isSendingImage={false}
      />
    );
    expect(
      getByText("Sorry: unable to find message at this time!")
    ).toBeTruthy();
  });

  test("renders messages correctly", () => {
    const { getByText } = render(
      <MessagesList
        scrollViewRef={scrollViewRef}
        scrollToEnd={scrollToEnd}
        replyState={null}
        setReplyState={setReplyState}
        setSelectedMessage={setSelectedMessage}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
        isSendingImage={false}
      />
    );
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("World")).toBeTruthy();
  });

  test("renders SessionSummary and celbration animatiob when session is completed", () => {
    const mockChatRoomData = {
      roomId: "room-id",
      connectedMentor: true,
      mentorName: "Mock Mentor",
      menteeName: "Mock Mentee",
      initialMessage: "Initial Message",
      mentorAvatar: "mentor-avatar-url",
      menteeAvatar: "mentee-avatar-url",
      sessionCompleted: false,
    };

    const mockMessages = [
      {
        text: "Test Message 1",
        messageId: "1",
        senderName: "Test Sender 1",
      },
      {
        text: "Test Message 2",
        messageId: "2",
        senderName: "Test Sender 2",
      },
    ];

    useChatRoom.mockReturnValue({
      chatRoomData: { ...mockChatRoomData, sessionCompleted: true },
    });

    useMessagesListener.mockReturnValue({
      messages: mockMessages,
      loading: false,
      error: null,
    });

    const { getByTestId } = render(
      <MessagesList
        scrollViewRef={scrollViewRef}
        scrollToEnd={scrollToEnd}
        replyState={null}
        setReplyState={setReplyState}
        setSelectedMessage={setSelectedMessage}
        setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
        isSendingImage={false}
      />
    );
    expect(getByTestId("session_summary")).toBeTruthy();
  });
});
