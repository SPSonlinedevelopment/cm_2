import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import MessageInput from "../MessageInput";
import { useAuth } from "@/app/context/authContext";
import { useChatRoom } from "@/app/context/chatRoomContext";
import { handleSendTextMessageToChatroom } from "../../../SendData/SendTexts/handleSendTextMessageToChatroom";
import { pickImage } from "../../../../../../utils/imagePicker";
import { screenProfanities } from "../../../../../../utils/common";
import "@testing-library/jest-native/extend-expect";
import { getByTestId } from "@testing-library/react";

jest.mock("@/app/context/authContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/app/context/chatRoomContext", () => ({
  useChatRoom: jest.fn(),
}));

jest.mock("../../../../../../utils/imagePicker", () => ({
  pickImage: jest.fn(),
}));

jest.mock("../../../../../../utils/common", () => ({
  screenProfanities: jest.fn(),
}));

jest.mock(
  "../../../SendData/SendTexts/handleSendTextMessageToChatroom",
  () => ({
    handleSendTextMessageToChatroom: jest.fn(),
  })
);

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("MessageInput Component", () => {
  const mockUserDetails = {
    uid: "user-id",
    firstName: "Test First Name",
    lastName: "Test Last Name",
  };

  const mockChatRoomData = { roomId: "room-id", name: "Test Room" };
  const setText = jest.fn();
  const setDisplayEmojiSelector = jest.fn();
  const setReplyState = jest.fn();
  const setIsSendingImage = jest.fn();
  const handlePickImage = jest.fn();
  const inputRef = React.createRef();

  beforeEach(() => {
    useAuth.mockReturnValue({ userDetails: mockUserDetails });
    useChatRoom.mockReturnValue({ chatRoomData: mockChatRoomData });
    console.log("useAuth mock:", useAuth());
    console.log("useChatRoom mock:", useChatRoom());
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        setIsSendingImage={setIsSendingImage}
        inputRef={inputRef}
        replyState={{ displayShowReplyBar: false }}
      />
    );
    expect(getByPlaceholderText("type message ...")).toBeTruthy();
  });

  it("toggles emoji selector when emoji button is pressed", () => {
    const { getByText } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        setIsSendingImage={setIsSendingImage}
        inputRef={inputRef}
      />
    );

    const emojiButton = getByText("😊");
    fireEvent.press(emojiButton);

    expect(setDisplayEmojiSelector).toHaveBeenCalledWith(expect.any(Function));
  });

  it("updates text input value", () => {
    const { getByPlaceholderText } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        setIsSendingImage={setIsSendingImage}
        inputRef={inputRef}
      />
    );

    const input = getByPlaceholderText("type message ...");
    fireEvent.changeText(input, "Hello");

    expect(setText).toHaveBeenCalledWith("Hello");
  });

  it("shows alert for inappropriate text", async () => {
    screenProfanities.mockReturnValue(true);

    const { getByPlaceholderText, getByTestId } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        setIsSendingImage={setIsSendingImage}
        inputRef={inputRef}
      />
    );

    const input = getByPlaceholderText("type message ...");
    fireEvent.changeText(input, "bad text");

    const sendButton = getByTestId("send_message_button");
    fireEvent.press(sendButton);
    console.log(Alert.alert.mock.calls);
    // Check if Alert.alert was called with the expected message
    expect(Alert.alert).toHaveBeenCalledWith("text shows inappropriate text");

    // Ensure no message is sent if text is inappropriate
    expect(handleSendTextMessageToChatroom).not.toHaveBeenCalled();
  });

  it("calls handleSendTextToChatroom if text not inappropriate", () => {
    screenProfanities.mockReturnValue(false);
    const { getByPlaceholderText, getByTestId } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        setIsSendingImage={setIsSendingImage}
        inputRef={inputRef}
        replyState={{
          displayShowReplyBar: false,
          replyMessage: "mockReplyMessage",
          replyRecipientName: "mockReplyRecipientName",
          replyRecipientId: "mockReplyRecipientId",
        }}
      />
    );

    const input = getByPlaceholderText("type message ...");
    fireEvent.changeText(input, "acceptable text");
    // Ensure setText is called to confirm input change took effect
    expect(setText).toHaveBeenCalledWith("acceptable text");

    const sendButton = getByTestId("send_message_button");
    expect(sendButton).toBeTruthy();

    fireEvent.press(sendButton);
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(handleSendTextMessageToChatroom).toHaveBeenCalled();

    // expect(handleSendTextMessageToChatroom).toHaveBeenCalledWith(
    //   mockChatRoomData.roomId,
    //   "acceptable text",
    //   mockUserDetails,
    //   ""
    // );
  });

  it("does not display send button if text is empty", () => {
    const { queryByTestId } = render(
      <MessageInput
        text="test text"
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        inputRef={inputRef}
        handlePickImage={handlePickImage}
      />
    );

    const button = queryByTestId("send_message_button");

    expect(button).toBeNull();
  });

  it("calls handlePickImage when image picker button is pressed", () => {
    const { getByTestId } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        inputRef={inputRef}
        handlePickImage={handlePickImage}
      />
    );

    fireEvent.press(getByTestId("image_picker_button"));
    expect(handlePickImage).toHaveBeenCalled();
  });

  it("calls setDisplayEmojiSelector when emoji button is pressed", () => {
    const { getByText } = render(
      <MessageInput
        text=""
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        inputRef={inputRef}
        handlePickImage={handlePickImage}
      />
    );

    fireEvent.press(getByText("😊"));
    expect(setDisplayEmojiSelector).toHaveBeenCalled();
  });

  it("displays error alert if handleSendTextMessageToChatroom fails", async () => {
    handleSendTextMessageToChatroom.mockRejectedValueOnce(
      new Error("Network error")
    );

    const { getByTestId, getByPlaceholderText } = render(
      <MessageInput
        text="test"
        setText={setText}
        setDisplayEmojiSelector={setDisplayEmojiSelector}
        setReplyState={setReplyState}
        inputRef={inputRef}
        handlePickImage={handlePickImage}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText("type message ..."),
      "acceptable text"
    );

    const sendButton = getByTestId("send_message_button");
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("error sending message");
    });
  });
});
