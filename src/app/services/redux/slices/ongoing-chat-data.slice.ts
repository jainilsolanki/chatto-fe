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
      };
    },
    updateOnGoingChatList(state, action: PayloadAction<Chat[]>) {
      let s = current(state);
      return {
        ...s,
        chatList: action.payload,
      };
    },
  },
});

export const { saveOnGoingChatData, updateOnGoingChatList } =
  onGoingChatData.actions;
export default onGoingChatData.reducer;
