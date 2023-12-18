import { createSlice } from "@reduxjs/toolkit";

export const modalAppearanceSlice = createSlice({
  name: "modalAppearance",
  initialState: {
    isSignOutDialogShowing: false,
  },
  reducers: {
    setSignOutDialogShowing: (state, action) => {
      state.isSignOutDialogShowing = action.payload.isSignOutDialogShowing;
    },
  },
});

export const { 
  setSignOutDialogShowing
} = modalAppearanceSlice.actions;

export const selectModalAppearance = (state) => state.modalAppearance;

export default modalAppearanceSlice.reducer;