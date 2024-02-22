import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { DialogConfigType } from "../types/dialog-config.type";

export const dialogConfigInitialState: DialogConfigType = {
  addFriendDialogState: false,
  beginConversationDialogState: false,
};
const dialogConfigSlice = createSlice({
  name: "dialogDataSlice",
  initialState: dialogConfigInitialState,
  reducers: {
    handleAddFriendDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, addFriendDialogState: action.payload };
    },
    handleBeginConversationDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, beginConversationDialogState: action.payload };
    },
  },
});

export const {
  handleAddFriendDialogState,
  handleBeginConversationDialogState,
} = dialogConfigSlice.actions;

export default dialogConfigSlice.reducer;
