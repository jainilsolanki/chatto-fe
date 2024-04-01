import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { DialogConfigType } from "../types/dialog-config.type";

export const dialogConfigInitialState: DialogConfigType = {
  addFriendDialogState: false,
  beginConversationDialogState: false,
  createGroupDialogState: false,
  enableAppLockDialogState: false,
  disableAppLockDialogState: false,
  resetAppLockDialogState: false,
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
    handleCreateGroupDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, createGroupDialogState: action.payload };
    },
    handleEnableAppLockDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, enableAppLockDialogState: action.payload };
    },
    handleDisableAppLockDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, disableAppLockDialogState: action.payload };
    },
    handleResetAppLockDialogState(state, action: PayloadAction<boolean>) {
      let s = current(state);
      return { ...s, resetAppLockDialogState: action.payload };
    },
    clearDialogConfigSlice() {
      return { ...dialogConfigInitialState };
    },
  },
});

export const {
  handleAddFriendDialogState,
  handleBeginConversationDialogState,
  handleCreateGroupDialogState,
  clearDialogConfigSlice,
  handleEnableAppLockDialogState,
  handleDisableAppLockDialogState,
  handleResetAppLockDialogState,
} = dialogConfigSlice.actions;

export default dialogConfigSlice.reducer;
