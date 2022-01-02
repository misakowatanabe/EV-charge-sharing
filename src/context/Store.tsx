import { configureStore } from "@reduxjs/toolkit";
import userAuthDataReducer from "./slices/UserAuthDataSlice";
import messageDataReducer from "./slices/MessageDataSlice";
import profileDataReducer from "./slices/ProfileDataSlice";
import isLoadingDataReducer from "./slices/IsLoadingDataSlice";

export const store = configureStore({
  reducer: {
    userAuthData: userAuthDataReducer,
    messageData: messageDataReducer,
    profileData: profileDataReducer,
    isLoadingData: isLoadingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;