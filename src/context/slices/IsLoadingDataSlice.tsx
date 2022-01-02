import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface UserAuthDataState {
  value: boolean;
}

const initialState: UserAuthDataState = {
  value: true,
};

export const isLoadingDataSlice = createSlice({
  name: "isLoadingData",
  initialState,
  reducers: {
    updateIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { updateIsLoadingData } = isLoadingDataSlice.actions;
export const selectIsLoadingData = (state: RootState) => state.isLoadingData.value;
export default isLoadingDataSlice.reducer;
