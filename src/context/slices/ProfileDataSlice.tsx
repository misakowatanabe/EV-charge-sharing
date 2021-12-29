import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

interface ProfileDataState {
  value: {
    userUid: number;
    name: string;
    numberPlate: string;
    email: string;
  }[];
}

const initialState: ProfileDataState = {
  value: [{ userUid: 0, name: "", numberPlate: "", email: "" }],
};

export const profileDataSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    updateProfileData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateProfileData } = profileDataSlice.actions;
export const selectProfileData = (state: RootState) => state.profileData.value[0];
export default profileDataSlice.reducer;
