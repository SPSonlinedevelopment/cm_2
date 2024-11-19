import React from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { StyleSheet } from "react-native";
import ConversationSuggestions from "../ConversationSuggestions";
import {
  mentorConvoSuggestions,
  menteeConvoSuggestions,
} from "../convoSuggestions";

import { useChatRoom } from "@/app/context/chatRoomContext";
import { useAuth } from "@/app/context/authContext";
import { handleSendSuggestedMessageToChatroom } from "../../../SendData/SendTexts/handleSendTextMessageToChatroom";

jest.mock("@/app/context/chatRoomContext", () => ({
  useChatRoom: jest.fn(() => {}),
}));
jest.mock("@/app/context/authContext", () => ({
  useAuth: jest.fn(() => {}),
}));

jest.mock(
  "../../../SendData/SendTexts/handleSendTextMessageToChatroom",
  () => ({
    handleSendSuggestedMessageToChatroom: jest.fn(() => {}),
  })
);

describe("ConversationSuggestions Component", () => {
  beforeEach(() => {
    useChatRoom.mockReturnValue({ chatRoomData: { id: "testRoom" } });
    useAuth.mockReturnValue({ userDetails: { mode: "mentor" } });
    handleSendSuggestedMessageToChatroom.mockResolvedValue();
  });

  it("renders toggle button initially and no suggestions", async () => {
    useAuth.mockReturnValueOnce({ userDetails: { mode: "mentor" } });
    render(<ConversationSuggestions />);
    // Check toggle button renders

    expect(screen.getByTestId("icon_button")).toBeTruthy();

    // Verify suggestions list is not shown initially
    expect(screen.queryByTestId("suggestions-list")).toBeNull();

    fireEvent.press(screen.getByTestId("icon_button"));
    expect(screen.queryByTestId("suggestions-list")).toBeTruthy();

    // Verify mentorConvoSuggestions are rendered since user is in mentor mode

    mentorConvoSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion.text)).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId("icon_button"));
    expect(screen.queryByTestId("suggestions-list")).toBeNull();
  });

  it("renders mentor or mentee suggestions based on user mode", async () => {
    // Set up as mentor
    useAuth.mockReturnValueOnce({ userDetails: { mode: "mentor" } });
    const { rerender } = render(<ConversationSuggestions />);

    // Display suggestions
    fireEvent.press(screen.getByTestId("icon_button"));

    expect(screen.getByTestId("suggestions-list")).toBeTruthy();

    // Verify mentor suggestions are rendered
    mentorConvoSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion.text)).toBeTruthy();
    });

    // Re-render with mentee mode
    useAuth.mockReturnValueOnce({ userDetails: { mode: "mentee" } });
    rerender(<ConversationSuggestions />);

    // Verify mentee suggestions are rendered
    menteeConvoSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion.text)).toBeTruthy();
    });
  });

  it("calls handleSendSuggestedMessageToChatroom and hides suggestions on suggestion click", async () => {
    render(<ConversationSuggestions />);

    // Show suggestions
    await act(async () => {
      fireEvent.press(screen.getByTestId("icon_button"));
    });

    const firstSuggestion = await screen.findByText(
      mentorConvoSuggestions[0].text
    );

    // Click the first suggestion
    await act(async () => {
      fireEvent.press(firstSuggestion);
    });

    // Expect handleSendSuggestedMessageToChatroom to be called
    expect(handleSendSuggestedMessageToChatroom).toHaveBeenCalledWith(
      { id: "testRoom" },
      { mentorConvoSuggestions[0].text },
      { mode: "mentor" }
    );

    // Verify suggestions list is hidden
    expect(screen.queryByTestId("suggestions-list")).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
