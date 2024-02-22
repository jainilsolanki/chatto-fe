import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import userDataSlice, { userDataInitialState } from "./slices/user-data.slice";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import dialogConfigSlice from "./slices/dialog-config.slice";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    expireReducer("userData", {
      //expire in 15 days
      expireSeconds: 15 * 24 * 60 * 60,
      expiredState: userDataInitialState,
      autoExpire: true,
    }),
  ],
  whitelist: ["userData"],
};
const reducers = combineReducers({
  //Persistent
  userData: userDataSlice,

  // Temporary
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
