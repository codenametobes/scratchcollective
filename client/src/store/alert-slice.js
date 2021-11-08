import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "",
  },
  reducers: {
    setSnackbar(state, action) {
      state.snackbarOpen = action.payload.snackbarOpen;
      state.snackbarType = action.payload.snackbarType;
      state.snackbarMessage = action.payload.snackbarMessage;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
