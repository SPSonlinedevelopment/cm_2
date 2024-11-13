import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react-native";
import LiveComplementSelector from "../LiveComplementSelector";
import { useAuth } from "@/app/context/authContext";
import { useChatRoom } from "@/app/context/chatRoomContext";

import { mentorComplements } from "../../../EndOfSession/ReviewForMentor/ComplementSelections";
import {
  handleSendTextMessageToChatroom,
  handleSendSuggestedMessageToChatroom,
} from "../../../SendData/SendTexts/handleSendTextMessageToChatroom";

import handleUpdateMenteeWithComplement from "../handleUpdateMenteeWithComplement";
import { queryByTestId } from "@testing-library/react";

jest.mock("@/app/context/authContext", () => ({
  useAuth: jest.fn(() => {}),
}));
jest.mock("@/app/context/chatRoomContext", () => ({
  useChatRoom: jest.fn(() => {}),
}));

jest.mock(
  "../../../SendData/SendTexts/handleSendTextMessageToChatroom",
  () => ({
    handleSendTextMessageToChatroom: jest.fn(),
    handleSendSuggestedMessageToChatroom: jest.fn(),
  })
);

jest.mock("../handleUpdateMenteeWithComplement", () => jest.fn());

describe("LiveComplementSelector", () => {
  const mockUserDetails = { mode: "mentor" };
  const mockChatRoomData = { roomId: "testRoomId", menteeId: "testMenteeId" };

  beforeEach(() => {
    useAuth.mockReturnValue({ userDetails: mockUserDetails });
    useChatRoom.mockReturnValue({ chatRoomData: mockChatRoomData });
    handleSendTextMessageToChatroom.mockResolvedValue();
    handleUpdateMenteeWithComplement.mockResolvedValue();
  });

  it("renders the component when user is a mentor", () => {
    render(<LiveComplementSelector />);

    expect(screen.getByTestId("icon_button")).toBeTruthy();
  });

  it("doesnt display icon in mentee mode", () => {
    useAuth.mockReturnValueOnce({ userDetails: { mode: "mentee" } });
    render(<LiveComplementSelector />);

    expect(screen.queryByTestId("live_complements_button")).toBeNull();
  });

  it("displays complement selector when icon button selected", () => {
    const { queryByTestId } = render(<LiveComplementSelector />);

    const button = screen.getByTestId("icon_button");

    act(() => {
      fireEvent.press(button);
    });

    expect(queryByTestId("complement_selector")).toBeTruthy();

    mentorComplements.forEach((complement) => {
      expect(screen.getByText(complement.title)).toBeTruthy();
    });
  });

  it("calls handle send message functions when complement icon button is selected and selector becomes hidden", async () => {
    const { getByTestId, findByText } = render(<LiveComplementSelector />);

    const button = getByTestId("icon_button");

    // Click the icon button to display the complements
    await act(async () => {
      fireEvent.press(button);
    });

    // Wait for the first complement to appear and click it
    const firstComplement = await findByText(mentorComplements[0].title);

    await act(async () => {
      fireEvent.press(firstComplement);
    });

    await waitFor(() => {
      expect(handleSendTextMessageToChatroom).toHaveBeenCalledWith(
        "testRoomId",
        mentorComplements[0].title,
        { mode: "mentor" },
        "complement",
        null
      );
      expect(handleUpdateMenteeWithComplement).toHaveBeenCalledWith(
        "testMenteeId",
        mentorComplements[0].title
      );
    });
    expect(screen.queryByTestId("complement_selector")).toBeNull();
  });



  afterEach(() => {
    jest.clearAllMocks();
  });
});
