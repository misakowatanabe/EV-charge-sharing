import { configureStore } from "@reduxjs/toolkit";
import userAuthDataReducer from "./slices/UserAuthDataSlice";
import messageDataReducer from "./slices/MessageDataSlice";
import profileDataReducer from "./slices/ProfileDataSlice";
import loadingDataReducer from "./slices/LoadingDataSlice";
import snackbarDataReducer from "./slices/SnackbarDataSlice";

export const store = configureStore({
  reducer: {
    userAuthData: userAuthDataReducer,
    messageData: messageDataReducer,
    profileData: profileDataReducer,
    loadingData: loadingDataReducer,
    snackbarData: snackbarDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
