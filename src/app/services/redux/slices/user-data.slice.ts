import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { UserData } from "../types/user-data-type";

export const userDataInitialState: UserData = {
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  accessToken: null,
  user_code: null,
};

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: userDataInitialState,
  reducers: {
    storeUserData(state, action: PayloadAction<UserData>) {
      let s = current(state);
      return { ...s, ...action.payload };
    },
    clearUserData() {
      return { ...userDataInitialState };
    },
  },
});

export const { storeUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
