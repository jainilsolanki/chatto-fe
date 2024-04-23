import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { TempDataTypes } from "../types/temp-data.type";

export const tempDataInitialState: TempDataTypes = {
  conversationId: null,
};

const tempDataSlice = createSlice({
  name: "tempDataSlice",
  initialState: tempDataInitialState,
  reducers: {
    updateConversationId(state, action: PayloadAction<number | null>) {
      let s = current(state);
      return { ...s, conversationId: action.payload };
    },
    clearTempData() {
      return { ...tempDataInitialState };
    },
  },
});

export const { updateConversationId, clearTempData } = tempDataSlice.actions;
export default tempDataSlice.reducer;
