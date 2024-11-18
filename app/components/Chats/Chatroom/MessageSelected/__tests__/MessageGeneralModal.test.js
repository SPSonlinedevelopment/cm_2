import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import MessageGeneralModal from "../MessageGeneralModal";
import { ConfirmDeleteAccount } from "../MessageGeneralModal";
import { switchMode } from "@/app/components/Profile/Others/switchMode";
import { auth } from "@/firebaseConfig";
import { useChat } from "../../../../../context/chatContext";
import { useAuth } from "../../../../../context/authContext";
import { Alert } from "react-native";
import "@testing-library/jest-native/extend-expect";

// Mock the required context functions
jest.mock("../../../../../context/chatContext", () => ({
  useChat: jest.fn(),
}));

jest.mock("../../../../../context/authContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/firebaseConfig", () => ({
  auth: {
    currentUser: {
      delete: jest.fn(),
    },
  },
}));

jest.mock("@/app/components/Profile/Others/switchMode", () => ({
  switchMode: jest.fn(),
}));

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("MessageGeneralModal", () => {
  const mockSetDisplayModal = jest.fn();
  const mockReportInappropriateMessage = jest.fn();
  const mockDeleteSelectedMessage = jest.fn();

  const mockLogOut = jest.fn();
  const mockUserDetails = { id: "user123" };

  beforeEach(() => {
    useChat.mockReturnValue({
      reportInappropriateMessage: mockReportInappropriateMessage,
      deleteSelectedMessage: mockDeleteSelectedMessage,
    });
    useAuth.mockReturnValue({
      logOut: mockLogOut,
      userDetails: mockUserDetails,
    });
    jest.clearAllMocks();
  });

  it("renders correctly and displays modal content", () => {
    const { getByTestId, getByText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Header", bodyText: "Body text" }}
        type="delete"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    expect(getByTestId("message_general_modal")).toBeTruthy();
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Body text")).toBeTruthy();
  });

  it("calls deleteSelectedMessage when confirm button is pressed for delete type", () => {
    const { getByText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Delete Message", bodyText: "Are you sure?" }}
        type="delete"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    fireEvent.press(getByText("Confirm"));
    expect(mockDeleteSelectedMessage).toHaveBeenCalled();
    expect(mockLogOut).not.toHaveBeenCalled();
  });

  it("calls reportInappropriateMessage when confirm button is pressed for report type", () => {
    const { getByText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Report Message", bodyText: "Are you sure?" }}
        type="report"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    fireEvent.press(getByText("Confirm"));
    expect(mockReportInappropriateMessage).toHaveBeenCalledWith({
      id: "msg123",
    });
  });

  it("calls logOut when confirm button is pressed for logout type", async () => {
    const { getByText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Logout", bodyText: "Are you sure?" }}
        type="logout"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    fireEvent.press(getByText("Confirm"));
    await waitFor(() => expect(mockLogOut).toHaveBeenCalled());
    expect(mockSetDisplayModal).toHaveBeenCalledWith(false);
  });

  it("renders ConfirmDeleteAccount component when type is deleteAccount", () => {
    const { getByPlaceholderText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Delete Account", bodyText: "Are you sure?" }}
        type="deleteAccount"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    expect(getByPlaceholderText("Type Delete")).toBeTruthy();
  });

  it('disables confirm button until "Delete" is typed for deleteAccount type', () => {
    const { getByText, getByPlaceholderText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Delete Account", bodyText: "Are you sure?" }}
        type="deleteAccount"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );

    const confirmButton = getByText("Confirm");

    console.log("confirm", confirmButton.props);
    expect(confirmButton).toBeDisabled();

    fireEvent.changeText(getByPlaceholderText("Type Delete"), "Delete");
    expect(confirmButton).toBeEnabled();
  });

  it("closes the modal when cancel button is pressed", () => {
    const { getByText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Cancel Test", bodyText: "Testing cancel" }}
        type="delete"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    fireEvent.press(getByText("Cancel"));
    expect(mockSetDisplayModal).toHaveBeenCalledWith(false);
  });

  it("calls delete account function and shows success alert", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Delete Account", bodyText: "Are you sure?" }}
        type="deleteAccount"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );
    fireEvent.changeText(getByPlaceholderText("Type Delete"), "Delete");

    const confirmButton = getByText("Confirm");
    expect(confirmButton).toBeEnabled();

    fireEvent.press(confirmButton);

    expect(auth.currentUser.delete).toHaveBeenCalled();

    await waitFor(() => {
      // Check that Alert.alert was called with the failure message and error details
      expect(Alert.alert).toHaveBeenCalledWith("Account delete successful");
    });
  });

  it("shows failure alert when account deletion fails", async () => {
    // Mock a failed deletion with an error message
    const errorMessage = "Deletion failed";
    auth.currentUser.delete.mockRejectedValueOnce(new Error(errorMessage));

    const { getByText, getByPlaceholderText } = render(
      <MessageGeneralModal
        messageObj={{ id: "msg123" }}
        text={{ headerText: "Delete Account", bodyText: "Are you sure?" }}
        type="deleteAccount"
        displayModal={true}
        setDisplayModal={mockSetDisplayModal}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Type Delete"), "Delete");

    // Trigger the confirm button to call handleDeleteAccount
    fireEvent.press(getByText("Confirm"));

    const confirmButton = getByText("Confirm");

    await waitFor(() => {
      // Check that Alert.alert was called with the failure message and error details
      expect(Alert.alert).toHaveBeenCalledWith(
        "Account delete unsuccessful",
        errorMessage
      );
    });
  });
});
