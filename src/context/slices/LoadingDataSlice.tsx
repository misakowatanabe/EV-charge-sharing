import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface LoadingDataState {
  value: string;
}

const initialState: LoadingDataState = {
  value: "initial",
};

export const loadingDataSlice = createSlice({
  name: "loadingData",
  initialState,
  reducers: {
    updateLoadingData: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateLoadingData } = loadingDataSlice.actions;
export const selectLoadingData = (state: RootState) => state.loadingData.value;
export default loadingDataSlice.reducer;
