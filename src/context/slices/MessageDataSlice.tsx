import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface MessageDataState {
  value: {
    id: number;
    message: string;
    date: string;
  }[];
}

const initialState: MessageDataState = {
  value: [{ id: 0, message: "", date: "" }],
};

export const messageDataSlice = createSlice({
  name: "messageData",
  initialState,
  reducers: {
    updateMessageData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateMessageData } = messageDataSlice.actions;
export const selectMessageData = (state: RootState) => state.messageData.value;
export default messageDataSlice.reducer;
