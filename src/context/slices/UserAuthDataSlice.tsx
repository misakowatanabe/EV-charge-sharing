import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface UserAuthDataState {
  value: boolean;
}

const initialState: UserAuthDataState = {
  value: false,
};

export const userAuthDataSlice = createSlice({
  name: "userAuthData",
  initialState,
  reducers: {
    updateUserAuthData: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserAuthData } = userAuthDataSlice.actions;
export const selectUserAuthData = (state: RootState) => state.userAuthData.value;
export default userAuthDataSlice.reducer;
