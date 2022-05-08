import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface SnackbarDataState {
  value: {
    snackState: boolean;
    severity: "success" | "warning" | "error" | "info";
    message: string;
  };
}

const initialState: SnackbarDataState = {
  value: {
    snackState: false,
    severity: "success",
    message: "",
  },
};

export const snackbarDataSlice = createSlice({
  name: "snackbarData",
  initialState,
  reducers: {
    updateSnackbarData: (
      state,
      action: PayloadAction<SnackbarDataState["value"]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { updateSnackbarData } = snackbarDataSlice.actions;
export const selectSnackbarData = (state: RootState) =>
  state.snackbarData.value;
export default snackbarDataSlice.reducer;
