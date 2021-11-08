import { createSlice } from "@reduxjs/toolkit";

const ethSlice = createSlice({
  name: "eth",
  initialState: {
    currentChain: 0,
    isMetaMaskInstalled: false,
    isConnected: true,
  },
  reducers: {
    setCurrentChain(state, action) {
      state.currentChain = action.payload;
    },
    setMetamaskInstalled(state) {
      state.isMetaMaskInstalled = true;
    },
    setIsConnected(state) {
      state.isConnected = true;
    },
    setMetamaskNotInstalled(state) {
      state.isMetaMaskInstalled = false;
    },
    setIsNotConnected(state) {
      state.isConnected = false;
    },
  },
});

export const ethActions = ethSlice.actions;

export default ethSlice;
