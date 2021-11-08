import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./alert-slice";
import userSlice from "./user-slice";
import ethSlice from "./eth-slice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
    eth: ethSlice.reducer,
  },
});

export default store;
