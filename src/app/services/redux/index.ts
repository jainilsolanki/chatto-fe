import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import dialogConfigSlice, {
  dialogConfigInitialState,
} from "./slices/dialog-config.slice";

import tempDataSlice, { tempDataInitialState } from "./slices/temp-data.slice";
import appDataSlice, { appDataInitialState } from "./slices/app-data.slice";

const resetAllInitialSlices = {
  ...tempDataInitialState,
  ...dialogConfigInitialState,
  ...appDataInitialState,
};

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    expireReducer("appData", {
      //expire in 15 days
      expireSeconds: 15 * 24 * 60 * 60,
      expiredState: resetAllInitialSlices,
      autoExpire: true,
    }),
  ],
  whitelist: ["appData"],
};
const reducers = combineReducers({
  //Persistent
  appData: appDataSlice,

  // Temporary
  tempData: tempDataSlice,
  dialogConfig: dialogConfigSlice,
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
