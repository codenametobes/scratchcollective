import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isNewUser: false,
  user: {},
  loading: false,
  status: "idle",
  error: null,
};

// AUTHENTICATE USER (no token yet) => returns JSON webtoken
export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async (sigAddressBody) => {
    const { signature, publicAddress } = sigAddressBody;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      signature: signature,
      publicAddress: publicAddress,
    });
    const response = await axios.post(`/api/authenticate`, body, config);
    return response.data;
  }
);

// LOAD USER (token is present) => checks and returns USER object to state
export const loadUser = createAsyncThunk(`user/loaduser`, async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const response = await axios.get(`/api/authenticate`);
  return response.data;
});

// REGISTER NEW USER (no token present, publicAddress not in db) => returns JSON webtoken
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (publicAddress) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ publicAddress });
    const response = await axios.post(`/api/users`, body, config);
    return response.data;
  }
);

// EDIT USER
export const editUser = createAsyncThunk("user/edit", async (formData) => {
  const body = formData;
  const response = await axios.post(`/api/users/edit`, body);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthFalse(state, action) {
      state.isAuthenticated = false;
    },
    setNewUserFalse(state, action) {
      state.isNewUser = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isNewUser = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.status = "failed";
        state.error = action.error.message;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.status = "failed";
        state.error = action.error.message;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        state.isNewUser = false;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isNewUser = action.payload.isNewUser;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.status = "failed";
        state.error = action.error.message;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
        state.isNewUser = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;

export const authenticationStatus = (state) => {
  return state.isAuthenticated;
};

export default userSlice;
