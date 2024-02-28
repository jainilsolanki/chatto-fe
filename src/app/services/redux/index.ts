import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import userDataSlice, { userDataInitialState } from "./slices/user-data.slice";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import dialogConfigSlice, {
  dialogConfigInitialState,
} from "./slices/dialog-config.slice";
import ongoingChatDataSlice, {
  onGoingChatDataInitialState,
} from "./slices/ongoing-chat-data.slice";
import tempDataSlice, { tempDataInitialState } from "./slices/temp-data.slice";

const resetAllInitialSlices = {
  ...userDataInitialState,
  ...tempDataInitialState,
  ...onGoingChatDataInitialState,
  ...dialogConfigInitialState,
};

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    expireReducer("userData", {
      //expire in 15 days
      expireSeconds: 15 * 24 * 60 * 60,
      expiredState: resetAllInitialSlices,
      autoExpire: true,
    }),
  ],
  whitelist: ["userData", "tempData"],
};
const reducers = combineReducers({
  //Persistent
  userData: userDataSlice,
  tempData: tempDataSlice,

  // Temporary
  dialogConfig: dialogConfigSlice,
  onGoingChatData: ongoingChatDataSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
