import { configureStore } from "@reduxjs/toolkit";
import userAuthDataReducer from "./slices/UserAuthDataSlice";
import messageDataReducer from "./slices/MessageDataSlice";
import profileDataReducer from "./slices/ProfileDataSlice";

export const store = configureStore({
  reducer: {
    userAuthData: userAuthDataReducer,
    messageData: messageDataReducer,
    profileData: profileDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;