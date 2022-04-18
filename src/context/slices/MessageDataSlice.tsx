import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface MessageDataState {
  value: {
    chatId: string;
    messages: {
      content?: string;
      createdAt?: number;
      messageId?: string;
      writtenBy?: string;
    }[];
    createdAt: number;
    status: string;
  }[];
}

const initialState: MessageDataState = {
  value: [],
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
