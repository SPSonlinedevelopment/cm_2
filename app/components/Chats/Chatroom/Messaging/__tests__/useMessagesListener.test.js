import { useMessagesListener } from "../MessageList/useMessagesListener";
import { render } from "@testing-library/react";
import React from "react";

import { View, Text } from "react-native";
import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

jest.mock("firebase/firestore", () => ({
  onSnapshot: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
}));

jest.mock("@/firebaseConfig", () => ({
  db: {
    collection: jest.fn(), // Mock the collection function
    doc: jest.fn(), // Mock the doc function
    // ... other functions you need to mock
  },
}));
let onSnapshotMock;
let docMock;
let collectionMock;
let queryMock;
let orderByMock;

const TestComponent = ({ roomId, initialMessages }) => {
  const { messages, loading, error } = useMessagesListener(
    roomId,
    initialMessages
  );

  return (
    <View>
      <Text testId="messages">{JSON.stringify(messages)}</Text>
      <Text testId="loading">{loading}</Text>
      <Text testId="error">{JSON.stringify(error)}</Text>
    </View>
  );
};

describe("useMessagesListener", () => {
  beforeEach(() => {
    // Reset mocks before each test
    onSnapshotMock = jest.fn();
    docMock = jest.fn();
    collectionMock = jest.fn();
    queryMock = jest.fn();
    orderByMock = jest.fn();

    require("firebase/firestore").onSnapshot.mockImplementation(onSnapshotMock);
    require("firebase/firestore").doc.mockImplementation(docMock);
    require("firebase/firestore").collection.mockImplementation(collectionMock);
    require("firebase/firestore").query.mockImplementation(queryMock);
    require("firebase/firestore").orderBy.mockImplementation(orderByMock);
  });

  it("test", () => {});

  //   it("should set an error if roomId is invalid", () => {
  //     const { result } = renderHook(() => useMessagesListener(null, []));
  //     expect(result.current.error).toBe("Invalid room ID");
  //     expect(result.current.loading).toBe(false);
  //   });
  //   it("should fetch messages from Firestore and update state", () => {
  //     const roomId = "testRoomId";
  //     const initialMessages = [{ message: "Initial message" }];
  //     const mockMessages = [
  //       { message: "Message 1", createdAt: new Date() },
  //       { message: "Message 2", createdAt: new Date() },
  //     ];
  //     // Mock Firestore data
  //     onSnapshot.mockImplementation((_, callback) => {
  //       callback({
  //         docs: mockMessages.map((message) => ({ data: () => message })),
  //       });
  //       return jest.fn(); // Mock unsubscribe function
  //     });
  //     const { result } = renderHook(() =>
  //       useMessagesListener(roomId, initialMessages)
  //     );
  //     // Assert initial state
  //     expect(result.current.messages).toEqual(initialMessages);
  //     expect(result.current.loading).toBe(true);
  //     expect(result.current.error).toBe(null);
  //     // Simulate Firestore update
  //     act(() => {
  //       onSnapshot.mock.calls[0][1]({
  //         docs: mockMessages.map((message) => ({ data: () => message })),
  //       });
  //     });
  //     // Assert updated state
  //     expect(result.current.messages).toEqual([
  //       ...initialMessages,
  //       ...mockMessages,
  //     ]);
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.error).toBe(null);
  //   });
  //   it("should handle errors from Firestore", () => {
  //     const roomId = "testRoomId";
  //     const initialMessages = [{ message: "Initial message" }];
  //     const mockError = new Error("Firestore error");
  //     // Mock Firestore error
  //     onSnapshot.mockImplementation((_, _, errorCallback) => {
  //       errorCallback(mockError);
  //       return jest.fn(); // Mock unsubscribe function
  //     });
  //     const { result } = renderHook(() =>
  //       useMessagesListener(roomId, initialMessages)
  //     );
  //     // Assert initial state
  //     expect(result.current.messages).toEqual(initialMessages);
  //     expect(result.current.loading).toBe(true);
  //     expect(result.current.error).toBe(null);
  //     // Simulate Firestore error
  //     act(() => {
  //       onSnapshot.mock.calls[0][2](mockError);
  //     });
  //     // Assert error state
  //     expect(result.current.messages).toEqual(initialMessages);
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.error).toBe(mockError);
  //   });
});
