import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Chat, OnGoinghatData } from "../types/ongoing-chat-data.type";

export const onGoingChatDataInitialState: OnGoinghatData = null;

const onGoingChatData = createSlice({
  name: "onGoingChatData",
  initialState: onGoingChatDataInitialState,
  reducers: {
    saveOnGoingChatData(state, action: PayloadAction<OnGoinghatData>) {
      return {
        conversationId: action.payload.conversationId,
        chatList: action.payload.chatList,
        messageReceiver: action.payload.messageReceiver,
        totalChatCount: action.payload.totalChatCount,
        unreadMessagesCount: action.payload.unreadMessagesCount,
      };
    },
    updateOnGoingChatList(
      state,
      action: PayloadAction<{ chatList: Chat; unreadMessagesCount: number }>
    ) {
      let s = current(state);
      return {
        ...s,
        chatList: [...s.chatList, action.payload.chatList],
        unreadMessagesCount: action.payload.unreadMessagesCount,
      };
    },

    updateUnreadMessagesCount(state, action: PayloadAction<number>) {
      let s = current(state);
      return {
        ...s,
        unreadMessagesCount: action.payload,
      };
    },

    loadOnGoingChatList(state, action: PayloadAction<Chat[]>) {
      let s = current(state);
      return {
        ...s,
        chatList: [...action.payload, ...s.chatList],
      };
    },
    clearOnGoingChatData() {
      return onGoingChatDataInitialState;
    },
  },
});

export const {
  saveOnGoingChatData,
  updateOnGoingChatList,
  clearOnGoingChatData,
  loadOnGoingChatList,
  updateUnreadMessagesCount,
} = onGoingChatData.actions;
export default onGoingChatData.reducer;
