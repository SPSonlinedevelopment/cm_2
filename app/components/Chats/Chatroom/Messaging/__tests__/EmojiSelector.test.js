import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SelectEmoji from "../EmojiSelector"; // Adjust the path as necessary

describe("SelectEmoji Component", () => {
  const mockSetText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing if displayEmojiSelector is false", () => {
    render(<SelectEmoji displayEmojiSelector={false} setText={mockSetText} />);
    expect(screen.queryByText("😀")).toBeNull();
  });

  it("renders emoji selector when displayEmojiSelector is true", () => {
    render(<SelectEmoji displayEmojiSelector={true} setText={mockSetText} />);

    // Check if the first emoji in topEmojis is rendered
    expect(screen.getByText("😀")).toBeTruthy();
  });

  it("renders all emojis in topEmojis array", () => {
    render(<SelectEmoji displayEmojiSelector={true} setText={mockSetText} />);

    const emojis = [
      "😀",
      "😂",
      "😍",
      "😢",
      "😎",
      "😡",
      "😱",
      "👍",
      "🎉",
      "❤️",
      "🥳",
      "😇",
      "🤔",
      "😴",
      "🤗",
      "💔",
      "🌟",
      "🔥",
      "💯",
      "🙌",
      "🐶",
    ];

    emojis.forEach((emoji) => {
      expect(screen.getByText(emoji)).toBeTruthy();
    });
  });

  it("calls setText with the correct emoji when an emoji is pressed", () => {
    render(<SelectEmoji displayEmojiSelector={true} setText={mockSetText} />);

    const emoji = "😀";
    const emojiButton = screen.getByText(emoji);

    fireEvent.press(emojiButton);

    expect(mockSetText).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetText.mock.calls[0][0]("")).toBe(emoji); // Check that emoji is appended correctly
  });
});
