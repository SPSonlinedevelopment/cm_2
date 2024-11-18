import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import MessagesList from "../MessagesList";
import { useChatRoom } from "../../../../../context/chatRoomContext";
import { useAuth } from "../../../../../context/authContext";
import * as Haptics from "expo-haptics";
import {
  storeObjectAsyncStorage,
  generateRandomId,
} from "../../../../../../utils/common";
// import { onSnapshot } from "firebase/firestore";

// Mock dependencies
jest.mock("../../../../../context/chatRoomContext", () => ({
  useChatRoom: jest.fn(),
}));
jest.mock("../../../../../context/authContext", () => ({
  useAuth: jest.fn(),
}));

// jest.mock("firebase/firestore");
jest.mock("expo-haptics");
jest.mock("../../../../../../utils/common", () => ({
  storeObjectAsyncStorage: jest.fn(),
  generateRandomId: jest.fn(),
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

    // Mock chatRoomData and userDetails
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

    Haptics.impactAsync.mockResolvedValue();

    // onSnapshot.mockImplementation((_, callback) => {
    //   callback({
    //     docs: [{ data: () => ({ text: "New message", messageId: "123" }) }],
    //   });
    //   return jest.fn(); // mock unsubscribe
    // });
  });

  //   it("renders the initial set of messages and subscribes to Firestore updates", async () => {
  //     const { getByText } = render(
  //       <MessagesList
  //         scrollViewRef={scrollViewRef}
  //         scrollToEnd={scrollToEnd}
  //         replyState={null}
  //         setReplyState={setReplyState}
  //         setSelectedMessage={setSelectedMessage}
  //         setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
  //         isSendingImage={false}
  //       />
  //     );

  //     expect(getByText(/connecting you with a mentor/i)).toBeTruthy();
  //     expect(onSnapshot).toHaveBeenCalledTimes(1);

  //     await waitFor(() => {
  //       expect(getByText(/New message/)).toBeTruthy();
  //     });
  //   });

  //   it('triggers scrollToEnd and stores last message text in async storage', async () => {
  //     render(
  //       <MessagesList
  //         scrollViewRef={scrollViewRef}
  //         scrollToEnd={scrollToEnd}
  //         replyState={null}
  //         setReplyState={setReplyState}
  //         setSelectedMessage={setSelectedMessage}
  //         setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
  //         isSendingImage={false}
  //       />
  //     );

  //     await waitFor(() => {
  //       expect(storeObjectAsyncStorage).toHaveBeenCalledWith('testRoom', 'New message');
  //       expect(scrollToEnd).toHaveBeenCalled();
  //       expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  //     });
  //   });

  //   it('shows CelebrationAnimation if sessionCompleted is true', () => {
  //     const { getByTestId } = render(
  //       <MessagesList
  //         scrollViewRef={scrollViewRef}
  //         scrollToEnd={scrollToEnd}
  //         replyState={null}
  //         setReplyState={setReplyState}
  //         setSelectedMessage={setSelectedMessage}
  //         setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
  //         isSendingImage={false}
  //       />
  //     );

  //     expect(getByTestId('celebration-animation')).toBeTruthy();
  //   });

  //   it('does not render CelebrationAnimation if sessionCompleted is false', () => {
  //     useChatRoom.mockReturnValueOnce({
  //       chatRoomData: {
  //         roomId: 'testRoom',
  //         connectedMentor: true,
  //         sessionCompleted: false,
  //       },
  //     });

  //     const { queryByTestId } = render(
  //       <MessagesList
  //         scrollViewRef={scrollViewRef}
  //         scrollToEnd={scrollToEnd}
  //         replyState={null}
  //         setReplyState={setReplyState}
  //         setSelectedMessage={setSelectedMessage}
  //         setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
  //         isSendingImage={false}
  //       />
  //     );

  //     expect(queryByTestId('celebration-animation')).toBeNull();
  //   });

  //   it('displays LoadingImagePlaceholder when isSendingImage is true', () => {
  //     const { getByTestId } = render(
  //       <MessagesList
  //         scrollViewRef={scrollViewRef}
  //         scrollToEnd={scrollToEnd}
  //         replyState={null}
  //         setReplyState={setReplyState}
  //         setSelectedMessage={setSelectedMessage}
  //         setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
  //         isSendingImage={true}
  //       />
  //     );

  //     expect(getByTestId('loading-image-placeholder')).toBeTruthy();
  //   });
});
